// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
      "@nuxt/ui",
      "@vueuse/nuxt",
      "@nuxt/image",
      "@nuxt/fonts",
      "@nuxt/scripts",
      "@formkit/auto-animate",
      "@nuxt/content",
      "@nuxtjs/color-mode",
      "@nuxtjs/supabase",
      "@nuxtjs/ngrok",
      "@nuxthub/core",
    ],
    compatibilityDate: "2024-07-25",
    components: [
        {
            path: "~/components",
        },
    ],
    supabase: {
        redirect: false,
        redirectOptions: {
            login: "/login",
            callback: "/confirm",
            include: undefined,
            exclude: [],
            cookieRedirect: false,
        },
    },
    routeRules: {
        "/": { prerender: true },
    },
    css: ["~/public/markdown.css"],
    icon: {
        provider: "server",
        customCollections: [
            {
                prefix: "avatio",
                dir: "./public/icons/avatio",
            },
        ],
    },
    ngrok: {
        // module options
        authtoken: process.env.NGROK_AUTHTOKEN,
    },
});