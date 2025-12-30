<script setup lang="ts">
defineProps<{
  goBack: () => void
}>()
</script>

<template>
  <aside class="go-back pointer item-with-icon hover-opacity" @click="goBack">
    <Icon name="line-md:arrow-small-left" size="24px" style="color: #000;" /> Go Back
  </aside>
</template>

<style scoped>
.go-back {
  font-size: 20px;
}
</style>
