<script setup lang="ts">
</script>

<template>
  <rzm-default-layout>
    <template v-slot:sidebar>
      <SearchSidebar></SearchSidebar>
    </template>
    <slot/>
  </rzm-default-layout>
</template>
