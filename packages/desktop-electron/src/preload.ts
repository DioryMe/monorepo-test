import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { type IPC_ACTION, type ElectronAPI } from "../../core/src/electron-api";

type IPCListener = (_: IpcRendererEvent, data: any) => void;

contextBridge.exposeInMainWorld("electronAPI", {
  folder: {
    select: () => ipcRenderer.invoke("FOLDER_SELECT" satisfies IPC_ACTION),
    progress: (eventHandler) => {
      const listener: IPCListener = (_, data) => eventHandler(data);
      ipcRenderer.on("folder:progress", listener);
      return () => ipcRenderer.removeListener("folder:progress", listener);
    },
    error: (eventHandler) => {
      const listener: IPCListener = (_, data) => eventHandler(data);
      ipcRenderer.on("folder:error", listener);
      return () => ipcRenderer.removeListener("folder:error", listener);
    },
    done: (eventHandler) => {
      const listener: IPCListener = (_, data) => eventHandler(data);
      ipcRenderer.on("folder:done", listener);
      return () => ipcRenderer.removeListener("folder:done", listener);
    },
  },
  ping: () => ipcRenderer.invoke("PING" satisfies IPC_ACTION),
} satisfies ElectronAPI);
