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
