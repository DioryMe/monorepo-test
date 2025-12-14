import { ElectronAPI } from "@monorepo-nodemon/core/dist/electron-api";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
