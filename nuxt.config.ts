// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@nuxtjs/color-mode','@nuxtjs/i18n','@pinia/nuxt'],
    ui:{
        fonts:false,
        theme: {
            defaultVariants: {
                color: 'neutral',
                size: 'md'
            }
        }
    },
    css: ['~/assets/css/main.css'],
    colorMode: {
        preference: 'dark',
        fallback: 'dark',
        classSuffix: ''
    },
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'English', file: 'en.json', language: 'en' },
            { code: 'ru', name: 'Русский', file: 'ru.json', language: 'ru' },
        ],
        baseUrl: 'http://localhost:3000',
    },
    app: {
        head: {
            title: 'Untitled - Kanban', // default fallback title
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'page', mode: 'out-in' },
    },
    runtimeConfig: {
        public: {
            baseUrl: import.meta.env.NUXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api'
        }
    }
})