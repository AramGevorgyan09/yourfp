<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="error">
    <p class="large-title"><i>ERROR {{ error?.statusCode }}</i></p>
    <p class="not-found">PAGE NOT FOUND</p>
    <NuxtLink to="/" class="item-with-icon hover-opacity"><Icon name="line-md:arrow-small-left" size="28px" style="color: #fff;" /> Go Back Home</NuxtLink>
  </div>
</template>

<style scoped>
.error {
  width: calc(1440px - 2 * var(--main-distance));
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(165deg, #111 0%, var(--main-color) 70%, #eee 100%);
  color: #fff;
  display: grid;
  gap: 10px;
  justify-items: center;
  text-align: center;
  padding: calc(var(--main-distance) * 5) var(--main-distance);
  border-radius: 100px;
}

.not-found {
  font-size: 80px;
}

.error a {
  color: #fff;
}

@media screen and (max-width: 1440px) {
  .error {
    width: calc(100% - 2 * var(--main-distance));
  }
}

@media screen and (max-width: 768px) {
  .error {
    padding-inline: calc(var(--main-distance) / 2);
    border-radius: 50px;
  }

  .not-found {
    font-size: 52px;
  }
}

@media screen and (max-width: 520px) {
  .not-found {
    font-size: 42px;
  }
}
</style>
