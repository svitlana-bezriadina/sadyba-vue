import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Визначає, у якому розділі зараз користувач.
 * Розділи позначаються атрибутом data-nav="ключ".
 * Поза розділами (hero, футер) active === null.
 */
export function useScrollSpy(heroSelector = '#top') {
  const active = ref(null)
  const pastHero = ref(false)
  let raf = 0

  const update = () => {
    raf = 0
    const secs = [...document.querySelectorAll('[data-nav]')]
    const probe = window.innerHeight * 0.4
    let key = null
    for (const s of secs) {
      const r = s.getBoundingClientRect()
      if (r.top <= probe && r.bottom > probe) key = s.dataset.nav
    }
    const last = secs[secs.length - 1]
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
    if (last && atBottom && last.getBoundingClientRect().top < window.innerHeight * 0.7) key = last.dataset.nav
    active.value = key

    const hero = document.querySelector(heroSelector)
    pastHero.value = hero ? hero.getBoundingClientRect().bottom < 70 : false
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  return { active, pastHero }
}
