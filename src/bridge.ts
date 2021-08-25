import { contextBridge, ipcRenderer } from 'electron'
import { FileFilter } from 'electron/main';

interface OpenFileOptions {
  filters?: FileFilter[];
}

interface OpenFileResult {
  data: string|null;
}

export const api = {
  openFile: async (options: OpenFileOptions): Promise<OpenFileResult> => {
    return await ipcRenderer.invoke('open-file', options);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_event, data) => callback(data));
  }
}

// Accessible using 'window.Main.xxx'
contextBridge.exposeInMainWorld('Main', api)
