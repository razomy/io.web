<template>
  <LazyFilesToFilesContent
      :commandId="command.id"
      v-if="command?.spec.returns.type === 'file_path'">
    <slot></slot>
  </LazyFilesToFilesContent>
  <LazyStringToStringContent
      :commandId="command.id"
      v-else-if="command?.spec.returns.type === 'string' || command?.spec.returns.type === 'boolean'">
    <slot></slot>
  </LazyStringToStringContent>
</template>
<script setup lang="ts">
import {commands, getCommandBy} from '~~/razomy/db';

const props = defineProps<{
  directoryPath: string[],
  commandKey: string,
}>()
const directoryPath = props.directoryPath;
const commandKey = props.commandKey;

const command = computed(() => getCommandBy(directoryPath,commandKey));
</script>