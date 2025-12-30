<script setup lang="ts">
import { MessageTypes } from '~~/types/enums/message-types'

const props = defineProps<{
  messageType: MessageTypes
  newMessage: string
  setMessage: (type: MessageTypes, message: string, accept?: () => void) => void
  acceptFunction?: () => void
}>()

const showMessage = ref<boolean>(false)
const message = ref<string>()

const values = ref<string[]>(['#ff0000', 'flex'])

watch(() => props.newMessage, () => {
  if (props.newMessage === '') {
    showMessage.value = false
  } else {
    showMessage.value = true
    message.value = props.newMessage

    switch (props.messageType) {
      case MessageTypes.Error:
        values.value = ['#ff0000', 'flex']
        break
      case MessageTypes.Accept:
        values.value = ['#000', 'grid']
        break
      case MessageTypes.Info:
        values.value = ['var(--main-color)', 'flex']
        break
      default:
        values.value = ['var(--main-color)', 'flex']
        break
    }
  }
})

const boxShadowColor = ref<string>()
const display = ref<string>()

watch(values, () => {
  boxShadowColor.value = values.value[0]
  display.value = values.value[1]
})
</script>

<template>
  <aside :class="showMessage ? 'active' : ''">
    {{ message }}

    <div>
      <button class="black-button" @click="setMessage(messageType, '')">{{ messageType === MessageTypes.Accept ? 'Cancel' : (messageType === MessageTypes.Info ? 'Ok' : 'Hide') }}</button>
      <button v-if="messageType === MessageTypes.Accept" class="black-button" @click="setMessage(messageType, '', acceptFunction)">Yes</button>
    </div>
  </aside>
</template>

<style scoped>
aside {
  position: fixed;
  top: calc(90px + var(--main-distance));
  right: calc(0px - var(--main-distance));
  transform: translateX(100%);
  max-width: calc(100% - 2 * var(--main-distance));
  background-color: #eee;
  box-shadow: 0 0 5px 2px v-bind(boxShadowColor);
  padding: calc(var(--main-distance) / 2);
  display: v-bind(display);
  gap: calc(var(--main-distance) / 2);
  align-items: center;
  justify-items: center;
  transition: 0.4s;
  z-index: 1000;
}

.active {
  right: var(--main-distance);
  transform: unset;
}

div {
  display: flex;
  gap: calc(var(--main-distance) / 2);
}
</style>
