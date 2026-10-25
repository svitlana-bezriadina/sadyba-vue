<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const modules = import.meta.glob('@/assets/kids/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
const photos = Object.keys(modules).sort().map((k) => modules[k])

const SLIDE_MS = 5000 // скільки секунд показується одне фото

/* ---------- карусель ---------- */
const index = ref(0)
const paused = ref(false)
const count = computed(() => photos.length)
let timer = null
let touchX = 0

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

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <section id="diti" data-nav="diti" class="kids">
    <div class="kids__grid">
      <div class="kids__text">
        <p class="kids__eyebrow">Садиба для всієї родини</p>
        <h2 class="kids__title">Дітям — гра.<br />Вам — кава.</h2>
        <p class="kids__lead">
          Поки дорослі насолоджуються кавою й розмовами, діти граються під наглядом в окремій кімнаті.
          Кожному&nbsp;— свій маленький відпочинок.
        </p>

        <p class="kids__feature">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
            <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
          </svg>
          <span>Окрема дитяча кімната</span>
        </p>

        <a class="kids__link" href="#kontakty" data-phone-modal>
          <span >Дізнатися про дитячу кімнату</span>
          <svg viewBox="0 0 8 10" aria-hidden="true"><path d="M1 1l6 4-6 4z" /></svg>
        </a>
      </div>

      <!-- КАРУСЕЛЬ -->
      <div class="kids__gallery" role="region" aria-roledescription="carousel" aria-label="Фото дитячої кімнати"
        @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
        <div class="slides" @touchstart.passive="onTouchStart" @touchend="onTouchEnd">
          <img v-for="(src, i) in photos" :key="src" class="slide" :class="{ 'is-active': i === index }"
            :src="src" :alt="`Дитяча кімната «Садиби», фото ${i + 1} з ${count}`"
            :aria-hidden="i !== index" :loading="i === 0 ? 'eager' : 'lazy'" />
          <div v-if="!count" class="slides__empty">Додайте фото в src/assets/kids/</div>
        </div>

        <div v-if="count > 1" class="dots">
          <button v-for="n in count" :key="n" type="button" class="dot"
            :aria-label="`Показати фото ${n}`" :aria-current="n - 1 === index" @click="pick(n - 1)" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  Макет 1920 px. Розміри плинні (clamp): на 1920 = макет, на менших екранах зменшуються.
  ≤1024px: одна колонка — карусель зверху, текст під нею.
*/
.kids {
  background: var(--sand, #eee6da);
  color: #2a2220;
  padding: clamp(48px, 4vw, 76px) 0; /* 76px на 1920 */
}

.kids__grid {
  max-width: 1920px;
  margin-inline: auto;
  padding-inline: clamp(24px, 7vw, 134px);
  display: grid;
  grid-template-columns: 577fr 975fr; /* пропорції з макета */
  gap: clamp(40px, 5.2vw, 100px);
  align-items: center;
}

.kids__text { display: flex; flex-direction: column; align-items: flex-start; }

.kids__eyebrow {
  margin: 0 0 clamp(18px, 1.45vw, 28px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--wine);
}

.kids__title {
  margin: 0 0 clamp(14px, 1.05vw, 20px);
  font: 400 clamp(38px, 3.45vw, 66px) / 1.2 var(--font-display);
  color: #2a2220;
}

.kids__lead {
  margin: 0 0 clamp(18px, 1.25vw, 24px);
  max-width: 24.5em;
  font-size: clamp(17px, 1.15vw, 22px);
  line-height: 1.65;
  color: #7a6e69;
}

.kids__feature {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 clamp(20px, 1.8vw, 34px);
  font-size: clamp(15px, 0.94vw, 18px);
}
.kids__feature svg { width: clamp(18px, 1.05vw, 20px); height: clamp(18px, 1.05vw, 20px); flex: none; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; color: var(--wine); }

.kids__link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(15px, 0.9vw, 17px);
  font-weight: 500;
  color: var(--wine);
  text-decoration: none;
}
.kids__link span { text-underline-offset: 6px; }
.kids__link:hover span { text-decoration: underline; }
.kids__link svg { width: 8px; height: 10px; fill: currentColor; transition: transform 0.3s; }
.kids__link:hover svg { transform: translateX(4px); }

/* --- карусель --- */
.slides { position: relative; aspect-ratio: 975 / 617; overflow: hidden; background: rgba(42, 34, 32, 0.08); touch-action: pan-y; }
.slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.9s ease; }
.slide.is-active { opacity: 1; }
.slides__empty { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px; text-align: center; color: #7a6e69; }

.dots { display: flex; justify-content: center; gap: 4px; margin-top: 12px; }
.dot { width: 26px; height: 26px; padding: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; }
.dot::before { content: ''; width: 9px; height: 9px; border-radius: 999px; background: rgba(107, 13, 20, 0.28); transition: width 0.3s, background 0.3s; }
.dot:hover::before { background: rgba(107, 13, 20, 0.6); }
.dot[aria-current='true']::before { width: 28px; background: var(--wine); }

@media (prefers-reduced-motion: reduce) { .slide, .dot::before, .kids__link svg { transition: none; } }

/* ===== ПЛАНШЕТ (до 1024 px): карусель зверху ===== */
@media (max-width: 1024px) {
  .kids__grid { grid-template-columns: 1fr; gap: 28px; }
  .kids__gallery { order: -1; }
  .slides { aspect-ratio: 16 / 10; }
  .kids__text { max-width: 720px; }
  .kids__title { font-size: clamp(40px, 5.2vw, 52px); }
  .kids__lead { font-size: 19px; max-width: 34em; }
  .kids__feature { font-size: 17px; }
  .kids__link { font-size: 17px; }
}

/* ===== ТЕЛЕФОН (до 600 px) ===== */
@media (max-width: 600px) {
  .kids { padding: 40px 0 48px; }
  .slides { aspect-ratio: 4 / 3; }
  .kids__eyebrow { font-size: 13px; letter-spacing: 0.16em; }
  .kids__title { font-size: 36px; }
  .kids__lead { font-size: 17px; }
}
</style>