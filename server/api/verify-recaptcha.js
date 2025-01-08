export  default defineEventHandler(async (event) => {
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const body = await readBody(event);
    const token = body.token;
    const secret = recaptchaSecretKey;

    if (!token || !secret) {
        return {
            success: false,
            message: 'reCAPTCHA token or secret key is missing'
        }
    }

    try {
        const response = await $fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: 'POST',
                body: new URLSearchParams({
                    secret: secret,
                    response: token
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }
        );

        console.log('reCAPTCHA verification response:', response);

        return { 
            success: true,
            score: response.score
        }
    }catch (error) {
        console.error('reCAPTCHA verification error:', error)
        return {
            success: false,
            message: 'reCAPTCHA verification error'
        }
    }
    
});