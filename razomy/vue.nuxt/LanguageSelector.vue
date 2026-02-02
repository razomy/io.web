<template>
  <div class='language-selector'>
    <v-select id='select-language'
              v-model='locale'
              :items='locales'
              item-title='name'
              item-value='code'
              density='compact'
              variant='outlined'

    >
      <template v-slot:item='{ props, item }'>
        <v-list-item @click.prevent.stop='setLocale(item.value)'
                     v-bind='props'
                     :to='switchLocalePath(item.value)'></v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script setup lang='ts'>

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>

<style scoped>
</style>
