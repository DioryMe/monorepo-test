import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import {
  type IPC_ACTION,
  type ElectronAPI,
  // } from "@monorepo-nodemon/core/dist/electron-api";
} from "../../core/src/electron-api";

contextBridge.exposeInMainWorld("electronAPI", {
  folder: {
    select: () => ipcRenderer.invoke("FOLDER_SELECT" satisfies IPC_ACTION),
    progress: (cb: (data: any) => void) => {
      const handler = (_: IpcRendererEvent, data: any) => cb(data);
      ipcRenderer.on("folder:progress", handler);
      return () => ipcRenderer.removeListener("folder:progress", handler);
    },
    error: (cb: (data: string) => void) => {
      const handler = (_: IpcRendererEvent, data: string) => cb(data);
      ipcRenderer.on("folder:error", handler);
      return () => ipcRenderer.removeListener("folder:error", handler);
    },
    done: (cb: (data: any) => void) => {
      const handler = (_: IpcRendererEvent, data: any) => cb(data);
      ipcRenderer.on("folder:done", handler);
      return () => ipcRenderer.removeListener("folder:done", handler);
    },
  },
  ping: () => ipcRenderer.invoke("PING" satisfies IPC_ACTION),
} satisfies ElectronAPI);
