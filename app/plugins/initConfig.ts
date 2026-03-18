import { useCommandTreeStore } from '~/composables/useCommandTreeStore';
import { useRzmRuntimeConfigState } from '#imports';
import {c} from "../../configs/static-config";

export default defineNuxtPlugin(async (nuxtApp) => {
  const commandTreeStore = useCommandTreeStore();
  const rzmRuntimeConfigState = useRzmRuntimeConfigState();

  rzmRuntimeConfigState.set(c);
  commandTreeStore.initUserEnvironment(null);
});
