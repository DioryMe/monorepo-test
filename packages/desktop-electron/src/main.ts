import { app, BrowserWindow, dialog, ipcMain, protocol, net } from "electron";
import path, { join } from "path";
import { Diory } from "@monorepo-nodemon/core";
import { IPC_ACTIONS } from "./ipc_actions";

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isPlaywrightTest = process.env.EXECUTION_CONTEXT === "playwright";
  const isDev = !isPlaywrightTest && !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    const indexHtmlPath = path.join(__dirname, "./desktop-client/index.html");
    mainWindow.loadFile(indexHtmlPath);
  }

  if (process.env.DEV_TOOLS) {
    mainWindow.webContents.openDevTools();
  }
};

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      standard: true,
      secure: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

app.whenReady().then(async () => {
  const diory: Diory = { id: "54321", text: "1223" };
  console.log("diory", JSON.stringify(diory));
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle(IPC_ACTIONS.SELECT_FOLDER, async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    // properties: ["openDirectory"],
    properties: ["openFile"],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const folderPath = result.filePaths[0];

    console.log("folderPath", folderPath);
    return { success: true, data: folderPath };
  }

  return { success: false, error: "No folder selected" };
});

ipcMain.handle(IPC_ACTIONS.PING, async () => {
  return { success: true, data: "PONG" };
});
