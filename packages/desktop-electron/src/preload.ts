import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
// Due to misconfigured build (?) enabling this will cause window.electronAPI to break
// import { IPC_ACTIONS } from "./ipc_actions";

export const IPC_ACTIONS = {
  PING: "PING",
  FOLDER_SELECT: "FOLDER_SELECT",
  FOLDER_PROGRESS: "FOLDER_PROGRESS",
  FOLDER_ERROR: "FOLDER_ERROR",
  FOLDER_DONE: "FOLDER_DONE",
} as const;

contextBridge.exposeInMainWorld("electronAPI", {
  folder: {
    select: () => ipcRenderer.invoke(IPC_ACTIONS.FOLDER_SELECT),
    progress: (cb: (data: any) => void) => {
      const handler = (_: IpcRendererEvent, data: any) => cb(data);
      ipcRenderer.on("folder:progress", handler);
      return () => ipcRenderer.removeListener("folder:progress", handler);
    },
    error: () => ipcRenderer.invoke(IPC_ACTIONS.FOLDER_ERROR),
    done: () => ipcRenderer.invoke(IPC_ACTIONS.FOLDER_DONE),
  },
  ping: () => ipcRenderer.invoke(IPC_ACTIONS.PING),
});
