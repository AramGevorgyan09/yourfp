<script setup lang="ts">
import type { UserDto } from '~~/types/users'
import { Roles } from '~~/types/enums/roles'

defineProps<{
  profile: UserDto
}>()
</script>

<template>
  <article class="profile">
    <p class="small-title main-color center">{{ profile.name }} {{ profile.surname }}</p>
    <p v-if="profile.educational_institution">Educational Institution: <span>{{ profile.educational_institution }}</span></p>
    <p v-if="profile.age">Age: <span>{{ profile.age }}</span></p>
    <p v-if="profile.country">Country: <span>{{ profile.country }}</span></p>
    <p>Role: {{ profile.role }}</p>
    <p class="link">
      <NuxtLink :to="`/profiles/${profile.id}`" class="hover-color item-with-icon">See Profile <Icon name="line-md:arrow-small-right" size="20px" icon="icon" /></NuxtLink>
    </p>

    <aside v-if="profile.role === Roles.Guide" class="item-with-icon">Guide <Icon name="uil:university" size="20px" style="color: #fff;" /></aside>
  </article>
</template>

<style scoped>
.profile {
  position: relative;
  background-color: #eee;
  padding: var(--main-distance);
  border-radius: 15px;
}

.small-title {
  margin-bottom: 15px;
}

.link .icon {
  color: #000;
}

.link:hover .icon {
  color: var(--main-color);
}

aside {
  position: absolute;
  top: -5px;
  right: -15px;
  background-color: var(--main-color);
  color: #fff;
  padding: 10px;
  border-radius: 15px;
  transform: rotate(10deg);
  align-items: end;
}
</style>
