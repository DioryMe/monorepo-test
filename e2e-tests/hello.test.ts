import { test, expect, _electron as electron } from "@playwright/test";
import path from "node:path";

const electronPath = require("electron");
const appDir = path.join(__dirname, "../packages/desktop-electron/");
const mainScriptPath = path.join(appDir, "dist/main.js");

test("Electron app basic tests", async () => {
  try {
    const electronApp = await electron.launch({
      executablePath: electronPath,
      args: [mainScriptPath, "--no-sandbox", "--headless"],
    });

    // ---- MAIN WINDOW -----------------------------------------
    const mainWindow = await electronApp.firstWindow();
    await mainWindow.waitForLoadState("domcontentloaded");

    // Test IPC ping
    const response = await mainWindow.evaluate(() => window.electronAPI.ping());
    expect(response.data).toBe("PONG");

    // Check the text updates in DOM
    await expect(mainWindow.locator("div#hello")).toHaveText("Hello");

    // ---- ACCESS MAIN PROCESS --------------------------------
    const someMainValue = await electronApp.evaluate(async ({ app }) => {
      return app.isReady();
    });

    expect(someMainValue).toBe(true);

    // ---- CLEANUP --------------------------------------------
    await electronApp.close();
  } catch (error) {
    console.error("Test error:", error);
    throw error;
  }
});
