import { useReCaptcha } from "vue-recaptcha-v3";

export const useRecaptcha = () => {
    if (!process.client) {
        return {
            executeRecaptcha: async () => null,
            verifyRecaptcha: async () => false,
        };
    }

    const recaptcha = useReCaptcha();

    const executeRecaptcha = async (action) => {
        try {
            await recaptcha.recaptchaLoaded(); // 確保 reCAPTCHA 已載入
            const token = await recaptcha.executeRecaptcha(action);
            return token;
        }catch (error) {
            console.error('reCAPTCHA execution error:', error)
            return null
        }
    };

    const verifyRecaptcha = async (token) => {
        try {
            const response = await $fetch(
                '/api/verify-recaptcha',
                {
                    method: 'POST',
                    body: {
                        token
                    }
                }
            );
            // console.log('reCAPTCHA verification response:', response);
            return response.success;
        } catch (error) {
            console.error('reCAPTCHA verification error:', error)
            return false;
        }
    };

    return { executeRecaptcha, verifyRecaptcha };
};