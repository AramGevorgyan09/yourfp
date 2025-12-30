<script setup lang="ts">

</script>

<template>
  <div class="loading">
    <h1>Loading Data <span>.</span><span class="p2">.</span><span class="p3">.</span></h1>
  </div>
</template>

<style scoped>
.loading {
  margin: var(--main-distance) 0;
  text-align: center;
}

h1 span {
  position: relative;
  animation: point 1.5s linear infinite;
}

h1 span.p2 {
  animation-delay: 0.5s;
  opacity: 0;
}

h1 span.p3 {
  animation-delay: 1s;
  opacity: 0;
}

@keyframes point {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
