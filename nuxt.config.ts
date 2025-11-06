// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@nuxtjs/color-mode','@nuxtjs/i18n'],
    ui:{
        fonts:false,
        theme: {
            defaultVariants: {
                color: 'neutral',
                size: 'sm'
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
            { code: 'ru', name: 'Russian', file: 'ru.json', language: 'ru' },
        ],
        baseUrl: 'http://localhost:3000',
    },
})