# Lineage 2 Essence Electron Client (Phase 1)

This folder contains an Electron + Babylon.js starter client that follows the updated Phase 1 architecture described in `l2_client_phase1_plan_UPDATED.md`.

## Highlights

- **Electron main process** bootstraps the desktop shell, exposes IPC endpoints, and integrates the `l2js-client` login/game stack.
- **Renderer (Vite + TypeScript + Babylon.js)** renders a placeholder scene plus a simple GUI that triggers a login smoke test via IPC.
- **Shared IPC types** live under `shared/` to keep the contract in sync.

## Getting Started

1. Install dependencies inside this folder:

   ```bash
   cd l2-client
   npm install
   ```

2. Start the development environment (launches Vite + Electron with ts-node):

   ```bash
   npm run dev
   ```

3. Configure credentials using environment variables if needed:

   - `L2_USERNAME`, `L2_PASSWORD`
   - `L2_HOST`, `L2_PORT`
   - `L2_SERVER_ID`, `L2_CHAR_SLOT`

4. Click the **Login Smoke Test** button in the renderer window to initiate the multi-step login→game connection. Packet names streamed from the Node layer are displayed in the on-screen log.

## Building the Renderer

To generate the static renderer bundle:

```bash
npm run renderer:build
```

This produces `renderer/dist`, which the main process loads when `NODE_ENV=production`.

## Notes

- The Electron process uses the Essence profile defaults (`protocolVersion=502`, `useGameEncryption=false`).
- IPC handlers live under `electron/ipc`. Extend this folder to add more commands (movement, chat, etc.).
- Renderer Babylon scene lives in `renderer/src/babylon/scene.ts` and can be evolved into a fully fledged 3D world.
