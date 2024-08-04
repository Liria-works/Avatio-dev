<script setup lang="ts">
const setup = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
    const setupData: any = await $fetch(`/api/GetDataSetup`);
    if (!setupData) {
        return;
    }
    setup.value = setupData.body;
    loading.value = false;
});
</script>

<template>
    <div class="items-start gap-8 flex w-full">
        <div class="w-[620px] flex-col justify-start items-start gap-20 flex">
            <SetupsSearch />
        </div>

        <div class="flex flex-col items-center gap-8 w-full">
            <SetupsCategory
                title="マイセットアップ"
                icon="lucide:folder-open"
                class="grid grid-cols-2"
            >
                <NuxtLink to="/edit" class="w-full">
                    <UButton
                        icon="i-heroicons-plus"
                        size="xl"
                        color="primary"
                        variant="solid"
                        label="新規セットアップ"
                        :trailing="false"
                        :ui="{
                            rounded: 'rounded-xl',
                            font: 'whitespace-nowrap',
                        }"
                        block
                    />
                </NuxtLink>
                <USkeleton
                    v-for="i in 4"
                    v-show="loading"
                    class="h-16 w-full"
                    :ui="{
                        background: 'bg-gray-100 dark:bg-gray-700',
                        rounded: 'rounded-xl',
                    }"
                />

                <NuxtLink
                    v-show="!loading"
                    v-for="i in setup"
                    :to="{
                        path: '/setup',
                        query: { id: i.id },
                    }"
                    class="w-full"
                >
                    <SetupsItemSetup :id="i.id" size="sm" />
                </NuxtLink>
            </SetupsCategory>

            <SetupsCategory title="みんなのセットアップ" icon="lucide:sparkles">
                <USkeleton
                    v-for="i in 4"
                    v-show="loading"
                    class="h-16 w-full"
                    :ui="{
                        background: 'bg-gray-100 dark:bg-gray-700',
                        rounded: 'rounded-xl',
                    }"
                />

                <NuxtLink
                    v-show="!loading"
                    v-for="i in setup"
                    :to="{
                        path: '/setup',
                        query: { id: i.id },
                    }"
                    class="w-full"
                >
                    <SetupsItemSetup :id="i.id" />
                </NuxtLink>
            </SetupsCategory>
        </div>
    </div>
</template>
