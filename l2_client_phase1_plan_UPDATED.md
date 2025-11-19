# Phase 1 – Electron + Babylon.js + l2js-client (Essence) Client Architecture  
### Updated Project Plan (Aligned With Final Architecture)

---

## 🎯 Project Goal
Build a **native Lineage 2 Essence client** using:

- **Electron (Main Process)** → Node runtime, TCP networking, l2js-client  
- **Vite + TypeScript (Renderer)** → Babylon.js 3D engine  
- **Electron IPC** → Communication between Renderer and Main  
- **l2js-client (Essence-enabled)** → Protocol support for L2J Mobius Essence 8.3  

No browser.  
No Express.  
No REST API.  
No WebSockets.  

This is a **native desktop client**, not a web app.

---

# 🧱 1. High-Level Architecture

```
┌──────────────────────────────┐
│         Electron Main         │
│     (Node.js Backend Layer)   │
│  - Runs l2js-client (TCP)     │
│  - Connects to Login/Game     │
│  - Holds connection state     │
│  - Performs encryption/logic  │
│  - Exposes API via IPC        │
└───────────────┬──────────────┘
                │  IPC bridge
┌───────────────▼──────────────┐
│      Electron Renderer        │
│       (Vite + TS + BJS)       │
│  - Babylon.js rendering       │
│  - Simple GUI (login button)  │
│  - Renders test scene         │
│  - Sends commands via IPC     │
│  - Receives server data       │
└──────────────────────────────┘
```

This architecture is final and confirmed.

---

# 📁 2. Recommended Folder Structure

```
l2-client/
│
├─ electron/                     # Electron Main process
│   ├─ main.ts
│   ├─ preload.ts
│   ├─ ipc/                      # IPC handlers for Renderer <-> Main
│   │   ├─ login.ts
│   │   ├─ game.ts
│   │   └─ index.ts
│   └─ l2/
│       ├─ client.ts             # Wrapper for l2js-client
│       ├─ profiles/
│       │   ├─ classic.ts
│       │   └─ essence.ts
│       └─ packets/              # Optional: custom handlers
│
├─ renderer/                     # Vite + TypeScript + Babylon.js
│   ├─ index.html
│   ├─ main.tsx                  # Entry point
│   ├─ babylon/
│   │   └─ scene.ts              # Babylon.js engine setup
│   └─ ui/
│       └─ login.ts              # Babylon GUI login button
│
└─ shared/
    └─ types.ts                  # Shared IPC types
```

---

# 🔌 3. Main Process Responsibilities (Electron)

1. Initialize Electron window  
2. Create IPC channels  
3. Load and configure **l2js-client (Essence profile)**  
4. Handle:
   - Login server connection  
   - Server list response  
   - Connect to game server  
   - Enter World  
   - Encryption toggling (Essence disables game encryption)  
5. Forward server packets to Renderer via IPC  
6. Accept commands from Renderer (login, movement, chat)

---

# 🖼 4. Renderer Responsibilities (Babylon.js via Vite)

1. Create Babylon engine & scene  
2. Create simple GUI with:
   - "Login Test" button  
   - Optional debug text  
3. On click → call IPC:
   ```
   window.api.loginSmokeTest()
   ```
4. Render basic:
   - Ground plane
   - Simple box (placeholder for character)
5. Display Node → Renderer events:
   - Login success/fail  
   - Server list  
   - CharSelected  
   - UserInfo  
6. Future: Real models, animations, UI, etc.

---

# 🔗 5. IPC Contract

Expose in `preload.ts`:

```ts
contextBridge.exposeInMainWorld("api", {
  loginSmokeTest: () => ipcRenderer.invoke("login:smoke"),
  onPacket: (cb) => ipcRenderer.on("game:packet", cb)
});
```

Renderer:

```ts
window.api.loginSmokeTest();
window.api.onPacket((data) => console.log(data));
```

---

# 🔐 6. l2js-client Integration (Essence Profile)

We use your updated Essence profile:

```
protocolVersion = 502
useGameEncryption = false
```

Electron main loads l2js-client:

```ts
import { GameClient, LoginClient } from "../l2-modules";
import { MobiusEssenceProfile } from "../l2/profiles/essence.ts";

const login = new LoginClient({ profile: MobiusEssenceProfile });
```

---

# 🚀 7. Phase 1 Deliverables

The goal of Phase 1 is **a fully functional login → game connect → enter world test**, displayed inside Electron with Babylon.js GUI.

### Backend (Electron Main)
✔ Initialize Electron  
✔ Set up IPC  
✔ Integrate l2js-client (Essence profile)  
✔ Implement login smoke test  
✔ Emit packets to renderer  

### Renderer (Vite + Babylon.js)
✔ Scene initialization  
✔ Simple GUI button  
✔ IPC call to trigger backend test  
✔ Log server packets  
✔ Render placeholder scene  

---

# 🧪 8. Phase 1 Login Smoke Test

IPC command:

```
ipcMain.handle("login:smoke", async () => {
   // 1. Connect login
   // 2. Send login
   // 3. Read server list
   // 4. Connect to game server
   // 5. Send AuthLogin
   // 6. Select first character
   // 7. EnterWorld
   return { success: true };
});
```

Renderer:

```
Login button → calls loginSmokeTest()
Logs stream → shows packet names
```

On success:
- You connect to both servers  
- You receive UserInfo  
- Babylon scene loads  
- Ready for Phase 2 (real UI & movement)

---

# 🧱 9. Phase 1 Checklist

### ✔ Electron main boots  
### ✔ Renderer boots (Babylon + Vite)  
### ✔ IPC bridge works  
### ✔ l2js-client (Essence) wired into main  
### ✔ Login smoke test runs successfully  
### ✔ Babylon renders test scene  
### ✔ Simple GUI triggers smoke test  
### ✔ Server packets are printed to screen  

---

# 🏁 10. After Phase 1

Phase 2 will include:

- Real charset UI  
- NPC/Player rendering  
- Movement sync  
- Inventory window  
- Chat window  
- Real world streaming  
- Event-driven rendering pipeline  

---

# ✅ End of Updated Phase 1 Plan  
This file fully replaces the old browser-based plan and aligns to the final architecture.
