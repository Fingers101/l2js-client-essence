const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  loginSmokeTest: () => ipcRenderer.invoke("login:smoke"),
  onPacket: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("game:packet", listener);
    return () => ipcRenderer.removeListener("game:packet", listener);
  },
});
