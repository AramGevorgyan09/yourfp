<script setup lang="ts">
import { MessageTypes } from '~~/types/enums/message-types'

const suggestedUniversitiesIndexes = ref<number[]>([])

const getAiAnswer = (array: number[]) => {
  suggestedUniversitiesIndexes.value = array
}

const messageType = ref<MessageTypes>(MessageTypes.Accept)
const newMessage = ref<string>('')
const acceptFunction = ref<() => void>()

const setMessage = (type: MessageTypes, message: string, accept?: () => void) => {
  messageType.value = type
  newMessage.value = message

  if (accept) {
    if (message == '' && acceptFunction.value)
      acceptFunction.value()
    else
      acceptFunction.value = accept
  }
}
</script>

<template>
  <HeaderBlock :set-message="setMessage" />

  <main>
    <NuxtPage
      :suggested-universities-indexes="suggestedUniversitiesIndexes"
      :get-ai-answer="getAiAnswer"
      :set-message="setMessage"
    />
  </main>

  <MessageWindow :message-type="messageType" :new-message="newMessage" :set-message="setMessage" :accept-function="acceptFunction" />

  <ScrollToTop />

  <FooterBlock />
</template>

<style>
main {
  width: 1440px;
  min-width: 320px;
  position: relative;
  margin-top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

@media screen and (max-width: 1440px) {
  main {
    width: unset;
  }
}
</style>
