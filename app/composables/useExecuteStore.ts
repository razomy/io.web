import {defineStore} from 'pinia';
import {BrowserExecuteController} from "~~/razomy/io/executor/executor";
import type {IoCommand} from "~~/razomy/io/command";

const executeController = new BrowserExecuteController();

export const useExecuteStore = defineStore('useExecuteStore', {
  state: () => ({}),

  actions: {
    async executeCommand(command: IoCommand, arguments_: any[]) {
      return await executeController.execute(command, arguments_);
    },
  }
});
