import type { L2ClientManager } from "../l2/client";
import { registerLoginHandlers } from "./login";

export const registerIpcHandlers = (manager: L2ClientManager): void => {
  registerLoginHandlers(manager);
};
