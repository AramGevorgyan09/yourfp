<script setup lang="ts">
const props = defineProps<{
  options: Array<string | number>
  currentOptionIndex: number
  selectOption: (index: number) => void
  width: number
}>()

const width = ref<string>(`${props.width}px`)
const height = ref<string>(`calc(${100 * props.options.length}% - ${2 * props.options.length}px)`)

watch(() => props.options.length, () => {
  height.value = `calc(${100 * props.options.length}% - ${2 * props.options.length}px)`
})
</script>

<template>
  <div class="custom-select pointer">
    <div class="current-option bold">
      {{ options[currentOptionIndex] === -1 ? 'All' : options[currentOptionIndex] }}
      <Icon name="mdi:chevron-up" size="20px" class="arrow" />
    </div>

    <div class="options">
      <div
        v-for="(option, index) in options"
        :key="index"
        :class="index === currentOptionIndex ? 'bold' : ''"
        @click="selectOption(index)"
      >
        {{ option == -1 ? 'All' : option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: v-bind(width);
}

.custom-select:hover .options {
  height: v-bind(height);
}

.custom-select:hover .current-option .arrow {
  transform: rotateX(-180deg);
}

.current-option,
.options div {
  width: v-bind(width);
  background-color: #fff;
  padding: calc(var(--main-distance) / 2);
  border: var(--main-border);
}

.current-option .arrow {
  color: #000;
  position: absolute;
  right: calc(var(--main-distance) / 2);
  transition: 0.4s;
}

.options {
  position: absolute;
  height: 0%;
  overflow: hidden;
  transition: 0.4s;
  z-index: 100;
}

.options div {
  margin-top: -2px;
}

.options div:hover {
  background-color: #000;
  color: #fff;
}
</style>
