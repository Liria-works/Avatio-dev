<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        id: number;
        size?: string;
    }>(),
    {
        size: "md",
    }
);

const setupData = ref<any>({});
const avatar = ref();
const thumbnail = ref();
const loading = ref(true);

async function fetchAvatarInfo(id: number | string) {
    try {
        const response: any = await $fetch(
            `/api/GetBoothItem?id=${encodeURIComponent(id)}`
        );
        return response.body;
    } catch (error) {
        console.error("Failed to fetch item data:", error);
        return null;
    }
}

onMounted(async () => {
    const data: any = await $fetch(
        `/api/GetDataSetup?id=${encodeURIComponent(props.id)}`
    );
    if (data.status != 200) {
        return;
    }
    setupData.value = data.body;

    const data_avatar = await fetchAvatarInfo(data.body.avatar);
    avatar.value = data_avatar.item;
    thumbnail.value = data_avatar.thumbnail;
    loading.value = false;
});
</script>

<template>
    <SetupsItemBase class="hover:bg-neutral-200">
        <template #thumbnail>
            <img class="size-full" :src="thumbnail" />
        </template>
        <template #main>
            <div
                class="flex flex-col gap-px overflow-clip max-w-full font-medium"
            >
                <NuxtLink
                    to="/"
                    target="_blank"
                    class="text-black dark:text-white text-md line-clamp-1"
                >
                    {{ setupData.name }}
                </NuxtLink>

                <NuxtLink
                    to="/"
                    target="_blank"
                    class="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-1"
                >
                    {{ avatar }}
                </NuxtLink>
            </div>
        </template>
        <template #sub>
            <AUser
                v-if="props.size === 'md'"
                :user="setupData.author"
                size="sm"
            />
        </template>
    </SetupsItemBase>
</template>
