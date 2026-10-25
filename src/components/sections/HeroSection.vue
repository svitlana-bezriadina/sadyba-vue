<script setup>
import heroImg from '@/assets/hero.jpg'
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <section id="top" class="hero">
    <img class="hero__bg" :src="heroImg" alt="" fetchpriority="high" />
    <div class="hero__shade" />
    <div class="wrap hero__content">
      <p class="hero__eyebrow">Ресторанно-готельний комплекс · Миколаїв</p>
      <h1>Дім із колод<br />на в'їзді до<br />Миколаєва</h1>
      <p class="hero__sub">Домашня кухня, чотири зали, міні-готель і дитяча кімната. Зупиніться, відпочиньте, їдьте далі.</p>
      <div class="hero__acts">
        <BaseButton href="#kontakty" data-phone-modal>Забронювати стіл</BaseButton>
        <BaseButton href="#hotel" variant="ghost" data-phone-modal>Забронювати номер</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { 
  position: relative; 
  min-height: 100svh; 
  background: #1a0a0b; 
  color: #fff; 
  overflow: hidden; 
  display: flex; 
}

/* картинка вища за блок і притиснута донизу, щоб напис на даху лишився за кадром */
.hero__bg { 
  position: absolute; 
  left: 0; 
  right: 0; 
  bottom: -25%; 
  width: 100%; 
  height: 127%; 
  object-fit:cover; 
  object-position: 72% 100%; 
}

.hero__shade { 
  position: absolute; 
  inset: 0; 
  background:
  linear-gradient(90deg, rgba(18, 7, 8, 0.9) 0%, rgba(18, 7, 8, 0.66) 34%, rgba(18, 7, 8, 0.12) 68%, rgba(18, 7, 8, 0) 100%),
  linear-gradient(180deg, rgba(18, 7, 8, 0.62) 0%, rgba(18, 7, 8, 0) 28%, rgba(18, 7, 8, 0) 72%, rgba(18, 7, 8, 0.5) 100%); 
}

.hero__content { 
  position: relative; 
  z-index: 1;
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: flex-start; 
  padding-top: 104px; 
  padding-bottom: 48px; 
}

.hero__eyebrow { 
  margin: 0 0 22px; 
  max-width: 600px; 
  font-size: 18px; 
  letter-spacing: 0.22em; 
  text-transform: uppercase; 
  opacity: 0.75; 
}

h1 { 
  font: 400 clamp(44px, 6.6vw, 100px) / 1.04 var(--font-display); 
  margin: 0 0 24px; 
}

.hero__sub { 
  font-size: 24px; 
  max-width: 34ch; 
  margin: 0 0 30px; 
  opacity: 0.92; 
}


.hero__acts { 
  display: flex; 
  gap: 14px; 
  flex-wrap: wrap; 
}

/* ===== ПЛАНШЕТ (до 1024 px): текст унизу, фото зверху, темніє знизу ===== */
@media (max-width: 1024px) {
  .hero__bg {
    bottom: 0;
    height: 127%;
    object-position: 72% 100%;
  }

  .hero__shade {
    background:
      linear-gradient(180deg, rgba(18, 7, 8, 0.55) 0%, rgba(18, 7, 8, 0) 22%, rgba(18, 7, 8, 0.3) 42%, rgba(18, 7, 8, 0.82) 68%, rgba(18, 7, 8, 0.95) 100%),
      linear-gradient(90deg, rgba(18, 7, 8, 0.5) 0%, rgba(18, 7, 8, 0) 75%);
  }

  .hero__content {
    padding: 112px clamp(24px, 5vw, 56px) calc(56px + env(safe-area-inset-bottom, 0px));
    align-items: flex-start;
  }

  .hero__eyebrow {
    font-size: 15px;
    letter-spacing: 0.2em;
    max-width: 520px;
    margin-bottom: 18px;
  }

  h1 {
    font-size: clamp(48px, 8vw, 72px);
    margin-bottom: 20px;
  }

  .hero__sub {
    font-size: 21px;
    max-width: 36ch;
    margin-bottom: 28px;
  }
  .wrap {padding: 50px; margin: 0;}
}

/* ===== ТЕЛЕФОН (до 767 px): текст по центру, кнопки в один ряд ===== */
@media (max-width: 768px) {

  .hero {min-height: 70svh;}
  .hero__shade {
    background:
      linear-gradient(180deg, rgba(18, 7, 8, 0.6) 0%, rgba(18, 7, 8, 0) 22%, rgba(18, 7, 8, 0) 78%, rgba(18, 7, 8, 0.5) 100%),
      radial-gradient(ellipse 90% 70% at 50% 52%, rgba(18, 7, 8, 0.72) 0%, rgba(18, 7, 8, 0.5) 100%);
  }

  .hero__content {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding:0 24px;
    margin:50px 0 50px 0;
  }

  .hero__eyebrow {
    max-width: none;
    opacity: 0.92;
    font-size: clamp(11px, 2.6vw, 16px);
    letter-spacing: 0.15em;
    margin-bottom: clamp(16px, 3.4vw, 24px);
  }

  h1 {
    font-size: clamp(38px, 11vw, 80px);
    line-height: 1.06;
    margin-bottom: clamp(18px, 3.6vw, 28px);
  }

  .hero__sub {
    font-size: clamp(16px, 2.7vw, 20px);
    line-height: 1.5;
    max-width: 34ch;
    margin: 0 auto clamp(24px, 4.4vw, 34px);
  }

  .hero__acts {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 10px;
  }

  .hero__acts :deep(.btn) {
    width: auto;
    padding: 14px 16px;
    font-size: clamp(14.5px, 2.4vw, 19px);
    font-weight: 500;
  }
}

</style>