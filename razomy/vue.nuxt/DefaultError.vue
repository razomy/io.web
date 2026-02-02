<template>
<!--  <v-parallax src='/images/404.png'>-->
    <div class='d-flex flex-column fill-height justify-center align-center text-white'>
      <h1 v-if='error.statusCode === 404'>{{t('error.404.title')}}</h1>
      <p v-else>
        {{ error }}
      </p>
      <v-btn color='primary' variant='elevated' :to="localePath('/')">Back to Home page</v-btn>
    </div>
<!--  </v-parallax>-->
</template>
<script setup lang='ts'>
const localePath = useLocalePath();
const { t } = useI18n();
const { error } = defineProps<{ 
  error: { statusCode: number },
}>();
</script>
