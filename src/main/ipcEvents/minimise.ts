import Electron from 'electron';

export default async function(event: Electron.IpcMainEvent, app: Electron.App, mainWindow: Electron.BrowserWindow, args: Array<any>) {
  mainWindow.minimize()
}
