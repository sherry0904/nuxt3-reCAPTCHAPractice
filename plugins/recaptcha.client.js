import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const siteKey = config.public.recaptchaSiteKey;

    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: siteKey,
        loaderOptions: {
            autoHideBadge: false, // Optional: Automatically hides the badge
            explicitRenderParameters: {
                badge: 'bottomright',  // incase you don't want to hide it (inline, bottomright, bottomleft, topright, topleft)
            }
        }
    });
});