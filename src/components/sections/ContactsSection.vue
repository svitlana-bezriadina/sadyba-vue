<script setup>
import { computed } from 'vue'

/*
  МАПА. Змінюйте лише цей блок.
  ADDRESS  — адреса, що показується в тексті (взято зі старого сайту usadba.mk.ua — перевірте актуальність).
  COORDS   — необовʼязково: точні координати "широта,довгота" (наприклад '46.95,31.95').
             Якщо вказати, маркер стане в цю точку, а не за геокодером адреси.
             Як взяти: у Google Maps правою кнопкою на потрібне місце → перший рядок із цифрами → клік копіює.
*/
const ADDRESS = 'Одеське шосе, 69/1, Миколаїв, Миколаївська область, Україна, 54036'
const COORDS = '46.98813258986475, 31.92207385786929' 

const query = computed(() => encodeURIComponent(COORDS || ADDRESS))
const embedSrc = computed(() => `https://www.google.com/maps?q=${query.value}&hl=uk&z=15&output=embed`)
const routeHref = computed(() => `https://www.google.com/maps/dir/?api=1&destination=${query.value}`)
const openHref = computed(() => `https://www.google.com/maps/search/?api=1&query=${query.value}`)
</script>

<template>
  <section id="kontakty" data-nav="kontakty" class="contacts">
    <div class="contacts__grid">
      <!-- ТЕКСТ -->
      <div class="contacts__text">
        <p class="contacts__eyebrow">Поруч із вашим шляхом</p>
        <h2 class="contacts__title">Дорогою<br />до Миколаєва</h2>
        <p class="contacts__lead">
          «Садиба» розташована на в'їзді до Миколаєва з одеського напрямку. Зручна зупинка, щоб пообідати,
          перепочити або залишитися на ніч.
        </p>

        <p class="contacts__feature">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <path d="M9 17h6" />
            <path d="M7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            <path d="M17 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          <span>Стоянка, що охороняється</span>
        </p>

        <p class="contacts__label">Точна адреса</p>
        <p class="contacts__address">{{ ADDRESS }}</p>
      </div>

      <!-- МІНІ-МАПА -->
      <div class="map">

        <div class="map__frame">
          <iframe
            class="map__iframe"
            :src="embedSrc"
            title="Мапа: розташування «Садиби»"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>

        <div class="map__bar">
          <span class="map__links">
            <a :href="routeHref" target="_blank" rel="noopener">Прокласти маршрут</a>
            <a :href="openHref" target="_blank" rel="noopener">Відкрити в Google Maps</a>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  Макет 1920 px. Розміри плинні (clamp): на 1920 = макет, на менших екранах зменшуються.
  ≤1024px: одна колонка — текст, під ним мапа.
*/
.contacts {
  background: var(--cream);
  color: #2a2220;
  padding: clamp(48px, 5.2vw, 100px) 0; /* 100px на 1920 */
}

.contacts__grid {
  max-width: 1920px;
  margin-inline: auto;
  padding-inline: clamp(24px, 7.5vw, 144px); /* контент ≈1632px на 1920 */
  display: grid;
  grid-template-columns: 660fr 872fr; /* пропорції з макета */
  gap: clamp(40px, 5.2vw, 100px);
  align-items: center;
}

/* --- текст --- */
.contacts__text { display: flex; flex-direction: column; align-items: flex-start; }

.contacts__eyebrow {
  margin: 0 0 clamp(18px, 1.45vw, 28px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--wine);
}

.contacts__title {
  margin: 0 0 clamp(14px, 1.05vw, 20px);
  font: 400 clamp(38px, 3.45vw, 66px) / 1.2 var(--font-display);
  color: #2a2220;
}

.contacts__lead {
  margin: 0 0 clamp(18px, 1.5vw, 28px);
  max-width: 27em;
  font-size: clamp(17px, 1.1vw, 21px);
  line-height: 1.65;
  color: #7a6e69;
}

.contacts__feature {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 clamp(18px, 1.5vw, 28px);
  font-size: clamp(15px, 0.94vw, 18px);
}
.contacts__feature svg { width: clamp(20px, 1.15vw, 22px); height: clamp(20px, 1.15vw, 22px); flex: none; fill: none; stroke: var(--wine); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }

.contacts__label {
  margin: 0 0 6px;
  font: 500 clamp(12px, 0.78vw, 15px) var(--font-body);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--wine);
}
.contacts__address { margin: 0; font-size: clamp(16px, 0.94vw, 18px); }

/* --- міні-мапа --- */
.map { background: var(--sand, #eee6da); }



.map__frame { position: relative; aspect-ratio: 900 / 500; background: rgba(42, 34, 32, 0.06); }
.map__iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: sepia(0.15) saturate(0.9); }

.map__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
  padding: clamp(12px, 1vw, 18px) clamp(16px, 1.3vw, 24px);
  font-size: clamp(13px, 0.8vw, 15px);
  color: #7a6e69;
}
.map__links { display: flex; flex-wrap: wrap; gap: 8px 22px; }
.map__links a { color: var(--wine); font-weight: 500; text-decoration: none; }
.map__links a:hover { text-decoration: underline; text-underline-offset: 5px; }

/* ===== ПЛАНШЕТ (до 1024 px) ===== */
@media (max-width: 1024px) {
  .contacts__grid { grid-template-columns: 1fr; gap: 40px; }
  .contacts__text { max-width: 720px; }
  .contacts__title { font-size: clamp(40px, 5.2vw, 52px); }
  .contacts__lead { font-size: 19px; }
  .contacts__feature, .contacts__address { font-size: 17px; }
  .map__frame { aspect-ratio: 16 / 9; }
}

/* ===== ТЕЛЕФОН (до 600 px) ===== */
@media (max-width: 600px) {
  .contacts { padding: 44px 0 52px; }
  .contacts__eyebrow { font-size: 13px; letter-spacing: 0.16em; }
  .contacts__title { font-size: 36px; }
  .contacts__lead { font-size: 17px; }
  .map__frame { aspect-ratio: 4 / 3; }
  .map__bar { flex-direction: column; align-items: flex-start; }
}
</style>