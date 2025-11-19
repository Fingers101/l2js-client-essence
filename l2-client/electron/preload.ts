import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";
import type { PacketEventPayload, RendererAPI } from "../shared/types";

const api: RendererAPI = {
  loginSmokeTest: () => ipcRenderer.invoke("login:smoke"),
  onPacket: (listener) => {
    const handler = (_event: IpcRendererEvent, payload: PacketEventPayload) => listener(payload);
    ipcRenderer.on("game:packet", handler);
    return () => ipcRenderer.removeListener("game:packet", handler);
  },
};

contextBridge.exposeInMainWorld("api", api);
