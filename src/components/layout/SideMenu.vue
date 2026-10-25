<script setup>
import { watch, nextTick, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  open: Boolean,
  items: { type: Array, required: true }, // [{ key, label, href }]
  active: { type: String, default: null }  // ключ поточного розділу
})
const emit = defineEmits(['close'])
const root = ref(null)

watch(() => props.open, async (o) => {
  document.documentElement.style.overflow = o ? 'hidden' : ''
  if (o) {
    await nextTick()
    setTimeout(() => (root.value?.querySelector('a.is-active') || root.value?.querySelector('a'))?.focus(), 60)
  }
})
const onKey = (e) => { if (e.key === 'Escape' && props.open) emit('close') }
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' })
</script>

<template>
  <div id="side-menu" ref="root" class="menu" :class="{ 'is-open': open }" :aria-hidden="!open"
    @click.self="emit('close')">
    <nav class="menu__nav" aria-label="Розділи сайту">
      <a v-for="it in items" :key="it.key" :href="it.href" :class="{ 'is-active': it.key === active }"
        :aria-current="it.key === active ? 'true' : null" @click="emit('close')">{{ it.label }}</a>
    </nav>
  </div>
</template>

<style scoped>
.menu { position: fixed; inset: 0; z-index: 15; visibility: hidden; opacity: 0; transition: opacity 0.4s, visibility 0.4s;
  background: linear-gradient(90deg, rgba(10, 3, 4, 0) 0%, rgba(10, 3, 4, 0) 36%, rgba(10, 3, 4, 0.8) 60%, rgba(8, 2, 3, 0.97) 100%); }
.menu.is-open { visibility: visible; opacity: 1; }
/* розмиття правої частини + тонка вертикальна лінія */
.menu::before { content: ''; position: absolute; top: 0; bottom: 0; right: 0; width: 50%; -webkit-backdrop-filter: blur(7px); backdrop-filter: blur(7px);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 55%); mask-image: linear-gradient(90deg, transparent, #000 55%); }
.menu::after { content: ''; position: absolute; right: 56px; top: 12%; bottom: 12%; width: 1px; background: rgba(255, 255, 255, 0.7); }
.menu__nav { position: absolute; z-index: 1; top: 0; bottom: 0; right: 0; width: 400px; max-width: 100%; padding: 0 80px 0 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 34px; color: #fff; }
a { font-size: 21px; letter-spacing: 0.09em; text-transform: uppercase; text-decoration: none; text-align: center; padding: 4px 0;
  text-underline-offset: 9px; text-decoration-thickness: 1.5px; opacity: 0; transform: translateX(24px); transition: opacity 0.45s, transform 0.45s; }
.is-open a { opacity: 1; transform: none; }
.is-open a:nth-child(2) { transition-delay: 0.05s; } .is-open a:nth-child(3) { transition-delay: 0.1s; }
.is-open a:nth-child(4) { transition-delay: 0.15s; } .is-open a:nth-child(5) { transition-delay: 0.2s; }
a:hover { text-decoration: underline; text-decoration-color: rgba(255, 255, 255, 0.5); }
a.is-active { text-decoration: underline; text-decoration-color: #fff; }
@media (max-width: 700px) {
  .menu { background: linear-gradient(90deg, rgba(10, 3, 4, 0.25) 0%, rgba(10, 3, 4, 0.92) 45%, rgba(8, 2, 3, 0.98) 100%); }
  .menu::before { width: 100%; }
  a {font-size: 18px; letter-spacing: 0.08em; }
  .menu__nav { width: 100%; padding:0;}
  .menu::after { right: 28px; }
}
@media (prefers-reduced-motion: reduce) { .menu, a { transition: none; } }
</style>
