<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
    <footer class="flex flex-col gap-10">
        <UDivider
            :ui="{
                border: { base: 'border-neutral-300 dark:border-neutral-600' },
            }"
        >
            <LogoLiria
                :color="colorMode.value === 'dark' ? '#f0f0f0' : '#484848'"
                :filled="true"
            />
        </UDivider>
        <div class="flex flex-col w-full gap-6 pb-10">
            <div
                class="items-center justify-center gap-4 flex text-neutral-700 dark:text-white"
            >
                <NuxtLink to="/releases">
                    <AButton
                        text="お知らせ"
                        icon="lucide:megaphone"
                        :iconSize="22"
                    />
                </NuxtLink>

                <NuxtLink to="/releases">
                    <AButton
                        text="フィードバック"
                        icon="lucide:message-square"
                        :iconSize="22"
                    />
                </NuxtLink>

                <AButton icon="simple-icons:x" :iconSize="20" />
                <AButton icon="simple-icons:github" :iconSize="22" />
                <AButton icon="simple-icons:discord" class="hidden" />

                <button
                    class="flex gap-2 items-center justify-center rounded-full px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                    <LogoLiria
                        :color="
                            colorMode.value === 'dark' ? '#f0f0f0' : '#484848'
                        "
                        :filled="true"
                    />
                    <span class="pr-0.5 pt-0.5 font-[Montserrat] font-semibold"
                        >Liria</span
                    >
                </button>
            </div>
            <div
                class="items-center justify-center gap-4 flex text-neutral-700 dark:text-white"
            >
                <UButton variant="link">Avatioについて</UButton>
                <NuxtLink to="/faq">
                    <UButton variant="link">FAQ</UButton>
                </NuxtLink>
                <UButton variant="link">利用規約</UButton>
                <UButton variant="link">プライバシーポリシー</UButton>
            </div>
        </div>
    </footer>
</template>
