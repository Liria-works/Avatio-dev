<script setup lang="ts">

</script>

<template>
    <div class="flex-col justify-start items-start gap-5 flex w-full px-3">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="items-center gap-3 flex flex-row">
                <div class="text-black dark:text-white text-2xl font-bold pb-1">
                    普段使い改変
                </div>
                <AButton icon="lucide:pen-line" :iconSize="18" class="" />
            </div>
            <div class="flex gap-2 items-center">
                <NuxtLink to="/">
                    <AButton icon="lucide:upload" text="公開" :iconSize="18"
                        class="dark:bg-neutral-200 hover:dark:bg-neutral-400 dark:text-neutral-800" />
                </NuxtLink>
                <NuxtLink to="/">
                    <AButton icon="lucide:trash" :iconSize="18"
                        class="dark:bg-neutral-700 hover:dark:bg-neutral-600 h-10 w-10" />
                </NuxtLink>
            </div>
        </div>
        <div class="items-start gap-8 flex w-full">
            <div class="flex-col items-center gap-8 flex w-full">
                <div class="flex-col items-start gap-3 flex w-full">
                    <ATitle title="ベースアバター" icon="lucide:person-standing" />
                    <AItem text="アルナ -Alna-【オリジナル3Dモデル】" shop="アオノイド"
                        image="https://booth.pximg.net/c/620x620/b78fdd20-b640-4c54-b8ac-49a54b61717f/i/5840911/1ceec8da-8aba-4157-9629-db325d169608_base_resized.jpg"
                        :price="4000" size="lg" :editing="true" />
                </div>

                <UButton icon="i-heroicons-plus" size="md" label="カテゴリを追加" :ui="{ rounded: 'rounded-full' }" block />

                <div class="flex-col items-start gap-3 flex w-full">
                    <ATitle title="衣装" icon="lucide:shirt" />
                    <div class="flex gap-1 items-center w-full">
                        <UInput variant="outline" size="sm" placeholder="要素を追加..." class="w-full"
                            :ui="{ rounded: 'rounded-xl' }" />
                        <UButton icon="i-heroicons-plus" label="追加" size="sm" :ui="{
                            rounded: 'rounded-xl',
                        }" class="pr-3" />
                    </div>
                    <AItem text="【複数アバター対応】怪獣着ぐるみ たつぐるみ" shop="sasappetito Paws"
                        image="https://booth.pximg.net/e715aab8-6dd1-46e0-b0f9-f481cdaab0da/i/5929004/bd1da940-09ad-4bd8-89cb-3de5e040203c_base_resized.jpg"
                        :price="1500" size="md" :editing="true" />
                    <AItem text="【複数アバター対応】怪獣着ぐるみ たつぐるみ" shop="sasappetito Paws"
                        image="https://booth.pximg.net/e715aab8-6dd1-46e0-b0f9-f481cdaab0da/i/5929004/bd1da940-09ad-4bd8-89cb-3de5e040203c_base_resized.jpg"
                        :price="1500" size="md" :editing="true" />
                </div>
                <div class="flex-col items-start gap-3 flex w-full">
                    <ATitle title="アクセサリー" icon="lucide:star" />
                    <AItem text="チャームチョーカー // アバターアクセサリー" shop="Liria Graphics"
                        image="https://booth.pximg.net/71691351-b285-40e7-af97-09cd9976f902/i/4758318/ad7ce9a5-5375-471a-bcfd-0b8b5bdda437_base_resized.jpg"
                        :price="500" size="md" :editing="true" :nsfw="true" />
                </div>
            </div>
            <div class="w-96 flex-col justify-start items-start gap-16 inline-flex">
                <div class="flex-col justify-start items-start gap-8 flex w-full">
                    <div class="self-stretch flex-col justify-start items-start gap-2 flex">
                        <ATitle title="説明" icon="lucide:text" />
                        <div class="self-stretch px-3 py-2 bg-white dark:bg-neutral-700 rounded-xl items-center flex">
                            <span
                                class="text-black dark:text-white text-sm">普段使っているアバターです。<br />かわいいものをたくさん使いました。</span>
                        </div>
                    </div>

                    <div class="self-stretch flex-col justify-start items-start gap-2.5 flex w-full">
                        <ATitle title="タグ" icon="lucide:tags" />
                        <div class="justify-start items-center gap-1.5 flex flex-row flex-wrap">
                            <Tag text="かわいい" />
                            <Tag text="ガーリー" />
                            <Tag text="普段使い" />
                            <Tag text="ショートヘア" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
