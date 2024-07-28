<script setup lang="ts">
defineProps({
    title: String,
    icon: String,
});
</script>

<template>
    <div class="items-center gap-1.5 inline-flex">
        <Icon :name="icon" :width="18" :height="18" class="text-neutral-600" />
        <div class="text-black text-md">{{ title }}</div>
    </div>
</template>
