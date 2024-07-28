// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "radix-vue",
        "@vueuse/nuxt",
        "@nuxt/image",
        "@nuxt/fonts",
        "@nuxt/scripts",
        "@formkit/auto-animate",
        "@nuxt/content",
    ],
    compatibilityDate: "2024-07-25",
    css: ["~/public/index.css"],
});
