export interface Diory {
  id: string;
  text: string;
  image?: string;
  latlng?: string;
  date?: string;
  data?: Record<string, any>;
  links?: string[];
}

export interface Config {
  folderPath?: string;
}

export interface DiographData {
  diories: Diory[];
}

// IPC Message Types
export interface IPCMessage<T = any> {
  type: string;
  payload?: T;
}

export interface IPCResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
