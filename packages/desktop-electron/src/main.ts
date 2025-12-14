import { app, BrowserWindow, dialog, ipcMain, protocol, net } from "electron";
import path, { join } from "path";
import { Diory } from "@monorepo-nodemon/core/dist/types";
import { type IPC_ACTION } from "@monorepo-nodemon/core/dist/electron-api";

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

ipcMain.handle("FOLDER_SELECT" satisfies IPC_ACTION, async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const folderPath = result.filePaths[0];

    console.log("folderPath", folderPath);

    console.log("Loading started...");
    loadFolder(event.sender);
    return { success: true, data: folderPath };
  }

  return { success: false, error: "No folder selected" };
});

const generateDiograph = (webContents: any) => {
  setTimeout(() => {
    console.log("Loading:tick");
    webContents.send("folder:progress", Math.floor(Math.random() * 10000));
    generateDiograph(webContents);
  }, 700);
};

async function loadFolder(webContents: Electron.WebContents) {
  try {
    generateDiograph(webContents);

    // webContents.send("folder:done", { success: true });
  } catch (err: any) {
    webContents.send("folder:error", err.message);
  }
}

ipcMain.handle("PING" satisfies IPC_ACTION, async () => {
  return { success: true, data: "PONG" };
});
