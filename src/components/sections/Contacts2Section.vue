<script setup>
import { site } from '@/data/site'
import BaseButton from '../ui/BaseButton.vue'

const BOOK_TABLE_HREF = `tel:${site.phoneTel}`
const ASK_ROOM_HREF = `tel:${site.phoneTel}`
</script>

<template>
  <section class="cta">
    <div class="cta__wrap">
      <div class="cta__head">
        <div>
          <p class="cta__eyebrow">Плануйте зустріч у «Садибі»</p>
          <h2 class="cta__title">Завітайте на обід.<br />Залиштеся на ніч.</h2>
        </div>

        <div class="cta__buttons">
          <BaseButton :href="BOOK_TABLE_HREF" data-phone-modal>Забронювати стіл</BaseButton>
          <BaseButton :href="ASK_ROOM_HREF" variant="ghost" data-phone-modal>Запитати про номер</BaseButton>
        </div>
      </div>

      <dl class="cta__info">
        <div>
          <dt>Телефон</dt>
          <dd><a :href="`tel:${site.phoneTel}`">{{ site.phone }}</a></dd>
        </div>
        <div>
          <dt>Години роботи</dt>
          <dd>{{ site.hours }}</dd>
        </div>
        <div>
          <dt>Адреса</dt>
          <dd>{{ site.address }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--wine-d);
  color: #fff;
}

.cta__wrap {
  max-width: 1920px;
  margin-inline: auto;
  padding: clamp(36px, 3.9vw, 74px) clamp(24px, 4.3vw, 82px) clamp(32px, 4.3vw, 82px);
}

.cta__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: clamp(24px, 2.7vw, 51px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.cta__eyebrow {
  margin: 0 0 clamp(18px, 1.9vw, 36px);
  font: 500 clamp(13px, 1.04vw, 20px) var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.cta__title {
  margin: 0;
  font: 400 clamp(38px, 3.45vw, 66px) / 1.1 var(--font-display);
  color: #fff4ea;
}


.cta__buttons { display: flex; flex-direction: column; gap: 14px; flex: none; margin-top: clamp(0px, 0.6vw, 12px); }
.cta__buttons :deep(.btn) { display: block; min-width: clamp(190px, 11.2vw, 214px); text-align: center; }

.cta__info {
  margin: 0;
  padding-top: clamp(24px, 2.5vw, 48px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px clamp(24px, 3.2vw, 62px);
}
.cta__info dt {
  margin: 0 0 clamp(8px, 0.65vw, 12px);
  font-size: clamp(12px, 0.78vw, 15px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}
.cta__info dd { margin: 0; font-size: clamp(15px, 0.94vw, 24px); line-height: 1.4; color: #fff4ea; }
.cta__info a { color: inherit; text-decoration: none; }
.cta__info a:hover { text-decoration: underline; text-underline-offset: 5px; }


@media (max-width: 1024px) {
  .cta__head { flex-direction: column; gap: 28px; }
  .cta__buttons { flex-direction: row; flex-wrap: wrap; margin-top: 0; }
  .cta__title { font-size: clamp(40px, 5.2vw, 52px); }
  .cta__info { grid-template-columns: 1fr 1fr; }
  .cta__info > div:last-child { grid-column: 1 / -1; }
  .cta__info dd { font-size: 17px; }
}

@media (max-width: 600px) {
  .cta__wrap { padding: 40px 24px 36px; }
  .cta__eyebrow { font-size: 12.5px; letter-spacing: 0.16em; margin-bottom: 16px; }
  .cta__title { font-size: 34px; }
  .cta__buttons { flex-direction: column; width: 100%; gap: 12px; }
  .cta__buttons :deep(.btn) { width: 100%; padding: 16px 20px; font-size: 18px; }
  .cta__info { grid-template-columns: 1fr; gap: 20px; }
}
</style>
