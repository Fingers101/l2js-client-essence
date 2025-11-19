# Lineage 2 JavaScript Client

This project was made while experimenting with TypeScript and es6. The idea is to have an NCSoft Lineage 2 client library, that allows other projects to build L2 client functionalities (like bots, game helpers, etc.) on top of it. It can be also used as a framework for building Lineage2 automated tests for L2 private servers.

[🕮 🇺🇸 Documentation in English](https://npetrovski.github.io/l2js-client/)

[🕮 🇷🇺 Документация на Русском](https://npetrovski.github.io/l2js-client/ru/)

## Documentation

The [l2js-client documentation](https://npetrovski.github.io/l2js-client/) are loaded with awesome stuff and tell you every thing you need to know about using and configuring l2js-client.

## Essence Desktop Client (Phase 1)

The repository now includes an Electron + Babylon.js starter client aligned with the `l2_client_phase1_plan_UPDATED.md` architecture. You can find the source under [`l2-client/`](./l2-client) with dedicated Electron (main), Vite/Babylon (renderer), and shared IPC layers. Follow the [l2-client README](./l2-client/README.md) for setup instructions and the login smoke-test workflow.
