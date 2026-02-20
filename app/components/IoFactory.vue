<template>
  <LazyFilesToFilesContent
      :directories="directories"
      :command="command"
      v-if="record?.returnType === 'file_path'"><slot></slot></LazyFilesToFilesContent>
  <LazyStringToStringContent
      :directories="directories"
      :command="command"
      v-else-if="record?.returnType === 'string'"><slot></slot></LazyStringToStringContent>
</template>
<script setup lang="ts">
import {commands} from '~~/content/io';

const props = defineProps<{
  directories: string[],
  command: string,
}>()

const directories = props.directories;
const command = props.command;
const record = commands.find(i=>i.directoryPath.join('/') === directories.join('/') && i.commandKey === command)
</script>