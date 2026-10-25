<script setup>
/*
  ФОТО: покладіть один файл у src/assets/ з назвою events (events.jpg / events.png / events.webp).
  Розширення може бути будь-яке з цих, код міняти не треба.
*/
const found = import.meta.glob('@/assets/events.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
const photo = Object.values(found)[0] || null

const events = [
  { title: 'Весілля', text: 'Свято в залі або просто неба' },
  { title: 'Ювілеї', text: 'У колі родини й друзів' },
  { title: 'Корпоративні банкети', text: 'Зустрічі команди за святковим столом' },
  { title: 'Тематичні вечірки', text: 'Декор і музика для вашого настрою' },
  { title: 'Дитячі свята', text: 'Веселі пригоди з аніматорами' }
]
</script>

<template>
  <section id="podii" data-nav="podii" class="events">
    <div class="events__wrap">
      <p class="events__eyebrow">Для важливих моментів</p>

      <div class="events__head">
        <h2 class="events__title">Ваш привід.<br />Наша гостинність.</h2>
        <p class="events__lead">Розкажіть про подію, а ми підберемо зал, меню й програму.</p>
      </div>

      <div class="events__body">
        <img v-if="photo" class="events__photo" :src="photo" alt="Святково накритий довгий стіл у залі «Садиби»" loading="lazy" />
        <div v-else class="events__photo events__photo--empty">Додайте фото в src/assets/events.jpg</div>

        <ul class="events__list">
          <li v-for="e in events" :key="e.title" class="event">
            <h3 class="event__title">{{ e.title }}</h3>
            <p class="event__text">{{ e.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  Макет 1920 px. Розміри плинні (clamp): на 1920 = макет, на менших екранах зменшуються.
  ≤1024px: одна колонка — заголовок, текст під ним, фото, список.
*/
.events {
  background: var(--cream);
  color: #2a2220;
  padding: clamp(56px, 5.5vw, 106px) 0; /* 106px на 1920 */
}

.events__wrap {
  max-width: 1920px;
  margin-inline: auto;
  padding-inline: clamp(24px, 7.5vw, 144px); /* контент ≈1632px на 1920 */
}

.events__eyebrow {
  margin: 0 0 clamp(20px, 2.25vw, 25px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--wine);
}

/* заголовок ліворуч, короткий текст — праворуч, по нижньому краю заголовка */
.events__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px clamp(40px, 5.9vw, 113px);
  margin-bottom: clamp(24px, 1.9vw, 36px);
}
.events__title {
  margin: 0;
  font: 400 clamp(38px, 3.45vw, 66px) / 1.2 var(--font-display);
  color: #2a2220;
}
.events__lead {
  margin: 0;
  max-width: 28em;
  font-size: clamp(15px, 0.94vw, 18px);
  line-height: 1.5;
  color: #7a6e69;
}

.events__body {
  display: grid;
  grid-template-columns: 847fr 700fr; /* пропорції з макета */
  gap: clamp(32px, 4.6vw, 88px);
  align-items: start;
}

.events__photo {
  display: block;
  width: 100%;
  aspect-ratio: 847 / 651;
  object-fit: cover;
}
.events__photo--empty { display: grid; place-items: center; padding: 24px; text-align: center; background: rgba(42, 34, 32, 0.08); color: #7a6e69; }

.events__list { list-style: none; margin: 0; padding: 0; }
.event {
  padding: clamp(14px, 1.15vw, 22px) 0 clamp(16px, 1.3vw, 25px);
  border-top: 1px solid rgba(42, 34, 32, 0.14);
}
.event__title { margin: 0; font: 400 clamp(22px, 1.67vw, 32px) / 1.3 var(--font-display); }
.event__text { margin: 4px 0 0; font-size: clamp(14px, 0.85vw, 16px); line-height: 1.3; color: #7a6e69; }

@media (max-width: 1024px) {
  .events__body { grid-template-columns: 1fr; gap: 28px; }
  .events__photo { aspect-ratio: 16 / 10; }
}
@media (max-width: 480px) {
  .events__photo { aspect-ratio: 4 / 3; }
}
</style>