<script setup lang="ts">
import type { ApiResponse } from '~~/types/api-response'

definePageMeta({ middleware: 'without-account' })

const email = ref<string>('')

const submitForm = async () => {
  try {
    const response = await $fetch<ApiResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email }
    })
  } catch (error) {
    console.error('Error: ', error)
  }
}
</script>

<template>
  <form novalidate @submit.prevent="submitForm">
    <p class="small-title">Enter Your email to reset Your password.</p>

    <input v-model="email" type="email" placeholder="Email">

    <button type="submit">Send Reset Link</button>
  </form>
</template>

<style scoped>
form {
  margin: calc(90px + 2 * var(--main-distance)) 0 calc(2 * var(--main-distance)) 50%;
  transform: translateX(-50%);
  width: min-content;
  border: var(--main-border);
  border-radius: 30px;
  padding: calc(2 * var(--main-distance));
  display: grid;
  gap: calc(var(--main-distance) / 2);
  justify-items: center;
}
</style>
