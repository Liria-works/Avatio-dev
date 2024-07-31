<script setup lang="ts">
const modal_report = ref(false);

const setup = {
    name: "普段使い改変",
    description:
        "普段使っているアバターです。かわいいものをたくさん使いました。",
    author: "Liry24",
    tag: ["かわいい", "ガーリー", "普段使い", "ショートヘア"],
    items: [
        {
            category: "avatar",
            items: Array.from(new Set([5840911])),
        },
        {
            category: "cloth",
            items: Array.from(new Set([5929004])),
        },
        {
            category: "accessory",
            items: Array.from(new Set([4758318, 4758318])),
        },
    ],
};
</script>

<template>
    <div class="flex-col justify-start items-start gap-5 flex w-full px-3">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="items-center gap-7 flex flex-row">
                <div class="text-black dark:text-white text-2xl font-bold">
                    {{ setup.name }}
                </div>

                <div
                    class="text-neutral-600 dark:text-neutral-400 text-sm pt-0.5"
                >
                    0 アイテム
                </div>

                <div class="flex flex-row gap-2">
                    <UPopover
                        :ui="{
                            background: 'bg-white dark:bg-white',
                            ring: 'ring-0',
                            rounded: 'rounded-lg',
                        }"
                    >
                        <AButton
                            icon="lucide:share-2"
                            :iconSize="18"
                            tooltip="シェア"
                        />
                        <template #panel="{ close }">
                            <div class="p-8">
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
                                    <UButton label="Close" @click="close" />
                                </div>
                            </div>
                        </template>
                    </UPopover>

                    <AButton
                        tooltip="報告"
                        icon="lucide:flag"
                        :iconSize="18"
                        @click="modal_report = true"
                    />
                    <UModal
                        v-model="modal_report"
                        :ui="{
                            background: 'bg-white dark:bg-neutral-100',
                            ring: 'ring-0',
                            rounded: 'rounded-xl',
                        }"
                    >
                        <ModalReport />
                    </UModal>
                </div>
            </div>
            <NuxtLink to="/">
                <AButton icon="lucide:arrow-left" text="戻る" />
            </NuxtLink>
        </div>
        <div class="items-start gap-8 flex w-full">
            <div class="flex flex-col items-center gap-8 w-full">
                <div
                    v-for="i in setup.items"
                    class="flex-col items-start gap-3 flex w-full"
                >
                    <ATitle
                        v-if="i.category === 'avatar'"
                        title="ベースアバター"
                        icon="lucide:person-standing"
                    />
                    <ATitle
                        v-else-if="i.category === 'cloth'"
                        title="衣装"
                        icon="lucide:shirt"
                    />
                    <ATitle
                        v-else-if="i.category === 'accessory'"
                        title="アクセサリー"
                        icon="lucide:star"
                    />

                    <AItem
                        v-for="item in i.items"
                        :content="item"
                        :size="i.category === 'avatar' ? 'lg' : 'md'"
                    />
                </div>
            </div>

            <div
                class="w-96 flex-col justify-start items-start gap-8 inline-flex"
            >
                <div
                    class="self-stretch flex-col justify-start items-start gap-2 flex"
                >
                    <ATitle title="説明" icon="lucide:text" />
                    <div
                        class="self-stretch px-3 py-2 bg-white dark:bg-neutral-700 rounded-xl items-center flex"
                    >
                        <span class="text-black dark:text-white text-sm">{{
                            setup.description
                        }}</span>
                    </div>
                </div>
                <div
                    class="self-stretch flex-col justify-start items-start gap-2 flex"
                >
                    <ATitle title="作者" icon="lucide:user-round" />
                    <AUser :user="setup.author" />
                </div>
                <div
                    class="self-stretch flex-col justify-start items-start gap-2.5 flex w-full"
                >
                    <ATitle title="タグ" icon="lucide:tags" />
                    <div
                        class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                    >
                        <Tag v-for="i in setup.tag" :text="i" />
                    </div>
                </div>
                <div
                    class="self-stretch flex-col justify-start items-start gap-2.5 flex"
                >
                    <ATitle title="コンテンツ" icon="lucide:package" />
                    <div
                        class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                    >
                        <Tag
                            color="pink"
                            text="NSFW"
                            icon="lucide:heart"
                            tooltip="性的表現を含むアイテムがリストされています。"
                        />
                        <Tag
                            color="secondary"
                            text="アバター非対応アイテム"
                            icon="lucide:hammer"
                            tooltip="ベースアバターに対して公式に対応が行われていないアイテムがリストされています。UnityやDCCツール（Blenderなど）で独自の対応が行われている場合があります。"
                        />
                        <Tag
                            color="secondary"
                            text="リンク切れアイテム"
                            icon="lucide:unlink"
                            tooltip="一部のアイテムが情報の取得に失敗しています。これらのアイテムは非公開になっているか、既に販売が終了している可能性があります。"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
