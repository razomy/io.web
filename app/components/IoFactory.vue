<template>
  <LazyFilesToFilesContent
      :directoryPath="directoryPath"
      :commandKey="commandKey"
      v-if="record?.spec.returns.type === 'file_path'">
    <slot></slot>
  </LazyFilesToFilesContent>
  <LazyStringToStringContent
      :directoryPath="directoryPath"
      :commandKey="commandKey"
      v-else-if="record?.spec.returns.type === 'string' || record?.spec.returns.type === 'boolean'">
    <slot></slot>
  </LazyStringToStringContent>
</template>
<script setup lang="ts">
import {commands} from '~~/razomy/db';

const props = defineProps<{
  directoryPath: string[],
  commandKey: string,
}>()

const directoryPath = props.directoryPath;
const commandKey = props.commandKey;
const record = commands.find(i => i.directoryPath.join('/') === directoryPath.join('/') && i.commandKey === commandKey)
</script>