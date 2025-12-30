<script setup lang="ts">
import { MessageTypes } from '~~/types/enums/message-types'
import type { University, Faculty, Requirement } from '~~/types/universities'
import { Metrics } from '~~/types/enums/metrics'

const props = defineProps<{
  suggestedUniversitiesIndexes: number[]
  setMessage: (type: MessageTypes, message: string, accept?: () => void) => void
}>()

const { loggedIn } = useUserSession()

const goToTest = () => {
  if (loggedIn.value) {
    navigateTo('/test')
  } else {
    navigateTo('/login')

    props.setMessage(MessageTypes.Info, 'Log In to pass the Test.')
  }
}

const universityName = ref<string>('')

const counts = ref<number[]>([5, 10, 20, -1])
const currentCountIndex = ref<number>(0)
const currentCount = ref<number>(5)

const pages = ref<number[]>([1, 2, 3, 4])
const currentPageIndex = ref<number>(0)
const currentPages = ref<number[]>(pages.value)

const filterByName = () => {
  filteredUniversities.value = universities.value.filter(university => university.name.trim().toLowerCase().includes(universityName.value.trim().toLowerCase()))

  setCurrentPages()
}

const setCount = (index: number) => {
  if (counts.value[index]) {
    currentCountIndex.value = index
    currentCount.value = counts.value[index] === -1 ? universities.value.length : counts.value[index]
    
    setCurrentPages()
  }
}

const setCurrentPages = () => {
  currentPages.value = pages.value.slice(0, Math.ceil(filteredUniversities.value.length / currentCount.value))

  if (currentPages.value.length === 0)
    currentPages.value = [1]

  setPage(0)
}

const setPage = (index: number) => {
  currentPageIndex.value = index

  displayedUniversities.value = filteredUniversities.value.slice(currentCount.value * (currentPageIndex.value), currentCount.value * (currentPageIndex.value + 1))
}

const { data, pending } = await useFetch<[Array<University>, Array<Faculty>, Array<Requirement>]>('/api/universities')

const universities = ref<University[]>([])
const filteredUniversities = ref<University[]>([])
const displayedUniversities = ref<University[]>([])

if (data.value) {
  for (let i = 0; i < data.value[0].length; i++) {
    const university = data.value[0][i]

    if (university) {
      universities.value.push({
        id: university.id,
        name: university.name,
        logo: university.logo,
        location: university.location,
        rank: university.rank,
        faculties: data.value[1].filter(element => element.university_id === university.id).map(element => element.faculty),
        website: university.website,
        description: university.description,
        toefl: data.value[2].filter(element => element.university_id === university.id && element.metric_name === Metrics.TOEFL).map(element => element.required_value),
        ielts: data.value[2].filter(element => element.university_id === university.id && element.metric_name === Metrics.IELTS).map(element => element.required_value),
        sat: data.value[2].filter(element => element.university_id === university.id && element.metric_name === Metrics.SAT).map(element => element.required_value),
        gpa: data.value[2].filter(element => element.university_id === university.id && element.metric_name === Metrics.GPA).map(element => element.required_value)
      })
    }
  }

  if (props.suggestedUniversitiesIndexes.length > 0)
    universities.value = universities.value.filter(university => props.suggestedUniversitiesIndexes.includes(university.id))

  filteredUniversities.value = universities.value

  setCurrentPages()
}
</script>

<template>
  <section>
    <div class="intro">
      <p class="first">Best Universities For Your Future</p>
      <p class="second">Welcome to <span class="main-color bold">Your Future Path</span> - a platform designed to connect high school students with current university students, professionals, and global educational opportunities.</p>

      <button @click="goToTest">Go To Test</button>
    </div>

    <p class="large-title">{{ suggestedUniversitiesIndexes.length > 0 ? 'Suggested ' : '' }}Universities</p>

    <hr>

    <div class="filters">
      <div class="filter">
        <span>University Name:</span>

        <input v-model="universityName" type="text" placeholder="University Name" @input="filterByName">
      </div>

      <div class="filter">
        <span>Show:</span>

        <CustomSelect
          :options="counts"
          :current-option-index="currentCountIndex"
          :select-option="setCount"
          :width="90"
        />
      </div>

      <div class="filter">
        <span>Page:</span>

        <CustomSelect
          :options="currentPages"
          :current-option-index="currentPageIndex"
          :select-option="setPage"
          :width="90"
        />
      </div>
    </div>

    <div v-if="universities[0]">
      <div v-if="filteredUniversities[0]" class="list">
        <UniversityBlock v-for="(university, index) in displayedUniversities" :key="index" :university="university" />
      </div>

      <NotFound v-else />
    </div>

    <LoadingBlock v-else-if="pending" />

    <NotFound v-else />
  </section>
</template>

<style scoped>
.intro .second {
  font-size: 18px;
  max-width: 600px;
  margin-top: 10px;
}

.intro button {
  margin-top: 10px;
}

.filters,
.filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.filters {
  gap: var(--main-distance);
  margin: var(--main-distance);
}

.filter {
  gap: calc(var(--main-distance) / 2);
}

.filter span {
  font-size: 20px;
}

.filter input {
  width: 250px;
}

.list {
  margin: var(--main-distance);
  display: grid;
  gap: var(--main-distance);
}
</style>
