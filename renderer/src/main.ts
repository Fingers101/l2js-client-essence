import "./style.css";
import { createScene } from "./babylon/scene";
import { createLoginButton } from "./ui/login";
import type { PacketFeedEvent } from "@shared/types";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement | null;
const uiContainer = document.getElementById("ui");
const logContainer = document.getElementById("log");

if (!canvas || !uiContainer || !logContainer) {
  throw new Error("Renderer root elements are missing.");
}

createScene(canvas);

const renderPacket = (event: PacketFeedEvent): void => {
  const entry = document.createElement("p");
  entry.className = "log-entry";
  const time = new Date(event.timestamp).toLocaleTimeString();
  entry.textContent = `[${time}] ${event.scope.toUpperCase()} → ${event.type} (${event.packetName ?? "Unknown"})`;
  logContainer.prepend(entry);
  while (logContainer.children.length > 12) {
    logContainer.removeChild(logContainer.lastChild as ChildNode);
  }
};

if (window.api) {
  window.api.onPacket((packet) => renderPacket(packet));
}

createLoginButton(uiContainer, () => window.api?.loginSmokeTest?.() ?? Promise.resolve({ success: false }));
