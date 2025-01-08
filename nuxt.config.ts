// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    }
  },
})
