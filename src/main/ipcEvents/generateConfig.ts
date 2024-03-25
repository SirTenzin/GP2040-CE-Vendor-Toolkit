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
      if(["up", "down", "left", "right"].includes(button)) {
        // #define PIN_DPAD_[BUTTON] [PIN]
        boardConfig += `#define PIN_DPAD_${buttons[button]} ${pin}`
      } else {
        // #define PIN_BUTTON_[BUTTON] [PIN]
        boardConfig += `#define PIN_BUTTON_${buttons[button]}} ${pin}`
      }
      // TODO: define sliding pins (LS, RS)
  }

  for (const button in data) {
    let pin = Number(data[button]);
    let pinText = (pin < 10) ? `0${pin}` : `${pin}`
    let buttonText = buttons[button];
    // #define GPIO_PIN_[PIN with leading 0] GpioAction::BUTTON_PRESS_[BUTTON]
    boardConfig += `#define GPIO_PIN_${pinText} GpioAction::BUTTON_PRESS_${buttonText}\n`
  }

  const boardData = new Uint8Array(Buffer.from(boardConfig));
  fs.writeFile('BoardConfig.h', boardData, (err) => {
    if (err) throw err;
    console.log('[IPC:run:generateConfig]: Generated config and saved to BoardConfig.h');
    return shell.openPath('BoardConfig.h');
  });
}
