export type IPC_ACTION =
  | "PING"
  | "FOLDER_SELECT"
  | "FOLDER_PROGRESS"
  | "FOLDER_ERROR"
  | "FOLDER_DONE";

type IPCEventHandler = (data: any) => void;

export interface FolderActions {
  select: () => Promise<IPCResponse>;
  progress: (eventHandler: IPCEventHandler) => () => void;
  error: (eventHandler: IPCEventHandler) => () => void;
  done: (eventHandler: IPCEventHandler) => () => void;
}

export interface ElectronAPI {
  folder: FolderActions;
  ping: () => Promise<IPCResponse>;
}

export interface IPCMessage<T = any> {
  type: string;
  payload?: T;
}

export interface IPCResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
