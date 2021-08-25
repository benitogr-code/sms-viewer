import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow = null;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// See bridge.ts
async function registerIPCListeners () {

  ipcMain.handle('open-file', async (_event, options: any) => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, { ...options });

      if (result.canceled) {
        return { data: null };
      }

      const buffer = await fs.promises.readFile(result.filePaths[0]);
      return { data: buffer.toString() };
    }
    catch (error) {
      console.error('[ipc]open-file error', error.message);
      return { data: null }
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
  .whenReady()
  .then(registerIPCListeners)
  .catch(err => console.error(err));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('open-file', (event, path) => {
  console.log('Openfile', event, path);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
