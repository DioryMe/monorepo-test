import { IPCResponse } from "@monorepo-nodemon/core";

declare global {
  interface Window {
    electronAPI: {
      folder: {
        select: () => Promise<IPCResponse<string>>;
        progress: (
          cb: any
        ) => (
          callback: (data: FolderProgress) => any | Destructor
        ) => () => void;
        error: () => (callback: (data: FolderProgress) => void) => void;
        done: () => (callback: (data: FolderProgress) => void) => void;
      };
      ping: () => Promise<IPCResponse<string>>;
    };
  }
}
