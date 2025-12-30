<script setup lang="ts">
import { MessageTypes } from '~~/types/enums/message-types'

defineProps<{
  setMessage: (type: MessageTypes, message: string, accept?: () => void) => void
}>()

const { loggedIn, clear: clearSession } = useUserSession()

const nav = ref<HTMLElement | null>(null)
const mobileMenu = ref<HTMLElement | null>(null)

const toggleNav = () => {
  if (nav.value && mobileMenu.value) {
    nav.value.className = (nav.value.className === '') ? 'active' : ''
    mobileMenu.value.className = (mobileMenu.value.className === 'mobile-menu') ? 'mobile-menu opened' : 'mobile-menu'
  }
}

const logout = async () => {
  if (loggedIn.value) {
    await clearSession()
    await navigateTo('/login')

    toggleNav()
  }
}

onMounted(() => {
  nav.value = document.querySelector('nav')
  mobileMenu.value = document.querySelector('.mobile-menu')
})
</script>

<template>
  <header>
    <div class="header-content">
      <NuxtLink to="/" class="logo">
        <img src="/logo.png" alt="YourFP Logo">
      </NuxtLink>

      <nav>
        <NuxtLink to="/" @click="toggleNav">Home</NuxtLink>
        <NuxtLink to="/universities" @click="toggleNav">Universities</NuxtLink>
        <NuxtLink to="/profiles" @click="toggleNav">Profiles</NuxtLink>
        <NuxtLink v-if="loggedIn" to="/profile" @click="toggleNav">My Profile</NuxtLink>
        <NuxtLink to="/donate" @click="toggleNav">Donate</NuxtLink>
        <NuxtLink to="/about" @click="toggleNav">About</NuxtLink>
        <NuxtLink v-if="!loggedIn" to="/login" class="login" @click="toggleNav">Log In | Register</NuxtLink>

        <button v-else class="black-button" @click="setMessage(MessageTypes.Accept, 'Are You sure You want to Log Out?', logout)">Log Out</button>
      </nav>

      <div class="mobile-menu" @click="toggleNav">
        <div class="first" />
        <div class="second" />
        <div class="third" />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  min-width: 320px;
  position: fixed;
  top: 0;
  background-color: #ffffffee;
  box-shadow: 0 0 5px 2px #000;
  z-index: 100;
}

.header-content {
  width: 1440px;
  height: 90px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--main-distance);
  align-items: center;
  padding: 0 var(--main-distance);
}

.logo img {
  width: 90px;
}

nav {
  display: flex;
  gap: calc(var(--main-distance) - 10px);
  transition: 0.4s;
}

nav a {
  font-size: 20px;
  position: relative;
  width: fit-content;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
  transform: scaleX(0);
  transition: transform 0.4s;
}

nav a:hover::after {
  transform: scaleX(1);
}

.router-link-active::after {
  transform: scaleX(1);
}

nav .login {
  position: absolute;
  right: var(--main-distance);
}

.mobile-menu {
  display: none;
  width: 35px;
  height: 26px;
  position: absolute;
  right: var(--main-distance);
  transition: 0.4s;
}

.mobile-menu div {
  width: 35px;
  height: 2px;
  background-color: #000;
  position: absolute;
  left: 0;
}

.mobile-menu .first {
  top: 0;
}

.mobile-menu .second {
  top: 12px;
}

.mobile-menu .third {
  bottom: 0;
}

.mobile-menu.opened .first {
  top: 12px;
}

.mobile-menu.opened .third {
  bottom: 12px;
}

button {
  position: absolute;
  right: var(--main-distance);
  align-self: center;
}

@media screen and (max-width: 1440px) {
  .header-content {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .mobile-menu {
    display: block;
  }

  nav {
    width: 100%;
    background-color: #ffffffee;
    padding: var(--main-distance);
    box-shadow: 0 0 5px 2px #000;
    position: absolute;
    top: 90px;
    left: 0;
    transform: translateX(-100%);
    opacity: 0;
    display: grid;
  }

  nav.active {
    transform: unset;
    opacity: 1;
  }

  nav .login {
    position: relative;
    right: unset;
    grid-column: 2 / 2;
    grid-row: 1 / 5;
    justify-self: right;
    height: min-content;
  }

  button {
    top: var(--main-distance);
  }
}
</style>
