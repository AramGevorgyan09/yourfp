<script setup lang="ts">
import type { UserProfileDto } from '~~/types/users'
import { Roles } from '~~/types/enums/roles'

const roles = ref([Roles.Seeker, Roles.Guide, -1])
const currentRoleIndex = ref<number>(1)
const name = ref<string>('')
const country = ref<string>('')
const educationalInstitution = ref<string>('')

const counts = ref<number[]>([6, 12, 24, -1])
const currentCountIndex = ref<number>(0)
const currentCount = ref<number>(6)

const pages = ref<number[]>([1, 2, 3, 4])
const currentPages = ref<number[]>(pages.value)
const currentPageIndex = ref<number>(0)

const setRole = (index: number) => {
  currentRoleIndex.value = index

  filterProfiles()
}

const setCount = (index: number) => {
  if (counts.value[index]) {
    currentCountIndex.value = index
    currentCount.value = counts.value[index] === -1 ? profiles.value.length : counts.value[index]
    
    setCurrentPages()
  }
}

const setPage = (index: number) => {
  currentPageIndex.value = index

  displayedProfiles.value = filteredProfiles.value.slice(currentCount.value * (currentPageIndex.value), currentCount.value * (currentPageIndex.value + 1))
}

const filterProfiles = () => {
  filteredProfiles.value = profiles.value.filter(profile =>
    (roles.value[currentRoleIndex.value] === -1 || profile.role === roles.value[currentRoleIndex.value]) &&
    (`${profile.name} ${profile.surname}`.trim().toLowerCase().includes(name.value.trim().toLowerCase())) &&
    (`${profile.country ? profile.country : ''}`.trim().toLowerCase().includes(country.value.trim().toLowerCase())) &&
    (`${profile.educational_institution ? profile.educational_institution : ''}`.trim().toLowerCase().includes(educationalInstitution.value.trim().toLowerCase()))
  )

  setCurrentPages()
}

const setCurrentPages = () => {
  currentPages.value = pages.value.slice(0, Math.ceil(filteredProfiles.value.length / currentCount.value))

  if (currentPages.value.length === 0)
    currentPages.value = [1]

  setPage(0)
}

const { data, pending } = await useFetch<UserProfileDto[]>('/api/users')

const profiles = ref<UserProfileDto[]>([])
const filteredProfiles = ref<UserProfileDto[]>([])
const displayedProfiles = ref<UserProfileDto[]>([])

if (data.value) {
  profiles.value = data.value
  filteredProfiles.value = profiles.value

  filterProfiles()
}
</script>

<template>
  <section>
    <div class="intro">
      <p class="first bold">Find The Right Profile</p>
      <p class="second bold">Instant Search And Smart Filters</p>
    </div>

    <p class="large-title">Profiles</p>

    <hr>

    <div class="filters">
      <div class="filter">
        <span>Role:</span>
        
        <CustomSelect
          :options="roles"
          :current-option-index="currentRoleIndex"
          :select-option="setRole"
          :width="120"
        />
      </div>

      <div class="filter">
        <span>Full Name:</span>
        
        <input v-model="name" type="text" placeholder="Full Name" @input="filterProfiles">
      </div>

      <div class="filter">
        <span>Country:</span>
        
        <input v-model="country" type="text" placeholder="Country" @input="filterProfiles">
      </div>

      <div class="filter">
        <span>Educational Institution:</span>
        
        <input v-model="educationalInstitution" type="text" placeholder="Educational Institution" @input="filterProfiles">
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

    <div v-if="profiles[0]">
      <div v-if="filteredProfiles[0]" class="list">
        <ProfileBlock v-for="(profile, index) in displayedProfiles" :key="index" :profile="profile" />
      </div>

      <NotFound v-else />
    </div>

    <LoadingBlock v-else-if="pending" />

    <NotFound v-else />
  </section>
</template>

<style scoped>
.intro .second {
  font-size: 32px;
  color: #888;
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
  grid-template-columns: repeat(3, 1fr);
  gap: var(--main-distance);
}

@media screen and (max-width: 1024px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .list {
    grid-template-columns: unset;
  }
}
</style>
