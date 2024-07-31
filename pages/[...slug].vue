<script setup lang="ts">
const { data } = await useAsyncData('test', () => queryContent('/test').findOne())
</script>

<template>
  <nav>
    <ContentNavigation v-slot="{ navigation }">
      <ul>
        <li v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </ContentNavigation>
  </nav>

  <ContentRenderer :value="data" />
</template>
