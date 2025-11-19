import { registerLoginHandlers } from "./login";
import type { EssenceClient } from "../l2/client";

export function registerIpcHandlers(client: EssenceClient): void {
  registerLoginHandlers(client);
}
