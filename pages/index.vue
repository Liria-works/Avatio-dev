<script>
export default {
    methods: {
        Click() {
            console.log('ボタンがクリックされました');
        },
    }
}
</script>

<template>

    <div class="items-start gap-8 flex w-full">
        <div class="w-96 flex-col justify-start items-start gap-20 flex">
            <div class="flex-col justify-start items-start gap-8 flex w-full">
                <UButton @click="Click" icon="i-heroicons-plus" size="xl" color="primary" variant="solid"
                    label="新規セットアップ" :trailing="false" :ui="{ rounded: 'rounded-xl' }" block />
                <div class="self-stretch flex-col justify-start items-start gap-3 flex">
                    <ATitle title="マイセットアップ" icon="lucide:folder-open" />
                    <NuxtLink to="setup" class="w-full">
                        <button
                            class="w-full flex flex-row rounded-xl justify-between items-center pr-4 overflow-hidden bg-white dark:bg-neutral-700">
                            <img class="size-16"
                                src="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg" />
                            <div class="w-full flex flex-col items-start truncate px-3">
                                <span class="text-black dark:text-white text-md font-medium">
                                    普段使い改変
                                </span>
                                <span class="text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                                    アルナ
                                </span>
                            </div>
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center gap-8 w-full">
            <div class="flex-col items-start gap-6 flex w-full">
                <div class="flex-col items-start gap-3 flex w-full">
                    <ATitle title="検索" icon="heroicons:magnifying-glass-20-solid" />

                    <div class="flex gap-1 items-center w-full">
                        <UInput class="w-full" icon="i-heroicons-magnifying-glass-20-solid" size="md" color="white"
                            :trailing="false" placeholder="" :ui="{ rounded: 'rounded-xl' }" />
                        <UButton icon="i-heroicons-arrow-right-20-solid" size="md" variant="solid"
                            :ui="{ rounded: 'rounded-xl' }" />
                    </div>
                </div>

                <div class="flex flex-col gap-4 w-full px-3">
                    <div class="flex flex-col items-start gap-3 w-full">
                        <ATitle title="アバターから" icon="lucide:user-round" trailing="すべてのアバター" />

                        <div class="justify-start items-center gap-1.5 flex flex-row flex-wrap">
                            <button
                                class="w-full flex flex-row rounded-xl justify-between items-center overflow-hidden bg-white dark:bg-neutral-700">
                                <img class="size-10"
                                    src="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg" />
                                <span class="px-3 text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                                    アルナ
                                </span>
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col items-start gap-3 w-full">
                        <ATitle title="タグから" icon="lucide:tags" trailing="すべてのタグ" />

                        <div class="justify-start items-center gap-1.5 flex flex-row flex-wrap">
                            <Tag text="かわいい" />
                            <Tag text="ガーリー" />
                            <Tag text="普段使い" />
                            <Tag text="ショートヘア" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-col items-start gap-3 flex w-full">
                <ATitle title="みんなのセットアップ" icon="lucide:sparkles" />

                <NuxtLink to="/setup" class="w-full">
                    <button
                        class="w-full flex flex-row rounded-xl justify-between items-center pr-4 overflow-hidden bg-white dark:bg-neutral-700">
                        <img class="size-16"
                            src="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg" />
                        <div class="w-full flex flex-col items-start truncate px-3">
                            <span class="text-black dark:text-white text-md font-medium">
                                普段使い改変
                            </span>
                            <span class="text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                                アルナ
                            </span>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <UAvatar size="xs" src="https://avatars.githubusercontent.com/u/47878070?v=4"
                                alt="Avatar" />
                            <span class="text-neutral-600 dark:text-neutral-300 pb-0.5 text-left text-sm pr-2">
                                Liry24
                            </span>
                        </div>
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>

</template>
