<script setup>
// Фото: покладіть у src/assets/halls/ (імена можна змінити, головне — оновити імпорти)
import hall1 from '@/assets/restaurant.png'
import hall2 from '@/assets/restaurant2.png'
import hall3 from '@/assets/restaurant3.png'
import terrace from '@/assets/garden.png'

const halls = [
  { title: 'Зал 1', note: 'Місткість уточнюйте', img: hall1, alt: 'Зал 1 ресторану «Садиба»: столи з жовтими скатертинами й колони з колод' },
  { title: 'Зал 2', note: 'Місткість уточнюйте', img: hall2, alt: 'Зал 2 ресторану «Садиба»: велике вікно, світлі штори та квіти на столі' },
  { title: 'Зал 3', note: 'Місткість уточнюйте', img: hall3, alt: 'Зал 3 ресторану «Садиба»: дерев\'яні стіни й столи' },
  { title: 'Літній майданчик', note: 'Місткість уточнюйте', img: terrace, alt: 'Літній майданчик «Садиби»: садова доріжка, квіти й фонтан' }
]
</script>

<template>
  <section id="zali" data-nav="restoran" class="halls">
    <div class="halls__wrap">
      <p class="halls__eyebrow">Три зали та літній майданчик</p>
      <h2 class="halls__title">Свій простір для кожної нагоди</h2>

      <ul class="halls__list">
        <li v-for="h in halls" :key="h.title" class="hall">
          <img class="hall__photo" :src="h.img" :alt="h.alt" loading="lazy" />
          <h3 class="hall__name">{{ h.title }}</h3>
          <p class="hall__note">{{ h.note }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.halls {
  background: var(--sand);
  color: #2a2220;
  padding: clamp(56px, 5.5vw, 106px) 0; /* 106px на 1920 */
}

.halls__wrap {
  max-width: 1920px;
  margin-inline: auto;
  padding-inline: clamp(24px, 4.6vw, 88px); /* контент ≈1744px на 1920 */
}

.halls__eyebrow {
  margin: 0 0 clamp(20px, 2.25vw, 43px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--wine);
}

.halls__title {
  margin: 0 0 clamp(28px, 2.4vw, 46px);
  max-width: 13.5em; /* переносить «нагоди» на другий рядок, як у макеті */
  font: 400 clamp(38px, 3.45vw, 66px) / 1.2 var(--font-display);
  color: #2a2220;
}

.halls__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(32px, 3vw, 48px) clamp(16px, 1.25vw, 24px);
}

.hall__photo {
  display: block;
  width: 100%;
  aspect-ratio: 25 / 16;
  object-fit: cover;
}

.hall__name {
  margin: clamp(12px, 0.85vw, 16px) 0 0;
  padding-bottom: clamp(12px, 0.85vw, 16px);
  border-bottom: 1px solid rgba(42, 34, 32, 0.14);
  font: 400 clamp(20px, 1.25vw, 24px) / 1.3 var(--font-display);
}

.hall__note {
  margin: clamp(12px, 0.9vw, 17px) 0 0;
  font-size: clamp(15px, 0.85vw, 16px);
  line-height: 1.3;
  color: #7a6e69;
}

/* планшет: два ряди по дві зали */
@media (max-width: 1024px) {
  .halls__list { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
}

/* телефон: у стовпчик */
@media (max-width: 600px) {
  .halls__list { grid-template-columns: 1fr; gap: 32px; }
  .hall__photo { aspect-ratio: 3 / 2; }
}
</style>