import { shell } from 'electron';
import fs from 'fs';

type Buttons = {
  [key: string]: string;
}

const buttons: Buttons = {
  up: 'UP',
  down: 'DOWN',
  left: 'LEFT',
  right: 'RIGHT',
  a: 'B1',
  b: 'B2',
  x: 'B3',
  y: 'B4',
  rb: 'R1',
  rt: 'R2',
  lb: 'L1',
  lt: 'L2',
};

export default async function(event: Electron.IpcMainEvent, app: Electron.App, mainWindow: Electron.BrowserWindow, args: Array<any>) {
  let boardConfig = '';
  let data: { [key: string]: string } = args[1];
  for (const button in data) {
    let pin = Number(data[button]);
    let pinText = (pin < 10) ? `0${pin}` : `${pin}`
    let buttonText = buttons[button];
    boardConfig += `#define GPIO_PIN_${pinText} GpioAction::BUTTON_PRESS_${buttonText}\n`
  }
  const boardData = new Uint8Array(Buffer.from(boardConfig));
  fs.writeFile('BoardConfig.h', boardData, (err) => {
    if (err) throw err;
    console.log('[IPC:run:generateConfig]: Generated config and saved to BoardConfig.h');
    return shell.openPath('BoardConfig.h');
  });
}
