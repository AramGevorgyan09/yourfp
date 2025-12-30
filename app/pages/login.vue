<script setup lang="ts">
import type { ApiResponse } from '~~/types/api-response'
import { MessageTypes } from '~~/types/enums/message-types'

definePageMeta({ middleware: 'without-account' })

const props = defineProps<{
  setMessage: (type: MessageTypes, message: string, accept?: () => void) => void
}>()

const { loggedIn, fetch: refreshSession } = useUserSession()

const hasAccount = ref<boolean>(true)

const credentials = reactive({
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const types = ref<string[]>(['password', 'password'])

const setType = (index: number, type?: string) => {
  if (type)
    types.value[index] = type
  else
    types.value[index] = types.value[index] === 'password' ? 'text' : 'password'
}

const resetForm = () => {
  credentials.name = ''
  credentials.surname = ''
  credentials.email = ''
  credentials.password = ''
  credentials.confirmPassword = ''

  setType(0, 'password')
  setType(1, 'password')
}

const submitForm = () => {
  if (!loggedIn.value) {
    if (hasAccount.value)
      login()
    else
      register()
  }
}

const login = async () => {
  try {
    const response = await $fetch<ApiResponse>('/api/auth/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password
      }
    })

    props.setMessage(MessageTypes.Info, response.message)

    await refreshSession()
    await navigateTo('/')
  } catch (error) {
    props.setMessage(MessageTypes.Error, 'Error, please try again.')
    console.error('Error: ', error)
  }
}

const register = async () => {
  try {
    const response = await $fetch<ApiResponse>('/api/auth/register', {
      method: 'POST',
      body: credentials
    })

    props.setMessage(MessageTypes.Info, response.message)

    await refreshSession()
    await navigateTo('/profile')
  } catch (error) {
    props.setMessage(MessageTypes.Error, 'Error, please try again.')
    console.error('Error: ', error)
  }
}
</script>

<template>
  <form novalidate @submit.prevent="submitForm" @reset="resetForm">
    <p class="medium-title">{{ hasAccount ? 'Log In' : 'Register' }}</p>

    <input v-if="!hasAccount" v-model="credentials.name" type="text" placeholder="Name">
    <input v-if="!hasAccount" v-model="credentials.surname" type="text" placeholder="Surname">
    <input v-model="credentials.email" type="email" placeholder="Email">

    <div>
      <input v-model="credentials.password" :type="types[0]" placeholder="Password" class="password">

      <div class="eye pointer" @click="setType(0)">
        <Icon :name="'mdi:eye-off-outline'" size="30px" style="color: #000;" :class="`icon ${types[0] == 'password' ? 'active' : ''}`" />
        <Icon :name="'mdi:eye-outline'" size="30px" style="color: #000;" :class="`icon ${types[0] == 'text' ? 'active' : ''}`" />
      </div>
    </div>

    <div v-if="!hasAccount">
      <input v-model="credentials.confirmPassword" :type="types[1]" placeholder="Confirm Password" class="password">

      <div class="eye pointer" @click="setType(1)">
        <Icon :name="'mdi:eye-off-outline'" size="30px" style="color: #000;" :class="`icon ${types[1] == 'password' ? 'active' : ''}`" />
        <Icon :name="'mdi:eye-outline'" size="30px" style="color: #000;" :class="`icon ${types[1] == 'text' ? 'active' : ''}`" />
      </div>
    </div>

    <div class="buttons">
      <button type="reset" class="black-button">Reset Form</button>
      <button type="submit">{{ hasAccount ? 'Log In' : 'Register' }}</button>
    </div>

    <p class="center">
      {{ hasAccount ? "Don't have an account yet?" : "Already have an account?" }}
      <span class="bold pointer hover-opacity" @click="hasAccount = ! hasAccount; resetForm()">{{ hasAccount ? 'Register' : 'Log In' }}</span>.
    </p>

    <NuxtLink v-if="hasAccount" to="/forgot-password" class="bold pointer hover-opacity">Forgot Password?</NuxtLink>

    <p class="conditions">
      By clicking the "{{ hasAccount ? "Log In" : "Register" }}" button above, You are accepting our
      <NuxtLink to="/terms-and-conditions" class="bold pointer hover-opacity">Terms and Conditions</NuxtLink> and
      <NuxtLink to="/privacy-policy" class="bold pointer hover-opacity">Privacy Policy</NuxtLink>.
    </p>
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

.medium-title {
  margin-bottom: calc(var(--main-distance) / 2);
}

div {
  width: 100%;
  position: relative;
}

.password {
  padding-right: 70px;
}

.eye {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
}

.eye .icon {
  position: absolute;
  opacity: 0;
}

.eye .icon.active {
  opacity: 1;
}

.buttons {
  margin: calc(var(--main-distance) / 2) 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.buttons button {
  width: min-content;
}

.buttons button[type=submit] {
  justify-self: right;
}

.conditions {
  font-size: 14px;
  margin-top: calc(var(--main-distance) / 2);
}

@media screen and (max-width: 600px) {
  form {
    width: calc(100% - 2 * var(--main-distance));
    margin: calc(90px + 2 * var(--main-distance)) var(--main-distance) calc(2 * var(--main-distance)) var(--main-distance);
    padding: calc(2 * var(--main-distance)) var(--main-distance);
    transform: unset;
    gap: 10px;
  }

  input {
    width: 100%;
  }
}
</style>
