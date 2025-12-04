import { contextBridge, ipcRenderer } from "electron";
// Due to misconfigured build (?) enabling this will cause window.electronAPI to break
// import { IPC_ACTIONS } from "./ipc_actions";

export const IPC_ACTIONS = {
  PING: "PING",
  SELECT_FOLDER: "SELECT_FOLDER",
} as const;

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: () => ipcRenderer.invoke(IPC_ACTIONS.SELECT_FOLDER),
  ping: () => ipcRenderer.invoke(IPC_ACTIONS.PING),
});
