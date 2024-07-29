<script setup lang="ts">
import Title from "~/components/title.vue";
import Tag from "~/components/tag.vue";
import Banner_avatio from "~/components/banner.vue";
import Button_Custom from "~/components/button.vue";
</script>

<template>
    <UContainer
        class="flex flex-col gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <div class="flex-col justify-start items-start gap-5 flex px-3">
            <div class="items-start gap-8 flex w-full">
                <div
                    class="w-96 flex-col justify-start items-start gap-20 inline-flex"
                >
                    <div
                        class="flex-col justify-start items-start gap-8 flex w-full"
                    >
                        <UButton
                            icon="i-heroicons-plus"
                            size="xl"
                            color="primary"
                            variant="solid"
                            label="新規セットアップ"
                            :trailing="false"
                            :ui="{ rounded: 'rounded-xl' }"
                            class="w-full"
                        />
                        <div
                            class="self-stretch flex-col justify-start items-start gap-3 flex"
                        >
                            <Title
                                title="マイセットアップ"
                                icon="lucide:folder-open"
                            />
                            <NuxtLink to="setup" class="w-full">
                                <button
                                    class="w-full flex flex-row rounded-xl justify-between items-center pr-4 overflow-hidden bg-white dark:bg-neutral-700"
                                >
                                    <img
                                        class="size-16"
                                        src="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg"
                                    />
                                    <div
                                        class="w-full flex flex-col items-start truncate px-3"
                                    >
                                        <span
                                            class="text-black dark:text-white text-md font-medium"
                                        >
                                            普段使い改変
                                        </span>
                                        <span
                                            class="text-neutral-700 dark:text-neutral-300 text-sm font-medium"
                                        >
                                            アルナ
                                        </span>
                                    </div>

                                    <UPopover
                                        :popper="{ placement: 'right' }"
                                        :ui="{
                                            background:
                                                'bg-white dark:bg-white',
                                            ring: 'ring-0',
                                            rounded: 'rounded-lg',
                                        }"
                                    >
                                        <template #panel>
                                            <div
                                                class="px-3 py-2 flex flex-col gap-2"
                                            >
                                                <NuxtLink
                                                    to="edit"
                                                    class="w-full"
                                                >
                                                    <UButton class="w-full"
                                                        >編集</UButton
                                                    >
                                                </NuxtLink>
                                                <div
                                                    class="flex gap-1 items-center"
                                                >
                                                    <Button_Custom
                                                        icon="lucide:clipboard"
                                                        :iconSize="20"
                                                    />
                                                    <Button_Custom
                                                        icon="simple-icons:x"
                                                        :iconSize="20"
                                                    />
                                                    <Button_Custom
                                                        icon="simple-icons:x"
                                                        :iconSize="20"
                                                    />
                                                    <Button_Custom
                                                        icon="simple-icons:x"
                                                        :iconSize="20"
                                                    />
                                                </div>
                                            </div>
                                        </template>
                                        <Button_Custom
                                            icon="lucide:ellipsis"
                                            :iconSize="16"
                                            class="dark:hover:bg-neutral-500"
                                        />
                                    </UPopover>
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="flex-col items-center gap-8 flex w-full">
                    <div class="flex-col items-start gap-6 flex w-full">
                        <div class="flex-col items-start gap-3 flex w-full">
                            <Title
                                title="検索"
                                icon="heroicons:magnifying-glass-20-solid"
                            />

                            <div class="flex gap-1 items-center w-full">
                                <UInput
                                    class="w-full"
                                    icon="i-heroicons-magnifying-glass-20-solid"
                                    size="md"
                                    color="white"
                                    :trailing="false"
                                    placeholder=""
                                    :ui="{ rounded: 'rounded-xl' }"
                                />
                                <UButton
                                    icon="i-heroicons-arrow-right-20-solid"
                                    size="md"
                                    variant="solid"
                                    :ui="{ rounded: 'rounded-xl' }"
                                />
                            </div>
                        </div>

                        <div class="flex flex-col gap-4 w-full px-3">
                            <div class="flex flex-col items-start gap-3 w-full">
                                <Title
                                    title="アバターから"
                                    icon="lucide:user-round"
                                    trailing="すべてのアバター"
                                />

                                <div
                                    class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                                >
                                    <button
                                        class="w-full flex flex-row rounded-xl justify-between items-center overflow-hidden bg-white dark:bg-neutral-700"
                                    >
                                        <img
                                            class="size-10"
                                            src="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg"
                                        />
                                        <span
                                            class="px-3 text-neutral-700 dark:text-neutral-300 text-sm font-medium"
                                        >
                                            アルナ
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div class="flex flex-col items-start gap-3 w-full">
                                <Title
                                    title="タグから"
                                    icon="lucide:tags"
                                    trailing="すべてのタグ"
                                />

                                <div
                                    class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                                >
                                    <Tag text="かわいい" />
                                    <Tag text="ガーリー" />
                                    <Tag text="普段使い" />
                                    <Tag text="ショートヘア" />
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex-col items-start gap-3 flex w-full hidden"
                        >
                            <Title title="ストアから" icon="lucide:store" />

                            <div
                                class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                            >
                                <Tag text="Liria Graphics" />
                                <Tag text="アオノイド" />
                                <Tag text="sasappetito Paws" />
                            </div>
                        </div>
                    </div>

                    <div class="flex-col items-start gap-3 flex w-full">
                        <Title
                            title="みんなのセットアップ"
                            icon="lucide:sparkles"
                        />

                        <NuxtLink to="/setup" class="w-full">
                            <button
                                class="w-full flex flex-row rounded-xl justify-between items-center pr-4 overflow-hidden bg-white dark:bg-neutral-700"
                            >
                                <img
                                    class="size-16"
                                    src="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg"
                                />
                                <div
                                    class="w-full flex flex-col items-start truncate px-3"
                                >
                                    <span
                                        class="text-black dark:text-white text-md font-medium"
                                    >
                                        普段使い改変
                                    </span>
                                    <span
                                        class="text-neutral-700 dark:text-neutral-300 text-sm font-medium"
                                    >
                                        アルナ
                                    </span>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <UAvatar
                                        size="xs"
                                        src="https://avatars.githubusercontent.com/u/47878070?v=4"
                                        alt="Avatar"
                                    />
                                    <span
                                        class="text-neutral-600 dark:text-neutral-300 pb-0.5 text-left text-sm pr-2"
                                    >
                                        Liry24
                                    </span>
                                </div>
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>
