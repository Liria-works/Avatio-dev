<script setup lang="ts">
import Title from "~/components/title.vue";
import Item from "~/components/item.vue";
import Tag from "~/components/tag.vue";
import Button_Custom from "~/components/button.vue";
import Banner_avatio from "~/components/banner.vue";

const modal_share = ref(false);
const modal_report = ref(false);
</script>

<template>
    <UContainer
        class="flex flex-col gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <div class="flex-col justify-start items-start gap-5 flex w-full px-3">
            <div class="flex flex-row items-center justify-between w-full">
                <div class="items-center gap-7 flex flex-row">
                    <div class="text-black dark:text-white text-2xl font-bold">
                        普段使い改変
                    </div>
                    <div
                        class="text-neutral-600 dark:text-neutral-400 text-sm pt-0.5"
                    >
                        3 アイテム
                    </div>
                    <div class="flex flex-row gap-2">
                        <UPopover
                            :ui="{
                                background: 'bg-white dark:bg-white',
                                ring: 'ring-0',
                                rounded: 'rounded-lg',
                            }"
                        >
                            <UTooltip
                                text="シェア"
                                :popper="{ placement: 'top' }"
                                :ui="{
                                    background: 'bg-white dark:bg-gray-700',
                                    ring: 'ring-0',
                                }"
                            >
                                <Button_Custom
                                    icon="lucide:share-2"
                                    :iconSize="18"
                                />
                            </UTooltip>
                            <template #panel="{ close }">
                                <div class="p-8">
                                    <UButton label="Close" @click="close" />
                                </div>
                            </template>
                        </UPopover>
                        <UModal
                            v-model="modal_share"
                            :ui="{
                                background: 'bg-white dark:bg-neutral-100',
                                ring: 'ring-0',
                                rounded: 'rounded-xl',
                            }"
                        >
                            <div class="p-4 flex flex-col items-start">
                                <div
                                    class="w-full px-10 flex flex-row gap-2 items-center justify-center"
                                >
                                    <button
                                        class="flex items-center justify-center rounded-full hover:bg-neutral-200 py-3 px-5 gap-3"
                                    >
                                        <Icon
                                            name="simple-icons:x"
                                            :width="20"
                                            :height="20"
                                            class="text-black"
                                        />
                                        <span class="text-black"
                                            >Share on X</span
                                        >
                                    </button>
                                </div>
                            </div>
                        </UModal>
                        <UTooltip
                            text="報告"
                            :popper="{ placement: 'top' }"
                            :ui="{
                                background: 'bg-white dark:bg-gray-700',
                                ring: 'ring-0',
                            }"
                        >
                            <Button_Custom
                                icon="lucide:flag"
                                :iconSize="18"
                                @click="modal_report = true"
                            />
                        </UTooltip>
                        <UModal
                            v-model="modal_report"
                            :ui="{
                                background: 'bg-white dark:bg-neutral-100',
                                ring: 'ring-0',
                                rounded: 'rounded-xl',
                            }"
                        >
                            <div class="p-4 flex flex-col items-start">
                                <div
                                    class="w-full px-10 flex flex-row gap-2 items-center justify-center"
                                >
                                    <span class="text-black font-medium"
                                        >セットアップの報告</span
                                    >
                                </div>
                            </div>
                        </UModal>
                    </div>
                </div>
                <NuxtLink to="/">
                    <Button_Custom icon="lucide:arrow-left" text="戻る" />
                </NuxtLink>
            </div>
            <div class="items-start gap-8 flex w-full">
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
                    <div class="flex-col items-start gap-3 flex w-full">
                        <Title title="衣装" icon="lucide:shirt" />
                        <Item
                            text="【複数アバター対応】怪獣着ぐるみ たつぐるみ"
                            shop="sasappetito Paws"
                            image="https://booth.pximg.net/e715aab8-6dd1-46e0-b0f9-f481cdaab0da/i/5929004/bd1da940-09ad-4bd8-89cb-3de5e040203c_base_resized.jpg"
                            :price="1500"
                            size="md"
                            :editing="true"
                        />
                        <Item
                            text="【複数アバター対応】怪獣着ぐるみ たつぐるみ"
                            shop="sasappetito Paws"
                            image="https://booth.pximg.net/e715aab8-6dd1-46e0-b0f9-f481cdaab0da/i/5929004/bd1da940-09ad-4bd8-89cb-3de5e040203c_base_resized.jpg"
                            :price="1500"
                            size="md"
                        />
                    </div>
                    <div class="flex-col items-start gap-3 flex w-full">
                        <Title title="アクセサリー" icon="lucide:star" />
                        <Item
                            text="チャームチョーカー // アバターアクセサリー"
                            shop="Liria Graphics"
                            image="https://booth.pximg.net/71691351-b285-40e7-af97-09cd9976f902/i/4758318/ad7ce9a5-5375-471a-bcfd-0b8b5bdda437_base_resized.jpg"
                            :price="500"
                            size="md"
                        />
                    </div>
                </div>
                <div
                    class="w-96 flex-col justify-start items-start gap-16 inline-flex"
                >
                    <div
                        class="flex-col justify-start items-start gap-8 flex w-full"
                    >
                        <div
                            class="self-stretch flex-col justify-start items-start gap-2 flex"
                        >
                            <Title title="説明" icon="lucide:text" />
                            <div
                                class="self-stretch px-3 py-2 bg-white dark:bg-neutral-700 rounded-xl items-center flex"
                            >
                                <span class="text-black dark:text-white text-sm"
                                    >普段使っているアバターです。<br />かわいいものをたくさん使いました。</span
                                >
                            </div>
                        </div>
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
                                    <span
                                        class="text-black dark:text-white pb-0.5 text-left"
                                    >
                                        Liry24
                                    </span>
                                </div>
                                <Button_Custom
                                    icon="lucide:link"
                                    :iconSize="18"
                                />
                            </div>
                        </div>
                        <div
                            class="self-stretch flex-col justify-start items-start gap-2.5 flex w-full"
                        >
                            <Title title="タグ" icon="lucide:tags" />
                            <div
                                class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                            >
                                <Tag text="かわいい" />
                                <Tag text="ガーリー" />
                                <Tag text="普段使い" />
                                <Tag text="ショートヘア" />
                            </div>
                        </div>
                        <div
                            class="self-stretch h-[65px] flex-col justify-start items-start gap-2.5 flex"
                        >
                            <Title title="コンテンツ" icon="lucide:package" />
                            <div
                                class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                            >
                                <UPopover
                                    mode="hover"
                                    :popper="{ placement: 'top' }"
                                >
                                    <template #panel>
                                        <div
                                            class="px-3 py-2 text-xs bg-neutral-700"
                                        >
                                            性的表現を含むアイテムがリストされています。
                                        </div>
                                    </template>
                                    <Tag
                                        color="pink"
                                        text="NSFW"
                                        icon="lucide:heart"
                                    />
                                </UPopover>
                                <UPopover
                                    mode="hover"
                                    :popper="{ placement: 'top' }"
                                >
                                    <template #panel>
                                        <div
                                            class="px-3 py-2 text-xs bg-neutral-700"
                                        >
                                            ベースアバターに対して公式に対応が行われていないアイテムがリストされています。<br />
                                            UnityやDCCツール（Blenderなど）で独自の対応が行われている場合があります。
                                        </div>
                                    </template>
                                    <Tag
                                        color="secondary"
                                        text="アバター非対応アイテム"
                                        icon="lucide:hammer"
                                    />
                                </UPopover>
                                <UPopover
                                    mode="hover"
                                    :popper="{ placement: 'top' }"
                                >
                                    <template #panel>
                                        <div
                                            class="px-3 py-2 text-xs bg-neutral-700"
                                        >
                                            一部のアイテムが情報の取得に失敗しています。<br />
                                            これらのアイテムは非公開になっているか、<br />
                                            既に販売が終了している可能性があります。
                                        </div>
                                    </template>
                                    <Tag
                                        color="secondary"
                                        text="リンク切れアイテム"
                                        icon="lucide:unlink"
                                    />
                                </UPopover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>
