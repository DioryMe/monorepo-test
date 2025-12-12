import { test, expect, _electron as electron } from "@playwright/test";
import path from "path";

function electronBinaryPath() {
  if (process.platform === "win32") {
    return path.join(
      __dirname,
      "../packages/desktop-electron/dist/win-unpacked/Monorepo Test Electron.exe"
    );
  }
  if (process.platform === "darwin") {
    return path.join(
      __dirname,
      "../packages/desktop-electron/dist/mac-arm64/Monorepo Test Electron.app/Contents/MacOS/Monorepo Test Electron"
    );
  }
  throw new Error("Unsupported OS");
}

test("Packaged app basic tests", async () => {
  try {
    const electronApp = await electron.launch({
      executablePath: electronBinaryPath(),
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
      return app.isPackaged;
    });

    expect(someMainValue).toBe(true);

    // ---- CLEANUP --------------------------------------------
    await electronApp.close();
  } catch (error) {
    console.error("Test error:", error);
    throw error;
  }
});
