<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

const IMG = '*.{jpg,jpeg,png,webp,avif}'
const sorted = (m) => Object.keys(m).sort().map((k) => m[k])
const singlePhotos = sorted(import.meta.glob('@/assets/hotel/single/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' }))
const triplePhotos = sorted(import.meta.glob('@/assets/hotel/triple/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' }))

const SLIDE_MS = 5000 // скільки секунд показується одне фото

// Порядок карток = порядок у цьому масиві. guests — кількість «людиків» на іконці
const rooms = [
  { id: 'triple', title: 'Трьохмісний номер', guests: 3, price: '500', folder: 'triple', photos: triplePhotos },
  { id: 'single', title: 'Одномісний номер', guests: 1, price: '1000', folder: 'single', photos: singlePhotos }
]
const DEFAULT_ROOM = 'single' // який номер відкритий при завантаженні

/* ---------- вибір номера (таби) ---------- */
const activeId = ref(DEFAULT_ROOM)
const active = computed(() => rooms.find((r) => r.id === activeId.value))
const tabs = ref([])

function select(id, focus = false) {
  activeId.value = id
  if (focus) tabs.value[rooms.findIndex((r) => r.id === id)]?.focus()
}
function onTabKey(e, i) {
  const last = rooms.length - 1
  const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key]
  if (to === undefined) return
  e.preventDefault()
  select(rooms[to].id, true)
}

/* ---------- карусель ---------- */
const index = ref(0)
const paused = ref(false)
const count = computed(() => active.value.photos.length)
let timer = null
let touchX = 0

// усі фото обох номерів лежать стосом; видно лише одне — так перемикання між номерами теж розчиняється плавно
const slides = rooms.flatMap((r) =>
  r.photos.map((src, i) => ({ src, roomId: r.id, i, alt: `${r.title}, фото ${i + 1} з ${r.photos.length}` }))
)
const isShown = (s) => s.roomId === activeId.value && s.i === index.value

const go = (i) => { index.value = count.value ? (i + count.value) % count.value : 0 }
const stop = () => { clearInterval(timer); timer = null }
const start = () => {
  stop()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || count.value < 2) return
  timer = setInterval(() => { if (!paused.value) go(index.value + 1) }, SLIDE_MS)
}
const pick = (i) => { go(i); start() } // після ручного вибору відлік починається заново
const onTouchStart = (e) => { touchX = e.changedTouches[0].clientX }
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 40) pick(index.value + (dx < 0 ? 1 : -1))
}

// змінили номер → знову з першого фото й новий відлік
watch(activeId, () => { index.value = 0; start() })

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <section id="hotel" data-nav="hotel" class="hotel">
    <div class="hotel__grid">
      <div class="hotel__text">
        <div class="hotel__head">
          <p class="hotel__eyebrow">Міні-готель «Садиба»</p>
          <h2 class="hotel__title">Залиште дорогу<br />на завтра</h2>
          <p class="hotel__lead">
            Затишні номери, щоб виспатися й відновити сили перед подорожжю. Автомобіль — на стоянці,
            що охороняється, а ви — на заслуженому відпочинку.
          </p>

          <ul class="hotel__features">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Стоянка з охороною</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" />
                <path d="M5 12.859a10 10 0 0 1 14 0" /><path d="M8.5 16.429a5 5 0 0 1 7 0" />
              </svg>
              <span>Wi-Fi</span>
            </li>
          </ul>

          <div class="hotel__times">
            <div><p class="hotel__time">14:00</p><p class="hotel__label">Заїзд</p></div>
            <div><p class="hotel__time">12:00</p><p class="hotel__label">Виїзд</p></div>
          </div>
        </div>

        <!-- ЦІНИ = перемикач номерів -->
        <div class="hotel__prices">
          <div class="prices" role="tablist" aria-labelledby="rooms-label">
            <button v-for="(r, i) in rooms" :key="r.id" :id="`room-tab-${r.id}`" :ref="(el) => (tabs[i] = el)"
              type="button" role="tab" class="price" :class="{ 'is-active': r.id === activeId }"
              :aria-selected="r.id === activeId" :tabindex="r.id === activeId ? 0 : -1" aria-controls="room-gallery"
              @click="select(r.id)" @keydown="onTabKey($event, i)">
              <span class="price__title">{{ r.title }}</span>
              <span class="price__value"><strong>{{ r.price }}</strong> грн / доба</span>
              <span class="price__hint">{{ r.id === activeId ? 'Зараз на фото' : 'Дивитись фото' }}</span>
            </button>
          </div>
        </div>

        <div class="hotel__cta"><BaseButton href="#kontakty" data-phone-modal>Забронювати номер</BaseButton></div>
      </div>

      <!-- КАРУСЕЛЬ обраного номера -->
      <div id="room-gallery" class="hotel__gallery" role="tabpanel" :aria-labelledby="`room-tab-${activeId}`"
        @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
        <div class="slides" aria-roledescription="carousel" :aria-label="`Фото: ${active.title}`"
          @touchstart.passive="onTouchStart" @touchend="onTouchEnd">
          <img v-for="s in slides" :key="s.src" class="slide" :class="{ 'is-active': isShown(s) }"
            :src="s.src" :alt="s.alt" :aria-hidden="!isShown(s)" :loading="s.roomId === DEFAULT_ROOM && s.i === 0 ? 'eager' : 'lazy'" />
          <div v-if="!count" class="slides__empty">Додайте фото номера в src/assets/hotel/{{ active.folder }}/</div>
        </div>

        <div v-if="count > 1" class="dots">
          <button v-for="n in count" :key="`${activeId}-${n}`" type="button" class="dot"
            :aria-label="`Показати фото ${n}`" :aria-current="n - 1 === index" @click="pick(n - 1)" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  Макет 1920 px. Розміри плинні (clamp): на 1920 = макет, на менших екранах зменшуються.
  ≤1024px: одна колонка — текст, ціни-перемикачі, одразу під ними карусель, потім кнопка.
*/
.hotel {
  background: var(--wine);
  color: #fff4ea;
  padding: clamp(56px, 4.6vw, 88px) 0; /* 88px на 1920 */
}

.hotel__grid {
  max-width: 1920px;
  margin-inline: auto;
  padding-inline: clamp(24px, 7.7vw, 148px);
  display: grid;
  grid-template-columns: 606fr 844fr; /* пропорції з макета */
  gap: clamp(40px, 9vw, 173px);
  align-items: center;
}

.hotel__text, .hotel__head { display: flex; flex-direction: column; align-items: flex-start; }
.hotel__head { width: 100%; }

.hotel__eyebrow {
  margin: 0 0 clamp(18px, 1.45vw, 28px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 244, 234, 0.85);
}

.hotel__title {
  margin: 0 0 clamp(16px, 1.3vw, 25px);
  font: 400 clamp(38px, 3.45vw, 66px) / 1.2 var(--font-display);
  color: #fff4ea;
}

.hotel__lead {
  margin: 0 0 clamp(18px, 1.45vw, 28px);
  font-size: clamp(17px, 1.1vw, 21px);
  line-height: 1.65;
  color: rgba(255, 244, 234, 0.82);
}

.hotel__features {
  list-style: none;
  margin: 0 0 clamp(16px, 1.35vw, 26px);
  padding: 0 0 clamp(16px, 1.35vw, 26px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px clamp(20px, 1.7vw, 33px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
  font-size: clamp(15px, 0.94vw, 18px);
}
.hotel__features li { display: flex; align-items: center; gap: 10px; }
.hotel__features svg { width: clamp(18px, 1.05vw, 20px); height: clamp(18px, 1.05vw, 20px); fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; flex: none; }

.hotel__times { display: flex; gap: clamp(32px, 3.3vw, 64px); margin-bottom: clamp(20px, 1.8vw, 34px); }
.hotel__times p, .hotel__prices > p { margin: 0; }
.hotel__time { font: 400 clamp(28px, 1.85vw, 36px) / 1.2 var(--font-display); color: #fff4ea; }
.hotel__label { margin: 0; font-size: clamp(14px, 0.85vw, 16px); color: rgba(255, 244, 234, 0.7); }

/* --- ціни: картки-перемикачі --- */
.hotel__prices { width: 100%; margin-bottom: clamp(22px, 1.9vw, 36px); }
.prices { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.price {
  position: relative;
  display: block;
  width: 100%;
  padding: clamp(14px, 1.1vw, 20px) clamp(16px, 1.25vw, 24px);
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transition: background 0.3s, border-color 0.3s;
}
.price:hover { background: rgba(255, 255, 255, 0.11); border-color: rgba(255, 255, 255, 0.4); }
.price.is-active { background: rgba(255, 255, 255, 0.15); border-color: rgba(255, 244, 234, 0.75); }
/* деревʼяний акцент зліва: на активній картці розтягується на всю висоту */
.price::before { content: ''; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 0 3px 3px 0; background: var(--wood); transition: top 0.3s, bottom 0.3s; }
.price.is-active::before { top: 0; bottom: 0; border-radius: 0; }
.price > span { display: block; }
.price__title, .price__value { font-size: clamp(14px, 0.85vw, 16px); color: rgba(255, 244, 234, 0.75); }
.price__value { margin-top: 2px; }
.price__value strong { font: 400 clamp(30px, 2.1vw, 40px) / 1.1 var(--font-display); color: #fff4ea; margin-right: 4px; }
.price__hint { margin-top: 10px; font-size: clamp(13px, 0.78vw, 15px); color: rgba(255, 244, 234, 0.6); }
.price__hint::after { content: ' →'; }
.price.is-active .price__hint { color: var(--wood); }
.price.is-active .price__hint::after { content: ''; }

/* --- карусель --- */
.slides { position: relative; aspect-ratio: 844 / 716; overflow: hidden; background: rgba(255, 255, 255, 0.06); touch-action: pan-y; }
.slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.9s ease; }
.slide.is-active { opacity: 1; }
.slides__empty { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px; text-align: center; color: rgba(255, 244, 234, 0.7); }

.dots { display: flex; justify-content: center; gap: 4px; margin-top: 14px; }
.dot { width: 26px; height: 26px; padding: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; }
.dot::before { content: ''; width: 9px; height: 9px; border-radius: 999px; background: rgba(255, 255, 255, 0.4); transition: width 0.3s, background 0.3s; }
.dot:hover::before { background: rgba(255, 255, 255, 0.75); }
.dot[aria-current='true']::before { width: 28px; background: #fff4ea; }

@media (prefers-reduced-motion: reduce) { .slide, .dot::before, .price, .price::before { transition: none; } }

/* планшет і телефон: текст → ціни-перемикачі → карусель → кнопка */
@media (max-width: 1024px) {
  .hotel__grid { grid-template-columns: 1fr; gap: 28px; }
  .hotel__text { display: contents; }
  .hotel__head, .hotel__prices { grid-column: 1; }
  .hotel__times, .hotel__prices { margin-bottom: 0; }
  .hotel__gallery { order: 2; }
  .hotel__cta { order: 3; }
  .slides { aspect-ratio: 16 / 11; }
}
@media (max-width: 480px) {
  .slides { aspect-ratio: 4 / 3; }
  .prices { grid-template-columns: 1fr; }
}
</style>