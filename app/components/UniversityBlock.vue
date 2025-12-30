<script setup lang="ts">
  import type { University } from '~~/types/universities'
import { Metrics } from '~~/types/enums/metrics'

defineProps<{
  university: University
}>()

// const getStringFromArray = (array: Array<string | number>): string => {
//   let text: string = `${array[0] ? array[0] : ''}`

//   for (let i = 1; i < array.length; i++) {
//     text += `, ${array[i]}`
//   }

//   return text
// }
</script>

<template>
  <article class="university">
    <p class="medium-title main-color center">{{ university.name }}</p>

    <div class="main">
      <div>
        <img :src="`/universities/${university.logo}`" :alt="university.name">
      </div>

      <div class="general">
        <p class="item-with-icon nowrap"><Icon name="streamline-ultimate:ranking-stars-ribbon-bold" size="20px" style="color: #000;" /> Rank: <span class="bold">{{ university.rank }}</span></p>
        <p class="item-with-icon nowrap"><Icon name="material-symbols:location-on" size="20px" style="color: #000;" /> Location: <span class="bold">{{ university.location }}</span></p>
        <p class="item-with-icon nowrap"><Icon name="majesticons:globe" size="20px" style="color: #000;" /> Official Website: <a :href="university.website" target="_blank" class="bold hover-opacity">{{ university.website }}</a></p>
      </div>

      <div class="about">
        <p class="bold">About University</p>
        <p>{{ university.description }}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th :colspan="university.faculties.length + 1" class="bold">Requirements</th>
        </tr>

        <tr>
          <th>Metric\Faculty</th>
          <th v-for="(faculty, index) in university.faculties" :key="index" class="bold main-color">{{ faculty }}</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ Metrics.TOEFL }}</td>
          <th v-for="(value, index) in university.toefl" :key="index" class="bold">{{ value * 10 / 10 }}</th>
        </tr>

        <tr>
          <td>{{ Metrics.IELTS }}</td>
          <th v-for="(value, index) in university.ielts" :key="index" class="bold">{{ value * 10 / 10 }}</th>
        </tr>

        <tr>
          <td>{{ Metrics.SAT }}</td>
          <th v-for="(value, index) in university.sat" :key="index" class="bold">{{ value * 10 / 10 }}</th>
        </tr>

        <tr>
          <td>{{ Metrics.GPA }}</td>
          <th v-for="(value, index) in university.gpa" :key="index" class="bold">{{ value * 10 / 10 }}</th>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<style scoped>
.university {
  position: relative;
  background-color: #eee;
  display: grid;
  gap: var(--main-distance);
  justify-items: center;
  padding: var(--main-distance);
  border-radius: 15px;
}

.main {
  display: flex;
  gap: var(--main-distance);
}

.main div {
  position: relative;
  display: grid;
}

.main div img {
  height: 180px;
}

.general {
  padding-inline: var(--main-distance);
  border-inline: var(--main-border);
}

.general p {
  font-size: 18px;
}

.about {
  gap: 10px;
  align-self: center;
  height: min-content;
  max-height: 180px;
  overflow-y: auto;
}

.about::-webkit-scrollbar {
  width: 8px;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: var(--main-border);
  padding: calc(var(--main-distance) / 2) var(--main-distance);
}
</style>
