import { IPCResponse } from "@monorepo-nodemon/core";

declare global {
  interface Window {
    electronAPI: {
      selectFolder: () => Promise<IPCResponse<string>>;
      ping: () => Promise<IPCResponse<string>>;
    };
  }
}
