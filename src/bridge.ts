import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  openFile: () => {
    ipcRenderer.send('open-file');
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
}

// Accessible using 'window.Main.xxx'
contextBridge.exposeInMainWorld('Main', api)
