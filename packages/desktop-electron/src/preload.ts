import { contextBridge, ipcRenderer } from "electron";
// import { IPC_ACTIONS } from "@diographita/core";

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: () => ipcRenderer.invoke("SELECT_FOLDER"), // IPC_ACTIONS.SELECT_FOLDER
});
