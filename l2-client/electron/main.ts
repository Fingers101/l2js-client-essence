import { app, BrowserWindow } from "electron";
import path from "path";
import { registerIpcHandlers } from "./ipc";
import { EssenceClient } from "./l2/client";

const isDevelopment = process.env.NODE_ENV !== "production";
let mainWindow: BrowserWindow | null = null;
const client = new EssenceClient();

function resolvePreload(): string {
  return path.join(__dirname, "preload.ts");
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: resolvePreload(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? "http://localhost:5173";
  if (isDevelopment) {
    await mainWindow.loadURL(devServerUrl);
    mainWindow.webContents.openDevTools();
  } else {
    const indexHtml = path.join(__dirname, "../renderer/dist/index.html");
    await mainWindow.loadFile(indexHtml);
  }

  client.on("packet", (payload) => {
    mainWindow?.webContents.send("game:packet", payload);
  });
}

app.whenReady().then(async () => {
  registerIpcHandlers(client);
  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
