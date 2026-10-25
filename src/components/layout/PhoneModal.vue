<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { site } from '@/data/site'

const open = ref(false)
const root = ref(null)
const closeBtn = ref(null)
let trigger = null // кнопка, що відкрила вікно — туди повернемо фокус

const show = (el) => { trigger = el; open.value = true }
const hide = () => { open.value = false }

watch(open, async (o) => {
  document.documentElement.style.overflow = o ? 'hidden' : ''
  if (o) {
    await nextTick()
    closeBtn.value?.focus()
  } else {
    trigger?.focus?.({ preventScroll: true })
  }
})

// один слухач на весь документ: ловить кліки по [data-phone-modal]
const onDocClick = (e) => {
  const el = e.target.closest?.('[data-phone-modal]')
  if (!el) return
  e.preventDefault()
  show(el)
}

const onKey = (e) => {
  if (!open.value) return
  if (e.key === 'Escape') { hide(); return }
  if (e.key === 'Tab') { // фокус не виходить за межі вікна
    const items = [...root.value.querySelectorAll('a[href], button')]
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Transition name="pm">
    <div v-if="open" ref="root" class="pm" @click.self="hide">
      <button ref="closeBtn" class="pm__close" type="button" aria-label="Закрити" @click="hide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>

      <div class="pm__card" role="dialog" aria-modal="true" aria-labelledby="pm-label">
        <p id="pm-label" class="pm__label">Контактний телефон</p>
        <a class="pm__phone" :href="`tel:${site.phoneTel}`">{{ site.phone }}</a>
        <p class="pm__text">
          Щоб забронювати стіл чи номер або уточнити інформацію, зателефонуйте за цим номером.
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pm {
  position: fixed;
  inset: 0;
  z-index: 30; /* вище за бургер (20) і бічне меню (15) */
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(18, 7, 8, 0.74);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.pm__close {
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 14px);
  right: 14px;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}
.pm__close:hover { background: rgba(255, 255, 255, 0.12); }
.pm__close svg { width: 24px; height: 24px; fill: none; stroke: #fff4ea; stroke-width: 2; stroke-linecap: round; }

.pm__card {
  width: min(100%, 480px);
  padding: clamp(30px, 3vw, 46px) clamp(24px, 3vw, 48px);
  text-align: center;
  color: #fff4ea;
  background: var(--wine-d);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 16px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
}

.pm__label {
  margin: 0 0 10px;
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}

.pm__phone {
  display: inline-block;
  font: 400 clamp(32px, 4.4vw, 46px) / 1.15 var(--font-display);
  color: var(--paper);
  text-decoration: none;
  white-space: nowrap;
}
.pm__phone:hover { text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 1px; }

.pm__text {
  margin: 22px 0 0;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 18px;
  line-height: 1.55;
  color: rgba(255, 244, 234, 0.88);
}

/* поява: фон розчиняється, картка злегка піднімається */
.pm-enter-active, .pm-leave-active { transition: opacity 0.3s ease; }
.pm-enter-active .pm__card, .pm-leave-active .pm__card { transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1); }
.pm-enter-from, .pm-leave-to { opacity: 0; }
.pm-enter-from .pm__card, .pm-leave-to .pm__card { transform: translateY(18px) scale(0.97); }

@media (max-width: 480px) {
  .pm__text { font-size: 17px; }
}
@media (prefers-reduced-motion: reduce) {
  .pm-enter-active, .pm-leave-active, .pm-enter-active .pm__card, .pm-leave-active .pm__card { transition: none; }
}
</style>
