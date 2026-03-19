<script setup lang="ts">
</script>

<template>
  <rzm-default-layout>
    <template v-slot:sidebar>
      <rzm-group-sidebar></rzm-group-sidebar>
      <SearchSidebar></SearchSidebar>
    </template>
    <slot/>
  </rzm-default-layout>
</template>
