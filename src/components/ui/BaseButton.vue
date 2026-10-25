<script setup>
defineProps({
  href: { type: String, default: '#' },
  variant: { type: String, default: 'light' } // light | ghost | dark
})
</script>

<template>
  <a class="btn" :class="`btn--${variant}`" :href="href"><slot /></a>
</template>

<style scoped>
.btn { display: inline-block; padding: 14px 24px; border-radius: 12px; font: 700 20px var(--font-body); text-decoration: none; border: 1px solid transparent; white-space: nowrap; }
.btn--light { background: #fff4ea; color: var(--wine); }
.btn--ghost { background: transparent; color: #fff; border-color: rgba(255, 255, 255, 0.45); }
.btn--dark { background: var(--wine); color: #fff; }
.btn:hover { filter: brightness(1.06); }
</style>
