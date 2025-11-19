import "./style.css";
import { initScene } from "./babylon/scene";
import { createLoginButton } from "./ui/login";
import type { PacketEventPayload } from "@shared/types";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const logContainer = document.getElementById("log") as HTMLElement | null;

if (!canvas || !logContainer) {
  throw new Error("Renderer root elements were not found");
}

const { guiTexture } = initScene(canvas);
const loginButton = createLoginButton(guiTexture, async () => {
  loginButton.setStatus("Connecting...");
  try {
    const response = await window.api.loginSmokeTest();
    loginButton.setStatus(response.success ? "Connected" : response.message ?? "Login failed");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    loginButton.setStatus(message);
  }
});

const detach = window.api.onPacket((packet: PacketEventPayload) => {
  const entry = document.createElement("p");
  entry.className = "log-entry";
  entry.innerHTML = `<strong>${packet.name}</strong> - ${new Date(packet.timestamp).toLocaleTimeString()}`;
  logContainer.prepend(entry);
  loginButton.setStatus(`Received: ${packet.name}`);
});

window.addEventListener("beforeunload", () => detach());
