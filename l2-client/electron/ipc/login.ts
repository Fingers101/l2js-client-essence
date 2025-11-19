import { ipcMain } from "electron";
import type { EssenceConnectionConfig, LoginSmokeTestResponse } from "../../shared/types";
import { EssenceClient } from "../l2/client";

export function registerLoginHandlers(client: EssenceClient): void {
  ipcMain.handle("login:smoke", async (_event, payload?: EssenceConnectionConfig): Promise<LoginSmokeTestResponse> => {
    try {
      await client.loginSmokeTest(payload);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return { success: false, message };
    }
  });
}
