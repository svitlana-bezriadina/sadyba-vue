<script setup>
import { ref, watch } from 'vue'
import { nav } from '@/data/site'
import { useScrollSpy } from '@/composables/useScrollSpy'

import BurgerButton from '@/components/layout/BurgerButton.vue'
import SideMenu from '@/components/layout/SideMenu.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import RestaurantSection from '@/components/sections/RestaurantSection.vue'
import HallsSection from '@/components/sections/HallsSection.vue'
import HotelSection from '@/components/sections/HotelSection.vue'
import EventsSection from '@/components/sections/EventsSection.vue'
import KidsSection from '@/components/sections/KidsSection.vue'
import ContactsSection from '@/components/sections/ContactsSection.vue'
import Contacts2Section from '@/components/sections/Contacts2Section.vue'
import PhoneModal from '@/components/layout/PhoneModal.vue'

const menuOpen = ref(false)
const burger = ref(null)
const { active, pastHero } = useScrollSpy('#top')

// після закриття меню повертаємо фокус на кнопку
watch(menuOpen, (o) => { if (!o) burger.value?.$el.focus({ preventScroll: true }) })
</script>

<template>
  <BurgerButton ref="burger" :open="menuOpen" :solid="pastHero" @toggle="menuOpen = !menuOpen" />
  <SideMenu :open="menuOpen" :items="nav" :active="active" @close="menuOpen = false" />

  <main>
    <HeroSection />
    <RestaurantSection />
    <HallsSection />
    <HotelSection />
    <EventsSection />
    <KidsSection />
    <ContactsSection />
    <Contacts2Section />
  </main>
  <SiteFooter />
  <PhoneModal />
</template>
