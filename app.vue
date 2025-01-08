<template>
  <div>
    <button @click="handleSubmit">Submit</button>
    <p>{{ verificationResult }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRecaptcha } from '~/composables/useRecaptcha';

const { executeRecaptcha, verifyRecaptcha } = useRecaptcha();
const verificationResult = ref(null);

const handleSubmit = async () => {
  const token = await executeRecaptcha('submit_form');
  if (token) {
    const isVerified = await verifyRecaptcha(token);
    verificationResult.value = isVerified ? 'Success' : 'Failed';
    if (isVerified) {
      // 驗證成功，執行後續操作
      console.log('驗證成功');
    } else {
      // 驗證失敗
      console.log('驗證失敗');
    }
  } else {
    console.log('reCAPTCHA 執行失敗');
  }
};
</script>