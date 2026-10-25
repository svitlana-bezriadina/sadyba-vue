<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import restaurantImg from '@/assets/restaurant.png'

const features = [
  {
    text: 'Домашня кухня',
    paths: [
      'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2',
      'M7 2v20',
      'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'
    ]
  },
  {
    text: 'Літній майданчик',
    paths: [
      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
      'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41',
      'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'
    ]
  },
  {
    text: 'Стоянка, що охороняється',
    paths: [
      'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
      'm9 12 2 2 4-4'
    ]
  },
  {
    text: 'Безкоштовний Wi-Fi',
    paths: [
      'M12 20h.01',
      'M2 8.82a15 15 0 0 1 20 0',
      'M5 12.859a10 10 0 0 1 14 0',
      'M8.5 16.429a5 5 0 0 1 7 0'
    ]
  }
]

/* ---------- поява елементів при прокрутці ---------- */
// «armed» вмикається лише якщо браузер підтримує IntersectionObserver і користувач не просив зменшити рух;
// інакше все одразу видно, без анімації.
const armed = ref(
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
)
const visible = ref(false)
const root = ref(null)
let io = null

onMounted(() => {
  if (!armed.value) return
  io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { visible.value = true; io.disconnect() }
  }, { threshold: 0.15 })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="restoran" ref="root" data-nav="restoran" class="restaurant" :class="{ 'is-armed': armed, 'is-visible': visible }">
    <div class="restaurant__grid">
      <div class="restaurant__media reveal" style="--d: 0s">
        <div class="restaurant__frame">
          <img
            class="restaurant__photo"
            :src="restaurantImg"
            alt="Зал ресторану «Садиба» з дерев'яними колонами з колод"
            loading="lazy"
          />
        </div>
      </div>

      <div class="restaurant__text">
        <p class="restaurant__eyebrow reveal" style="--d: 0.1s">Ресторан «Садиба»</p>
        <h2 class="restaurant__title reveal" style="--d: 0.2s">Місце, де можна<br />не поспішати</h2>
        <p class="restaurant__lead reveal" style="--d: 0.3s">
          Будинок із цілих колод звели спеціально для «Садиби». Дерев'яні меблі, зелень, гра світла й тіні –
          усе нагадує старий заміський дім, у якому раді гостям.
        </p>

        <ul class="restaurant__features reveal" style="--d: 0.4s">
          <li v-for="f in features" :key="f.text">
            <span class="restaurant__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path v-for="d in f.paths" :key="d" :d="d" />
              </svg>
            </span>
            <span>{{ f.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.restaurant {
  background: var(--cream);
  color: #2a2220;
  padding: clamp(56px, 6.9vw, 132px) 0; /* 132px на 1920 */
  overflow-x: clip; /* рамка за фото не створює горизонтального скролу */
}

.restaurant__grid {
  display: grid;
  grid-template-columns: 900fr 696fr; /* більше фото, як у вашій версії */
  gap: clamp(40px, 4.6vw, 88px);
  align-items: center;
  max-width: 1920px;
  margin-inline: auto;
  padding-inline: clamp(24px, 6.15vw, 118px); /* контент 1684px на 1920 */
}

/* --- фото: зсунута тонка рамка + повільний zoom при наведенні --- */
.restaurant__media { position: relative; }
.restaurant__media::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translate(clamp(10px, 1.1vw, 20px), clamp(10px, 1.1vw, 20px));
}
.restaurant__frame { position: relative; overflow: hidden; background: rgba(42, 34, 32, 0.06); }
.restaurant__photo {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 12;
  object-fit: cover;
  transition: transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
@media (hover: hover) { .restaurant__media:hover .restaurant__photo { transform: scale(1.04); } }

/* --- текст --- */
.restaurant__text { display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; }

.restaurant__eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 clamp(18px, 1.45vw, 28px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--wine);
}

.restaurant__title {
  margin: 0 0 clamp(20px, 1.6vw, 31px);
  font: 400 clamp(38px, 3.45vw, 66px) / 1.2 var(--font-display);
  color: #2a2220;
}

.restaurant__lead {
  margin: 0 0 clamp(24px, 2.3vw, 44px);
  font-size: clamp(17px, 1.1vw, 21px);
  line-height: 1.65;
  color: #7a6e69;
}

.restaurant__features {
  list-style: none;
  margin: 0;
  padding: clamp(22px, 2vw, 38px) 0 0;
  width: 100%;
  border-top: 1px solid rgba(42, 34, 32, 0.14);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(16px, 1.4vw, 26px) clamp(16px, 1.6vw, 30px);
}
.restaurant__features li {
  display: flex;
  align-items: center;
  gap: clamp(12px, 0.85vw, 16px);
  font-size: clamp(16px, 1.04vw, 20px);
  line-height: 1.3;
  color: #2a2220;
}
/* іконка в м'якому бордовому колі */
.restaurant__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: clamp(38px, 2.3vw, 44px);
  height: clamp(38px, 2.3vw, 44px);
  border-radius: 50%;
  background: rgba(107, 13, 20, 0.08);
  color: var(--wine);
  transition: background 0.3s, color 0.3s;
}
.restaurant__icon svg { width: 52%; height: 52%; }
.restaurant__features li:hover .restaurant__icon { background: var(--wine); color: #fff; }

/* --- поява при прокрутці (працює лише коли секція «armed») --- */
.is-armed .reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--d, 0s);
}
.is-armed.is-visible .reveal { opacity: 1; transform: none; }

/* ===== ПЛАНШЕТ (до 1024 px): одна колонка, фото зверху ===== */
@media (max-width: 1024px) {
  .restaurant { padding: clamp(48px, 7vw, 72px) 0; }
  .restaurant__grid { grid-template-columns: 1fr; gap: 48px; }
  .restaurant__media::before { transform: translate(14px, 14px); }
  .restaurant__photo { aspect-ratio: 3 / 2; }
  .restaurant__text { max-width: 720px; }
  .restaurant__title { font-size: clamp(40px, 5.2vw, 52px); }
  .restaurant__lead { font-size: 19px; }
  .restaurant__features li { font-size: 18px; }
}

/* ===== ТЕЛЕФОН (до 600 px) ===== */
@media (max-width: 600px) {
  .restaurant { padding: 44px 0 52px; }
  .restaurant__grid { gap: 40px; padding-inline: 24px; }
  .restaurant__media::before { transform: translate(10px, 10px); }
  .restaurant__photo { aspect-ratio: 4 / 3; }
  .restaurant__eyebrow { font-size: 13px; letter-spacing: 0.16em; gap: 10px; }
  .restaurant__title { font-size: 36px; margin-bottom: 18px; }
  .restaurant__lead { font-size: 17px; margin-bottom: 26px; }
  .restaurant__features { grid-template-columns: 1fr; padding-top: 22px; gap: 14px; }
  .restaurant__features li { font-size: 17px; }
  .restaurant__icon { width: 40px; height: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  .is-armed .reveal { transition: none; }
  .restaurant__photo { transition: none; }
  .restaurant__media:hover .restaurant__photo { transform: none; }
}
</style>