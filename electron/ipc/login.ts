import { ipcMain } from "electron";
import type { L2ClientManager } from "../l2/client";

export const registerLoginHandlers = (manager: L2ClientManager): void => {
  ipcMain.handle("login:smoke", async () => {
    return manager.loginSmokeTest();
  });
};
