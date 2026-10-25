<script setup>
defineProps({
  open: Boolean,  // меню відкрите
  solid: Boolean  // поза hero: суцільна бордова кнопка
})
defineEmits(['toggle'])
</script>

<template>
  <button class="burger" :class="{ 'is-solid': solid }" type="button"
    :aria-expanded="open" aria-controls="side-menu" :aria-label="open ? 'Закрити меню' : 'Відкрити меню'"
    @click="$emit('toggle')">
    <span>{{ open ? 'Закрити' : 'Меню' }}</span>
    <b :class="{ 'is-open': open }"><i /><i /></b>
  </button>
</template>

<style scoped>
.burger { 
  position: fixed; 
  z-index: 20; 
  top: calc(env(safe-area-inset-top, 0px) + 16px); 
  right: 16px; 
  height: 50px; 
  padding: 0 18px;
  display: flex; 
  align-items: center; 
  gap: 14px; cursor:
  pointer; color: #fff; 
  border-radius: 12px; 
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(24, 8, 10, 0.55); 
  -webkit-backdrop-filter: blur(10px); 
  backdrop-filter: blur(10px);
  font: 500 18px var(--font-body); 
  letter-spacing: 0.2em; text-transform: uppercase; 
  transition: background 0.3s, border-color 0.3s; 
}

.burger:hover { background: rgba(24, 8, 10, 0.75); border-color: rgba(255, 255, 255, 0.7); }
.burger.is-solid { background: var(--wine); border-color: rgba(255, 255, 255, 0.5); -webkit-backdrop-filter: none; backdrop-filter: none; }
.burger.is-solid:hover { background: var(--wine-d); }
b { display: grid; gap: 6px; width: 22px; }
i { display: block; width: 22px; height: 1.5px; background: #fff; border-radius: 2px; transition: transform 0.3s, width 0.3s; }
i:nth-child(2) { width: 14px; justify-self: end; }
b.is-open i:nth-child(1) { transform: translateY(3.75px) rotate(45deg); }
b.is-open i:nth-child(2) { width: 22px; transform: translateY(-3.75px) rotate(-45deg); }
</style>
