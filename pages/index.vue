<script setup lang="ts">
import Title from "~/components/title.vue";
import Item from "~/components/item.vue";
import Tag from "~/components/tag.vue";
import Header_avatio from "~/components/header.vue";
</script>

<template>
    <UContainer
        class="flex flex-col gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <Header_avatio />

        <div class="flex-col justify-start items-start gap-5 flex px-3">
            <div class="items-start gap-8 flex w-full">
                <div
                    class="w-96 flex-col justify-start items-start gap-20 inline-flex"
                >
                    <div
                        class="flex-col justify-start items-start gap-8 flex w-full"
                    >
                        <UButton
                            icon="i-heroicons-sparkles"
                            size="xl"
                            color="primary"
                            variant="solid"
                            label="新規セットアップ"
                            :trailing="false"
                        />
                        <div
                            class="self-stretch flex-col justify-start items-start gap-2 flex"
                        >
                            <Title title="作者" icon="lucide:user-round" />
                            <div
                                class="flex flex-row items-center justify-between pt-1 w-full"
                            >
                                <div class="flex flex-row gap-3 items-center">
                                    <UAvatar
                                        src="https://avatars.githubusercontent.com/u/47878070?v=4"
                                        alt="Avatar"
                                    />
                                    <span class="text-black pb-0.5 text-left">
                                        Liry24
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-col items-center gap-8 flex w-full">
                    <div class="flex-col items-start gap-3 flex w-full">
                        <Title
                            title="ベースアバター"
                            icon="lucide:person-standing"
                        />
                        <Item
                            text="アルナ -Alna-【オリジナル3Dモデル】"
                            shop="アオノイド"
                            image="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg"
                            :price="4000"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>
