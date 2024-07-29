<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
import Button_Custom from "~/components/button.vue";
</script>

<template>
    <div class="flex flex-row items-center justify-between w-full">
        <button
            class="justify-start items-end gap-2 flex font-['Montserrat'] text-black dark:text-white"
        >
            <div class="flex gap-1.5 text-5xl font-extrabold">
                <div>Avat</div>
                <div>io</div>
            </div>
            <div class="text-sm font-semibold pb-1">by Liria</div>
        </button>
        <div class="items-center flex flex-row gap-12">
            <div class="items-center gap-4 flex">
                <div class="items-center gap-2 flex">
                    <ClientOnly>
                        <Button_Custom
                            :icon="
                                isDark
                                    ? 'i-heroicons-moon-20-solid'
                                    : 'i-heroicons-sun-20-solid'
                            "
                            @click="isDark = !isDark"
                        />
                        <template #fallback>
                            <div class="w-0 h-8" />
                        </template>
                    </ClientOnly>

                    <UPopover
                        :ui="{
                            background: 'bg-white dark:bg-white',
                            ring: 'ring-0',
                            rounded: 'rounded-lg',
                        }"
                    >
                        <Button_Custom icon="lucide:languages" />

                        <template #panel="{ close }">
                            <div class="p-8">
                                <UButton label="Close" @click="close" />
                            </div>
                        </template>
                    </UPopover>
                </div>

                <UPopover
                    :ui="{
                        background: 'bg-white dark:bg-white',
                        ring: 'ring-0',
                        rounded: 'rounded-lg',
                    }"
                >
                    <UAvatar
                        src="https://avatars.githubusercontent.com/u/47878070?v=4"
                        alt="Avatar"
                    />

                    <template #panel="{ close }">
                        <div
                            class="flex flex-col gap-1 items-center p-8 text-black"
                        >
                            <NuxtLink to="/">Root</NuxtLink>
                            <NuxtLink to="/setup">Setup</NuxtLink>
                            <NuxtLink to="/lkshjdlkasjdk">404</NuxtLink>
                            <UButton label="Close" @click="close" />
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>
    </div>
</template>
