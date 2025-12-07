import { test, expect, _electron as electron } from "@playwright/test";
import path from "node:path";

const electronPath = require("electron");
const appDir = path.join(__dirname, "../packages/desktop-electron/");

console.log("electronPath", electronPath);
console.log("appDir", appDir);

test("Electron app basic tests", async () => {
  const electronApp = await electron.launch({
    executablePath: electronPath,
    args: [appDir],
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
    return app.getVersion();
  });

  expect(someMainValue).toBe("0.0.1");

  // ---- CLEANUP --------------------------------------------
  await electronApp.close();
});
