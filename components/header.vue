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
</script>

<template>
    <div class="flex flex-row items-center justify-between w-full">
        <button class="justify-start items-end gap-2 flex font-['Montserrat']">
            <div class="flex gap-1.5">
                <div class="text-black text-5xl font-extrabold">Avat</div>
                <div class="text-black text-5xl font-extrabold">io</div>
            </div>
            <div class="text-black text-sm font-semibold pb-1">by Liria</div>
        </button>
        <div class="items-center flex flex-row gap-12">
            <div class="items-center gap-4 flex">
                <button
                    class="flex items-center justify-center rounded-full hover:bg-neutral-200 p-2"
                >
                    <Icon
                        name="simple-icons:github"
                        :width="24"
                        :height="24"
                        class="text-black"
                    />
                </button>
                <button
                    class="flex items-center justify-center rounded-full hover:bg-neutral-200 p-2"
                >
                    <Icon
                        name="simple-icons:discord"
                        :width="24"
                        :height="24"
                        class="text-black"
                    />
                </button>
                <button
                    class="flex items-center justify-center rounded-full hover:bg-neutral-200 p-2"
                >
                    <Icon
                        name="simple-icons:x"
                        :width="20"
                        :height="20"
                        class="text-black"
                    />
                </button>
            </div>
            <div class="items-center gap-4 flex">
                <UPopover
                    :ui="{
                        background: 'bg-white dark:bg-white',
                        ring: 'ring-0',
                        rounded: 'rounded-lg',
                    }"
                >
                    <button
                        class="flex items-center justify-center rounded-full hover:bg-neutral-200 p-2"
                    >
                        <Icon
                            name="lucide:languages"
                            :width="24"
                            :height="24"
                            class="text-black"
                        />
                    </button>

                    <template #panel="{ close }">
                        <div class="p-8">
                            <UButton label="Close" @click="close" />
                        </div>
                    </template>
                </UPopover>

                <ClientOnly>
                    <UButton
                        :icon="
                            isDark
                                ? 'i-heroicons-moon-20-solid'
                                : 'i-heroicons-sun-20-solid'
                        "
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    />
                    <template #fallback>
                        <div class="w-8 h-8" />
                    </template>
                </ClientOnly>

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
