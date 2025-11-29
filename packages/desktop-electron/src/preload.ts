import { IPC_ACTIONS } from "@monorepo-nodemon/core";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // selectFolder: () => ipcRenderer.invoke(IPC_ACTIONS.SELECT_FOLDER),
  selectFolder: () => ipcRenderer.invoke("SELECT_FOLDER"),
});
