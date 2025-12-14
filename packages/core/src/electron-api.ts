export type IPC_ACTION =
  | "PING"
  | "FOLDER_SELECT"
  | "FOLDER_PROGRESS"
  | "FOLDER_ERROR"
  | "FOLDER_DONE";

export interface FolderActions {
  select: () => Promise<IPCResponse>;
  progress: (cb: (data: number) => void) => () => void;
  error: (cb: (data: string) => void) => () => void;
  done: (cb: (data: any) => void) => () => void;
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
