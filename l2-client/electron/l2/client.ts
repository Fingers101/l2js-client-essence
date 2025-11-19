import EventEmitter from "events";
import Client from "../../../src/Client";
import MMOConfig from "../../../src/mmocore/MMOConfig";
import type { EssenceConnectionConfig, PacketEventPayload } from "../../shared/types";
import { EssenceProfile } from "./profiles/essence";

const DEFAULT_CONFIG: Required<EssenceConnectionConfig> = {
  username: process.env.L2_USERNAME ?? "admin",
  password: process.env.L2_PASSWORD ?? "admin",
  loginHost: process.env.L2_HOST ?? "127.0.0.1",
  loginPort: Number(process.env.L2_PORT ?? 2106),
  serverId: Number(process.env.L2_SERVER_ID ?? 1),
  characterSlot: Number(process.env.L2_CHAR_SLOT ?? 0),
};

export class EssenceClient extends EventEmitter {
  private readonly l2 = new Client();

  constructor() {
    super();
    this.bootstrapPacketStream();
  }

  private bootstrapPacketStream(): void {
    this.l2.GameClient.onAll((event) => {
      if (!event.type.startsWith("PacketReceived:")) {
        return;
      }
      const payload: PacketEventPayload = {
        name: event.type.replace("PacketReceived:", ""),
        timestamp: Date.now(),
        payload: this.serializePacket(event.data?.packet ?? {}),
      };
      this.emit("packet", payload);
    });
  }

  private serializePacket(packet: Record<string, unknown>): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    Object.keys(packet).forEach((key) => {
      const value = (packet as any)[key];
      if (typeof value === "function") {
        return;
      }
      if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
        return;
      }
      json[key] = value;
    });
    return json;
  }

  async loginSmokeTest(config?: EssenceConnectionConfig): Promise<void> {
    const merged = { ...DEFAULT_CONFIG, ...config };
    if (!merged.username || !merged.password) {
      throw new Error("Username and password are required");
    }

    const clientConfig = new MMOConfig();
    clientConfig.Username = merged.username;
    clientConfig.Password = merged.password;
    clientConfig.Ip = merged.loginHost;
    clientConfig.Port = merged.loginPort;
    clientConfig.ServerId = merged.serverId;
    clientConfig.CharSlotIndex = merged.characterSlot;
    clientConfig.ProtocolVersion = EssenceProfile.protocolVersion;
    clientConfig.UseGameEncryption = EssenceProfile.useGameEncryption;

    await this.l2.enter(clientConfig);
  }
}
