import {useCommandTreeStore} from "~/composables/useCommandTreeStore";
import {useExecuteStore} from "~/composables/useExecuteStore";

export const sendFile = async (
  commandId: string,
  arguments_: [File]
) => {
  const {getCommandById} = useCommandTreeStore();
  const {executeCommand} = useExecuteStore();
  const command = getCommandById(commandId)!;
  return executeCommand(command, arguments_) as Promise<Blob>;
}
