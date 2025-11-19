import { app, BrowserWindow } from "electron";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { registerIpcHandlers } from "./ipc";
import { L2ClientManager } from "./l2/client";
import { MobiusEssenceProfile } from "./l2/profiles/essence";
import type { PacketFeedEvent } from "@shared/types";

dotenv.config();

let mainWindow: BrowserWindow | null = null;

const rendererUrl = process.env.ELECTRON_RENDERER_URL ?? "http://localhost:5173";
const rendererDistPath = path.resolve(__dirname, "../renderer/dist/index.html");

const clientManager = new L2ClientManager({
  profile: MobiusEssenceProfile,
  credentials: {
    username: process.env.L2_USERNAME ?? "",
    password: process.env.L2_PASSWORD ?? "",
  },
  serverId: process.env.L2_SERVER_ID ? Number(process.env.L2_SERVER_ID) : undefined,
  charSlot: process.env.L2_CHAR_SLOT ? Number(process.env.L2_CHAR_SLOT) : undefined,
  loginHostOverride: process.env.L2_LOGIN_HOST,
  loginPortOverride: process.env.L2_LOGIN_PORT ? Number(process.env.L2_LOGIN_PORT) : undefined,
});

clientManager.on("packet", (payload: PacketFeedEvent) => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send("game:packet", payload);
  });
});

registerIpcHandlers(clientManager);

const createWindow = async (): Promise<void> => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!app.isPackaged) {
    await mainWindow.loadURL(rendererUrl);
  } else if (fs.existsSync(rendererDistPath)) {
    await mainWindow.loadFile(rendererDistPath);
  } else {
    await mainWindow.loadURL(rendererUrl);
  }
};

app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
