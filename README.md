# Садиба — сайт на Vue 3 + Vite

## Запуск
```bash
npm install
npm run dev      # розробка: http://localhost:5173
npm run build    # збірка в dist/
npm run preview  # перегляд збірки
```
Потрібен Node.js 18+.

## Структура

```
src/
  App.vue                      збирає сторінку, тримає стан меню
  main.js                      шрифти (self-hosted через @fontsource) + стилі
  styles/
    tokens.css                 кольори, шрифти, ширина контейнера (з Figma)
    base.css                   reset, .wrap, .section, .section--wine, .lead
  data/site.js                 телефон, адреса, години, пункти меню, зали, події
  composables/useScrollSpy.js  визначає поточний розділ для підкреслення в меню
  components/
    layout/   BurgerButton · SideMenu · SiteFooter
    sections/ HeroSection · RestaurantSection · HallsSection · HotelSection
              EventsSection · KidsSection · ContactsSection
    ui/       BaseButton · PhotoPlaceholder
  assets/     hero.jpg · logo.png
```

## Як переносити Figma-макет
Один фрейм/блок у Figma = один файл у `components/sections/`.
1. Кольори й шрифти з Figma Styles → `styles/tokens.css`.
2. Тексти, телефон, адресу, номери, зали → `data/site.js`.
3. Розмітку й стилі блока → відповідний `*Section.vue` (стилі `scoped` лише для нього).
4. Кнопки з Figma → `ui/BaseButton.vue` (додайте варіанти в `variant`).
5. Фото замінюйте в `PhotoPlaceholder` на `<img>`; зображення кладіть у `src/assets/`.

## Як працює меню
- Кожна секція, що має бути підкреслена в меню, має `data-nav="ключ"`.
- `key` пункту в `data/site.js → nav` має збігатися з цим ключем.
- Ресторан і «Чотири зали» мають один ключ `restoran`, тому підкреслюється той самий пункт.
- Hero і футер не мають `data-nav`, тож у них підкреслення немає.

## Що ще заглушка
Телефон, адреса, години роботи, місткість залів, фото залів/номерів/дитячої кімнати.
