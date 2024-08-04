<template>
    <div class="flex-col items-start gap-6 flex w-full">
        <div class="flex-col items-start gap-3 flex w-full">
            <ATitle title="検索" icon="heroicons:magnifying-glass-20-solid" />

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

        <div class="flex flex-col gap-6 w-full">
            <SetupsCategory
                title="アバターから"
                icon="lucide:user-round"
                trailing="すべてのアバター"
            >
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
                            class="px-3 text-black dark:text-white text-sm font-normal"
                        >
                            アルナ
                        </span>
                    </button>
                </div>
            </SetupsCategory>

            <SetupsCategory
                title="タグから"
                icon="lucide:tags"
                trailing="すべてのタグ"
            >
                <div
                    class="justify-start items-center gap-1.5 flex flex-row flex-wrap"
                >
                    <Tag text="かわいい" />
                    <Tag text="ガーリー" />
                    <Tag text="普段使い" />
                    <Tag text="ショートヘア" />
                </div>
            </SetupsCategory>
        </div>
    </div>
</template>
