<template>
  <UCarousel ref="carouselRef" v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden" indicators>
    <img :src="item" class="w-full" draggable="false">
  </UCarousel>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue'
const items = [
  'https://banner-hiroba.com/wp-content/uploads/2019/03/6b7fad5d51715997243defa3c9799b49.jpg',
  'https://banner-hiroba.com/wp-content/uploads/2024/01/000000074484.jpg',
  'https://banner-hiroba.com/wp-content/uploads/2020/06/9e77e678b19ce1fee9ed1f1e6b43263c.jpg',
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 5000)
})
</script>