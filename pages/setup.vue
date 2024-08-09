<script setup lang="ts">
const route = useRoute();

const modal_report = ref(false);
const setup = ref<any>(null);
const loading = ref(true);

const totalItems = ref(0);

interface Items {
    avatar: number | null;
    cloth: number[];
    accessory: number[];
    other: number[];
    outdated: any[];
}

const items = ref<Items>({
    avatar: null,
    cloth: [],
    accessory: [],
    other: [],
    outdated: [],
});

onMounted(async () => {
    const id: any = route.query.id;
    const setupData: any = await $fetch(
        `/api/GetDataSetup?id=${encodeURIComponent(id)}`
    );
    if (!setupData) {
        return;
    }

    setup.value = setupData.body;

    const avatar: number = setup.value.avatar.id;
    const avatarItem: any | null = await useFetchBooth(avatar);
    if (avatarItem) {
        items.value.avatar = avatarItem.id;
    } else {
        console.error("Invalid content:", avatar);
        items.value.avatar = null;
    }

    const categoryMap: any = {
        209: items.value.cloth,
        217: items.value.accessory,
    };

    for await (const i of setup.value.items) {
        if (i.id) {
            const item: any = await useFetchBooth(i.id);
            if (item) {
                const targetArray =
                    categoryMap[item.category] || items.value.other;
                targetArray.push({ id: item.id, note: i.note });
            } else {
                console.error("Invalid content:", i);
                Items.value.outdated.push(null);
            }
        }
    }

    totalItems.value =
        // items_avatar.value.length +
        items.value.cloth.length +
        items.value.accessory.length +
        items.value.other.length;
    loading.value = false;
});
</script>

<template>
    <div class="flex-col justify-start items-start gap-5 flex w-full px-3">
        <div
            v-show="!loading"
            class="flex flex-row items-center justify-between w-full"
        >
            <div class="items-center gap-7 flex flex-row">
                <div class="text-black dark:text-white text-2xl font-bold">
                    {{ setup?.name || "" }}
                </div>

                <div
                    class="text-neutral-600 dark:text-neutral-400 text-sm pt-0.5"
                >
                    {{ totalItems }} アイテム
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
            <div
                v-show="loading"
                class="flex flex-col items-center gap-6 w-full"
            >
                <USkeleton
                    class="h-10 w-full"
                    :ui="{
                        background: 'bg-gray-100 dark:bg-gray-700',
                        rounded: 'rounded-xl',
                    }"
                />
                <USkeleton
                    v-for="i in 4"
                    class="h-32 w-full"
                    :ui="{
                        background: 'bg-gray-100 dark:bg-gray-700',
                        rounded: 'rounded-xl',
                    }"
                />
            </div>

            <div
                v-show="!loading"
                class="flex flex-col items-center gap-8 w-full"
            >
                <SetupsCategory
                    v-if="items.avatar"
                    title="ベースアバター"
                    icon="lucide:person-standing"
                >
                    <SetupsItemDetail
                        v-if="items.avatar"
                        :key="'item-' + items.avatar"
                        :id="items.avatar"
                        :note="setup.avatar.note"
                        size="lg"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="items.cloth.length"
                    title="衣服"
                    icon="lucide:shirt"
                >
                    <SetupsItemDetail
                        v-for="i in items.cloth"
                        :key="'item-' + i.id"
                        :id="i.id"
                        :note="i.note"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="items.accessory.length"
                    title="アクセサリー"
                    icon="lucide:star"
                >
                    <SetupsItemDetail
                        v-for="i in items.accessory"
                        :key="'item-' + i.id"
                        :id="i.id"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="items.other.length"
                    title="その他"
                    icon="lucide:shirt"
                >
                    <SetupsItemDetail
                        v-for="i in items.other"
                        :key="'item-' + i.id"
                        :id="i.id"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="items.outdated.length"
                    title="不明なアイテム"
                    icon="lucide:file-question"
                >
                    <SetupsItemDetail
                        v-for="i in items.outdated"
                        :key="'item-' + i.id"
                        :id="i.id"
                    />
                </SetupsCategory>
            </div>

            <div v-show="loading" class="w-96 flex flex-col items-center gap-6">
                <USkeleton
                    v-for="i in 4"
                    class="h-24 w-full"
                    :ui="{
                        background: 'bg-gray-100 dark:bg-gray-700',
                        rounded: 'rounded-xl',
                    }"
                />
            </div>

            <div
                v-show="!loading"
                class="w-96 flex-col justify-start items-start gap-8 inline-flex"
            >
                <div
                    class="self-stretch flex-col justify-start items-start gap-2 flex"
                >
                    <ATitle title="説明" icon="lucide:text" />
                    <div
                        class="self-stretch px-3 py-2 bg-white dark:bg-neutral-700 rounded-xl items-center flex"
                    >
                        <span class="text-black dark:text-white text-sm">
                            {{ setup?.desc || "" }}
                        </span>
                    </div>
                </div>
                <div
                    class="self-stretch flex-col justify-start items-start gap-2 flex"
                >
                    <ATitle title="作者" icon="lucide:user-round" />
                    <AUser :user="setup?.author" size="md" />
                </div>
                <div
                    class="self-stretch flex-col justify-start items-start gap-2.5 flex w-full"
                >
                    <ATitle title="タグ" icon="lucide:tags" />
                    <div
                        class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                    >
                        <Tag v-for="i in setup?.tags || []" :text="i" />
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
                            tooltip="一部のアイテムが情報の取得に失敗しています。これらのアイテムは非公開になっているか、カテゴリが変更されたか、既に販売が終了している可能性があります。"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
