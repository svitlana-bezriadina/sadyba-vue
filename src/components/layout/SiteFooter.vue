<script setup>
import logo from '@/assets/logo.png'

// Посилання підвалу (можуть відрізнятись від бічного меню)
const links = [
  { label: 'Ресторан', href: '#restoran' },
  { label: 'Міні-готель', href: '#hotel' },
  { label: 'Події', href: '#podii' },
  { label: 'Дитяча кімната', href: '#diti' },
  { label: 'Контакти', href: '#kontakty' }
]
const DEV_NAME = 'Curiosity' // хто розробив сайт
</script>

<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__top">
        <a class="footer__brand" href="#top" aria-label="Садиба — нагору">
          <img :src="logo" alt="Садиба" width="142" height="59" />
          <span>Ресторанно-готельний комплекс<br />Миколаїв, Україна</span>
        </a>

        <nav class="footer__nav" aria-label="Підвал сайту">
          <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
        </nav>
      </div>

      <div class="footer__bottom">
        <p>© «Садиба». Тепло, до якого повертаються.</p>
        <p>Розробка сайту: {{ DEV_NAME }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/*
  Макет 1920 px. Розміри плинні (clamp): на 1920 = макет, на менших екранах зменшуються.
  Планшет: до 1024 px · Телефон: до 600 px.
*/
.footer {
  background: var(--cream);
  color: #2a2220;
}

.footer__wrap {
  max-width: 1920px;
  margin-inline: auto;
  padding: clamp(28px, 2.6vw, 50px) clamp(24px, 4.3vw, 82px) calc(clamp(20px, 1.8vw, 34px) + env(safe-area-inset-bottom, 0px));
}

.footer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px 40px;
  flex-wrap: wrap;
  padding-bottom: clamp(20px, 2.2vw, 42px);
  border-bottom: 1px solid rgba(42, 34, 32, 0.12);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: clamp(14px, 1.3vw, 25px);
  text-decoration: none;
}
.footer__brand img { display: block; width: clamp(96px, 7.4vw, 142px); height: auto; }
.footer__brand span { font-size: clamp(14px, 0.94vw, 18px); line-height: 1.4; color: #7a6e69; }

.footer__nav { display: flex; flex-wrap: wrap; gap: 10px clamp(18px, 1.5vw, 28px); }
.footer__nav a { font-size: clamp(14px, 0.94vw, 18px); color: #2a2220; text-decoration: none; }
.footer__nav a:hover { color: var(--wine); text-decoration: underline; text-underline-offset: 6px; }

.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 8px 24px;
  flex-wrap: wrap;
  padding-top: clamp(16px, 1.9vw, 37px);
  font-size: clamp(12px, 0.84vw, 16px);
  color: #7a6e69;
}
.footer__bottom p { margin: 0; }

/* ===== ПЛАНШЕТ (до 1024 px): меню під логотипом ===== */
@media (max-width: 1024px) {
  .footer__top { flex-direction: column; align-items: flex-start; }
}

/* ===== ТЕЛЕФОН (до 600 px) ===== */
@media (max-width: 600px) {
  .footer__wrap { padding: 28px 24px calc(24px + env(safe-area-inset-bottom, 0px)); }
  .footer__nav { flex-direction: column; gap: 12px; }
  .footer__nav a { font-size: 16px; }
  .footer__bottom { flex-direction: column; font-size: 13px; }
}
</style>