<script setup>
</script>

<template>
  <rzm-default-layout>
    <template v-slot:sidebar="{ modelValue, updateModelValue }">
      <SearchSidebar
          :modelValue="modelValue"
          @update:modelValue="updateModelValue"
      ></SearchSidebar>
    </template>
    <slot/>
  </rzm-default-layout>
</template>