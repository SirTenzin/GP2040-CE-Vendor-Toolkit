import { shell } from 'electron';
import fs from 'fs';

type Labels = {
  [key: string]: string;
}

const labels: Labels = {
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
  rs: "R3",
  lb: 'L1',
  lt: 'L2',
  ls: "L3",
  select: "S1",
  start: "S2",
  home: "A1",
  capture: "A2",
};

const layoutTypes_left: Labels = {
  "WASD": "BUTTONS_BASIC",
  "WASD Angled": "BUTTONS_ANGLED",
  "Stick": "STICK",
  "Stickless": "STICKLESS",
  "Dancepad": "DANCEPADA",
}

const layoutTypes_right: Labels = {
  "Arcade": "ARCADE",
  "Stickless": "STICKLESSB",
  "Vewlix": "VEWLIX",
  "Vewlix 7": "VEWLIX7",
  "Noir 8": "NOIR8",
  "Dancepad": "DANCEPADB",
  "Capcom": "CAPCOM",
  "Capcom 6": "CAPCOM6",
  "Sega 2P": "SEGA2P",
}

const inputModes: Labels = {
  "XInput": "XINPUT",
  "Switch": "SWITCH",
  "PS4": "PS4",
  "HID": "HID",
  "Web Config": "CONFIG",
  "Keyboard": "KEYBOARD",
  "Astro City Mini": "ASTRO",
  "Egret Mini": "EGRET",
  "Megadrive Mini": "MDMINI",
  "Neo Geo Mini": "NEOGEO",
  "PC Engine Mini": "PCEMINI",
  "PS Classic (Mini)": "PSCLASSIC",
  "Xbox One X/S | Xbox Series X/S": "XBONE"
}

const dpadModes: Labels = {
  "Digital": "DIGITAL",
  "Left Stick": "LEFT_ANALOG",
  "Right Stick": "RIGHT_ANALOG",
}

const socdModes: Labels = {
  "Neutral": "NEUTRAL",
  "Up Priority": "UP_PRIORITY",
  "First Input Priority": "FIRST_INPUT_PRIORITY",
  "Last Input Priority": "LAST_INPUT_PRIORIRTY",
  "Bypass": "BYPASS"
};

const forcedSetupModes: Labels = {
  "Off": "OFF",
  "Lock Web Config": "LOCK_WEB_CONFIG",
  "Lock Default Input Mode": "LOCK_MODE_SWITCH",
  "Lock Both": "LOCK_BOTH"
}

const layouts = ["movement key layout", "action key layout"]
const movements = ["up", "down", "left", "right"]
const actions = ["a", "b", "x", "y", "rb", "rt", "lb", "lt"]
const auxiliary = ["home", "start", "select", "rs", "ls", "turbo", "capture"]
const defaults = ["input mode", "dpad mode", "socd mode", "forced setup mode"]
const pled = [""];

export default async function(event: Electron.IpcMainEvent, app: Electron.App, mainWindow: Electron.BrowserWindow, args: Array<any>) {
  let boardConfig = '';
  let data: { [key: string]: string } = args[1];
  let movementData: any = {};
  let actionData: any = {};
  let layoutData: any = {};
  let defaultData: any = {};
  let auxiliaryData: any = {};
  let pledData: any = {};
  for (const item in data) {
    if(layouts.includes(item)) {
      layoutData[item] = data[item];
    } else if(movements.includes(item)) {
      movementData[item] = data[item];
    } else if(actions.includes(item)) {
      actionData[item] = data[item];
    } else if(defaults.includes(item)) {
      defaultData[item] = data[item];
    } else if (auxiliary.includes(item)) {
      auxiliaryData[item] = data[item];
    } else if(pled) {
      pledData[item] = data[item];
    }
  }

  // #define BUTTON_LAYOUT BUTTON_LAYOUT_[LAYOUT]
  // #define BUTTON_LAYOUT_RIGHT  BUTTON_LAYOUT_[LAYOUT]
  boardConfig += `#define BUTTON_LAYOUT BUTTON_LAYOUT_${layoutTypes_left[layoutData["movement key layout"]]}\n`
  boardConfig += `#define BUTTON_LAYOUT_RIGHT BUTTON_LAYOUT_${layoutTypes_right[layoutData["action key layout"]]}\n`
  boardConfig += "\n\n"

  // #define DEFAULT_INPUT_MODE INPUT_MODE_[INPUT MODE]
  boardConfig += `#define DEFAULT_INPUT_MODE INPUT_MODE_${inputModes[defaultData["input mode"]]}\n`

  // #define DEFAULT_DPAD_MODE DPAD_MODE_[DPAD MODE]
  boardConfig += `#define DEFAULT_DPAD_MODE DPAD_MODE_${dpadModes[defaultData["dpad mode"]]}\n`

  // #define DEFAULT_SOCD_MODE SOCD_MODE_[SOCD MODE]
  boardConfig += `#define DEFAULT_SOCD_MODE SOCD_MODE_${socdModes[defaultData["socd mode"]]}\n`

  boardConfig += `\n\n`;

  // #define DEFAULT_FORCED_SETUP_MODE FORCED_SETUP_MODE_[FORCED SETUP MODE]
  boardConfig += `#define DEFAULT_FORCED_SETUP_MODE FORCED_SETUP_MODE_${forcedSetupModes[defaultData["forced setup mode"]]}\n`

  boardConfig += `\n\n`

  for(const movement in movementData) {
    let pin = Number(movementData[movement])
    // #define PIN_DPAD_[BUTTON] [PIN]
    boardConfig += `#define PIN_DPAD_${labels[movement]} ${pin}\n`
  }

  for(const action in actionData) {
    let pin = Number(actionData[action])
    // #define PIN_BUTTON_[BUTTON] [PIN]
    boardConfig += `#define PIN_BUTTON_${labels[action]} ${pin}\n`
    // TODO: define sliding pins (LS, RS)
  }

  for(const aux in auxiliaryData) {
    let pin = Number(auxiliaryData[aux])
    // #define PIN_BUTTON_[BUTTON] [PIN]
    boardConfig += `#define PIN_BUTTON_${labels[aux]} ${pin}\n`
  }

  boardConfig += "\n\n"

  for (const movement in movementData) {
    let pin = Number(movementData[movement]);
    let pinText = (pin < 10) ? `0${pin}` : `${pin}`
    let buttonText = labels[movement];
    // #define GPIO_PIN_[PIN with leading 0] GpioAction::BUTTON_PRESS_[BUTTON]
    boardConfig += `#define GPIO_PIN_${pinText} GpioAction::BUTTON_PRESS_${buttonText}\n`
  }

  for (const action in actionData) {
    let pin = Number(actionData[action]);
    let pinText = (pin < 10) ? `0${pin}` : `${pin}`
    let buttonText = labels[action];
    // #define GPIO_PIN_[PIN with leading 0] GpioAction::BUTTON_PRESS_[BUTTON]
    boardConfig += `#define GPIO_PIN_${pinText} GpioAction::BUTTON_PRESS_${buttonText}\n`
  }

  for (const aux in auxiliaryData) {
    let pin = Number(auxiliaryData[aux]);
    let pinText = (pin < 10) ? `0${pin}` : `${pin}`
    let buttonText = labels[aux];
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
