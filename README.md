# Lineage 2 JavaScript Client

This project was made while experimenting with TypeScript and es6. The idea is to have an NCSoft Lineage 2 client library, that allows other projects to build L2 client functionalities (like bots, game helpers, etc.) on top of it. It can be also used as a framework for building Lineage2 automated tests for L2 private servers.

[🕮 🇺🇸 Documentation in English](https://npetrovski.github.io/l2js-client/)

[🕮 🇷🇺 Документация на Русском](https://npetrovski.github.io/l2js-client/ru/)

## Documentation

The [l2js-client documentation](https://npetrovski.github.io/l2js-client/) are loaded with awesome stuff and tell you every thing you need to know about using and configuring l2js-client.

## Electron + Babylon.js starter client

The repository now contains a native starter client that follows the architecture described in `l2_client_phase1_plan_UPDATED.md`:

- `electron/` hosts the Electron main process, IPC handlers, preload bridge and the `L2ClientManager` wrapper around this library.
- `renderer/` is a Vite + TypeScript workspace that boots a Babylon.js scene and simple UI overlay.
- `shared/types.ts` centralises IPC contracts that are consumed by both processes.

### Configure credentials

1. Copy `.env.example` to `.env`.
2. Provide `L2_USERNAME`, `L2_PASSWORD` and, if needed, override the login host, port, server id or character slot.

### Run the starter client

```bash
npm install
npm run client:dev
```

The command launches the Vite renderer dev server and an Electron window that exposes a Babylon scene, a "Login Smoke Test" button and live packet logs sourced from the embedded `l2js-client` instance configured for the Mobius Essence protocol (502) without game encryption.
