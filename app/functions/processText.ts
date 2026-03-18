import {useCommandTreeStore} from "~/composables/useCommandTreeStore";
import {useExecuteStore} from "~/composables/useExecuteStore";

export const processText = async (
  directoryPath: string[],
  commandKey: string,
  arguments_: any[]
) => {
  const {commands} = useCommandTreeStore();
  const {executeCommand} = useExecuteStore();

  const command = commands.find(c => c.directoryPath.join('/') === directoryPath.join('/') && c.commandKey === commandKey)!;
  return executeCommand(command, arguments_) as Promise<string>;
}
