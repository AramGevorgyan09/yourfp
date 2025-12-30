<script setup lang="ts">
import type { UserProfileDto } from '~~/types/users'

definePageMeta({ middleware: 'with-account' })

const { data, pending } = await useFetch<UserProfileDto[]>('/api/profile')
const profile = ref<UserProfileDto>()

if (data.value) {
  profile.value = data.value[0]
}
</script>

<template>
  <section>
    <div class="intro">
      <p class="first">Welcome to My Profile Page</p>
    </div>

    <div v-if="profile" class="data">
      <div>
        <p>Name: {{ profile.name ? profile.name : 'unset' }}</p>
        <p>Surname: {{ profile.surname ? profile.surname : 'unset' }}</p>
        <p>Email: {{ profile.email ? profile.email : 'unset' }}</p>
        <p>Role: {{ profile.role ? profile.role : 'unset' }}</p>
        <p>Age: {{ profile.age ? profile.age : 'unset' }}</p>
        <p>Country: {{ profile.country ? profile.country : 'unset' }}</p>
        <p>TOEFL: {{ profile.toefl ? profile.toefl : 'unset' }}</p>
        <p>IELTS: {{ profile.ielts ? profile.ielts : 'unset' }}</p>
        <p>SAT: {{ profile.sat ? profile.sat : 'unset' }}</p>
        <p>GPA: {{ profile.gpa ? profile.gpa : 'unset' }}</p>
      </div>
    
      <div>
        <p>Educational Institution: {{ profile.educational_institution ? profile.educational_institution : 'unset' }}</p>
        <p>Preffered Major: {{ profile.preffered_major ? profile.preffered_major : 'unset' }}</p>
        <p>Target Universities: {{ profile.target_universities ? profile.target_universities : 'unset' }}</p>
        <p>Motivation: {{ profile.motivation ? profile.motivation : 'unset' }}</p>
      </div>
    </div>

    <LoadingBlock v-else-if="pending" />

    <NotFound v-else />
  </section>
</template>

<style scoped>
.data {
  padding: var(--main-distance);
  display: grid;
  gap: var(--main-distance);
  text-align: center;
}
</style>
