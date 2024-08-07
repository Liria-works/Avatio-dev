<script setup lang="ts">
const route = useRoute();

const modal_report = ref(false);
const setup = ref<any>(null);
const loading = ref(true);

const totalItems = ref(0);

interface items {
    avatar: number | null;
    cloth: number[];
    accessory: number[];
    other: number[];
    outdated: any[];
}

const Items = ref<items>({
    avatar: null,
    cloth: [],
    accessory: [],
    other: [],
    outdated: [],
});

async function fetchBoothItem(id: number) {
    const response = await $fetch(
        `/api/GetBoothItem?id=${encodeURIComponent(id)}`
    );
    if (response.status === 200) {
        return response;
    } else {
        console.error("Failed to fetch item data:", response);
        return null;
    }
}

onMounted(async () => {
    const id: any = route.query.id;
    const setupData: any = await $fetch(
        `/api/GetDataSetup?id=${encodeURIComponent(id)}`
    );
    if (!setupData) {
        return;
    }

    setup.value = setupData.body;

    const id_avatar: number = setup.value.avatar;
    const avatarItem: any | null = await fetchBoothItem(id_avatar);
    if (avatarItem.body) {
        Items.value.avatar = avatarItem.body.id;
    } else {
        console.error("Invalid content:", id_avatar);
        Items.value.avatar = null;
    }

    const categoryMap: any = {
        209: Items.value.cloth,
        217: Items.value.accessory,
    };

    for await (const i of setup.value.items) {
        if (i) {
            const item: any = await fetchBoothItem(i);
            if (item) {
                const targetArray =
                    categoryMap[item.body.category] || Items.value.other;
                console.log("Item:", item);
                targetArray.push(item.body.id);
            } else {
                console.error("Invalid content:", i);
                Items.value.outdated.push(null);
            }
        }
    }

    totalItems.value =
        // items_avatar.value.length +
        Items.value.cloth.length +
        Items.value.accessory.length +
        Items.value.other.length;
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
                    v-if="Items.avatar"
                    title="ベースアバター"
                    icon="lucide:person-standing"
                >
                    <SetupsItemDetail
                        v-if="Items.avatar"
                        :key="'item-' + Items.avatar"
                        :id="Items.avatar"
                        size="lg"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="Items.cloth.length"
                    title="衣服"
                    icon="lucide:shirt"
                >
                    <SetupsItemDetail
                        v-for="i in Items.cloth"
                        :key="'item-' + i"
                        :id="i"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="Items.accessory.length"
                    title="アクセサリー"
                    icon="lucide:star"
                >
                    <SetupsItemDetail
                        v-for="i in Items.accessory"
                        :key="'item-' + i"
                        :id="i"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="Items.other.length"
                    title="その他"
                    icon="lucide:shirt"
                >
                    <SetupsItemDetail
                        v-for="i in Items.other"
                        :key="'item-' + i"
                        :id="i"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="Items.outdated.length"
                    title="不明なアイテム"
                    icon="lucide:file-question"
                >
                    <SetupsItemDetail
                        v-for="i in Items.outdated"
                        :key="'item-' + i"
                        :id="i"
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
