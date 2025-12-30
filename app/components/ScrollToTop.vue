<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  const element = document.getElementById('scrollToTop')

  window.addEventListener('scroll', () => {
    if (element) {
      if (window.scrollY >= Math.floor(window.innerHeight))
        element.className = 'pointer show'
      else
        element.className = 'pointer'
    }
  })
})
</script>

<template>
  <aside id="scrollToTop" class="pointer" @click="scrollToTop">
    <Icon name="line-md:arrow-small-up" size="24px" style="color: #fff;" />
  </aside>
</template>

<style scoped>
aside {
  background-color: var(--main-color);
  position: fixed;
  right: var(--main-distance);
  bottom: calc(-50px - var(--main-distance));
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: grid;
  justify-items: center;
  align-items: center;
  transition: 0.4s;
  z-index: 1000;
}

.show {
  bottom: var(--main-distance);
}

aside:hover {
  background-color: var(--dark-main-color);
}
</style>
