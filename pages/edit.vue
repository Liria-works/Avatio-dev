<script setup lang="ts">
import {
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
    TagsInputRoot,
} from "radix-vue";

const router = useRouter();
const toast = useToast();

const actions: any = ref([
    {
        label: "元に戻す",
        click: () => alert("元に戻す機能を実装してくれ"),
    },
]);

const adding = ref(false);
const input_url = ref("");

const avatar = ref<number | null>();

const items_cloth = ref<number[]>([]);
const items_accessory = ref<number[]>([]);
const items_other = ref<number[]>([]);

const title = ref<string>("");
const description = ref<string>("");
const tags = ref<string[]>([]);

const AddItem = async () => {
    adding.value = true;

    const data: any = await $fetch(
        `/api/GetBoothItem?url=${encodeURIComponent(input_url.value)}`
    );

    if (data.status != 200) {
        toast.add({
            title: `エラーによりアイテムの追加に失敗しました。`,
            description: data.status,
        });
        adding.value = false;
        return;
    }

    if (data.body.category === 208) {
        if (!avatar.value) {
            avatar.value = data.body.id;
            input_url.value = "";
        } else {
            toast.add({
                title: "ベースアバターを複数登録することはできません。",
                description: "ベースアバターを置き換えるオプションの実装",
            });
        }
    } else if (data.body.category === 209) {
        if (items_cloth.value.includes(data.body.id)) {
            ItemDuplicated();
        } else {
            items_cloth.value.push(data.body.id);
            input_url.value = "";
        }
    } else if (data.body.category === 217) {
        if (items_accessory.value.includes(data.body.id)) {
            ItemDuplicated();
        } else {
            items_accessory.value.push(data.body.id);
            input_url.value = "";
        }
    } else {
        if (items_other.value.includes(data.body.id)) {
            ItemDuplicated();
        } else {
            items_other.value.push(data.body.id);
            input_url.value = "";
        }
    }
    adding.value = false;
};

const ItemDuplicated = () => {
    toast.add({ title: "アイテムは重複して追加できません。" });
};

const RemoveItem = (list: string, id: number) => {
    if (list === "avatar") {
        avatar.value = null;
        toast.add({
            title: `ベースアバターが削除されました。`,
            description: id.toString(),
            actions,
        });
    } else if (list === "cloth") {
        items_cloth.value = items_cloth.value.filter(
            (item: number) => item !== id
        );
        toast.add({
            title: `アイテムが削除されました。`,
            description: id.toString(),
            actions,
        });
    }
};

onBeforeRouteLeave(
    (to: any, from: any, next: (arg0: boolean | undefined) => void) => {
        if (
            title.value ||
            description.value ||
            tags.value.length ||
            avatar.value ||
            items_cloth.value.length ||
            items_accessory.value.length ||
            items_other.value.length
        ) {
            const answer = window.confirm(
                "入力された内容が破棄されます。よろしいですか？"
            );
            if (answer) {
                next(undefined);
            } else {
                next(false);
            }
        } else {
            next(undefined);
        }
    }
);
</script>

<template>
    <div class="flex-col justify-start items-start gap-5 flex w-full px-3">
        <div class="flex flex-row gap-10 items-center justify-between w-full">
            <UInput
                v-model="title"
                placeholder="セットアップ名を入力"
                size="xl"
                :padded="false"
                variant="none"
                :ui="{ size: { xl: 'text-2xl font-bold' } }"
                class="w-full"
            />
            <div class="flex gap-2 items-center">
                <UButton
                    @click="
                        console.log({
                            Title: title,
                            Description: description,
                            Tag: tags,
                            Create_at: new Date().toISOString(),
                            User: '',
                            Avatar: avatar,
                            Cloth: items_cloth,
                            Accessory: items_accessory,
                            Other: items_other,
                        })
                    "
                    :disabled="
                        !title ||
                        !avatar ||
                        !(
                            items_cloth.length +
                            items_accessory.length +
                            items_other.length
                        )
                    "
                    truncate
                    size="lg"
                    label="公開"
                    icon="i-heroicons-arrow-up-tray-16-solid"
                    :ui="{
                        rounded: 'rounded-full',
                        inline: 'pr-4',
                        truncate: 'whitespace-nowrap',
                    }"
                />

                <AButton
                    @click="router.back()"
                    icon="lucide:trash"
                    :iconSize="18"
                    class="size-10"
                />
            </div>
        </div>
        <div class="items-start gap-8 flex w-full">
            <div class="flex-col items-center gap-8 flex w-full">
                <div class="flex gap-1 items-center w-full">
                    <UInput
                        @keyup.enter="AddItem"
                        v-model="input_url"
                        :disabled="adding"
                        autocomplete="off"
                        variant="outline"
                        size="sm"
                        placeholder="BOOTH URL..."
                        class="w-full"
                        :ui="{
                            rounded: 'rounded-xl',
                            icon: { trailing: { pointer: '' } },
                        }"
                    >
                        <template #trailing>
                            <UButton
                                v-show="input_url !== ''"
                                color="gray"
                                variant="link"
                                icon="i-heroicons-x-mark-20-solid"
                                :padded="false"
                                @click="input_url = ''"
                            />
                        </template>
                    </UInput>
                    <UButton
                        @click="AddItem"
                        :icon="
                            !adding
                                ? 'i-heroicons-plus'
                                : 'i-svg-spinners-ring-resize'
                        "
                        :disabled="adding"
                        label="追加"
                        size="sm"
                        :ui="{
                            rounded: 'rounded-xl',
                        }"
                        class="pr-3"
                    />
                </div>

                <SetupsCategory
                    title="ベースアバター"
                    icon="lucide:person-standing"
                >
                    <div
                        v-if="!avatar"
                        class="bg-white dark:bg-neutral-700 w-full p-5 rounded-xl"
                    >
                        ベースアバターを登録してください
                    </div>

                    <SetupsItemEdit
                        v-if="avatar"
                        @remove="RemoveItem('avatar', avatar)"
                        :key="'item-' + avatar"
                        :id="avatar"
                        size="lg"
                        :avatar="true"
                    />
                </SetupsCategory>

                <div
                    v-if="
                        !(
                            items_cloth.length +
                            items_accessory.length +
                            items_other.length
                        )
                    "
                >
                    アイテムが登録されていません
                </div>

                <SetupsCategory
                    v-if="items_cloth.length"
                    title="衣服"
                    icon="lucide:shirt"
                >
                    <SetupsItemEdit
                        v-for="i in items_cloth"
                        @remove="RemoveItem('cloth', i)"
                        :key="'item-' + i"
                        :id="i"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="items_accessory.length"
                    title="アクセサリー"
                    icon="lucide:star"
                >
                    <SetupsItemEdit
                        v-for="i in items_accessory"
                        @remove="RemoveItem('accessory', i)"
                        :key="'item-' + i"
                        :id="i"
                    />
                </SetupsCategory>

                <SetupsCategory
                    v-if="items_other.length"
                    title="その他"
                    icon="lucide:star"
                >
                    <SetupsItemEdit
                        v-for="i in items_other"
                        @remove="RemoveItem('other', i)"
                        :key="'item-' + i"
                        :id="i"
                    />
                </SetupsCategory>
            </div>
            <div
                class="w-96 flex-col justify-start items-start gap-8 inline-flex"
            >
                <SetupsCategory title="説明" icon="lucide:text">
                    <UTextarea
                        v-model="description"
                        autoresize
                        :ui="{ rounded: 'rounded-xl' }"
                        class="w-full"
                    />
                </SetupsCategory>

                <SetupsCategory title="タグ" icon="lucide:tags">
                    <TagsInputRoot
                        v-model="tags"
                        class="flex gap-2 items-center p-2 rounded-xl w-full flex-wrap bg-neutral-200 dark:bg-neutral-700"
                    >
                        <TagsInputItem
                            v-for="item in tags"
                            :key="item"
                            :value="item"
                            class="dark:text-white text-black flex items-center justify-center gap-2 rounded-lg p-1 bg-white dark:bg-neutral-600"
                        >
                            <TagsInputItemText class="text-sm pl-1.5" />
                            <TagsInputItemDelete
                                class="mr-0.5 rounded hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center justify-center"
                            >
                                <Icon name="lucide:x" />
                            </TagsInputItemDelete>
                        </TagsInputItem>

                        <TagsInputInput
                            placeholder="タグを入力"
                            class="text-sm focus:outline-none flex-1 bg-transparent px-1 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                        />
                    </TagsInputRoot>
                </SetupsCategory>
            </div>
        </div>
    </div>
</template>
