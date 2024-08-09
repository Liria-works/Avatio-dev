<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const DebugUser = () => {
    console.log(user.value);
    return null;
};

const signOut = async () => {
    await supabase.auth.signOut();
};

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
        <div class="flex items-center gap-4">
            <NuxtLink to="/">
                <ClientOnly>
                    <img
                        width="220"
                        :src="isDark ? '/logo_dark.svg' : '/logo_light.svg'"
                /></ClientOnly>
            </NuxtLink>
            <UBadge label="Dev" :ui="{ rounded: 'rounded-full' }" />
        </div>
        <div class="items-center flex flex-row gap-12">
            <div class="items-center gap-4 flex">
                <div class="items-center gap-2 flex">
                    <ClientOnly>
                        <AButton
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
                        <AButton icon="lucide:languages" />

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
                            <NuxtLink to="/edit">Edit</NuxtLink>
                            <NuxtLink to="/login">Login</NuxtLink>
                            <NuxtLink to="/lkshjdlkasjdk">404</NuxtLink>
                            <UButton label="User" @click="DebugUser" />
                            <UButton label="Sign out" @click="signOut" />
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>
    </div>
</template>
