import EventEmitter from "events";
import type { Event } from "../../src/mmocore/EventEmitter";
import MMOConfig from "../../src/mmocore/MMOConfig";
import Client from "../../src/Client";
import type { LoginSmokeTestResult, PacketFeedEvent } from "@shared/types";
import type { L2ClientProfile } from "./profiles/essence";

export interface ClientCredentials {
  username: string;
  password: string;
}

export interface L2ClientManagerOptions {
  profile: L2ClientProfile;
  credentials: ClientCredentials;
  serverId?: number;
  charSlot?: number;
  loginHostOverride?: string;
  loginPortOverride?: number;
}

export class L2ClientManager extends EventEmitter {
  private client: Client;
  private busy = false;

  constructor(private readonly options: L2ClientManagerOptions) {
    super();
    this.client = new Client();
    this.forwardPackets();
  }

  updateCredentials(credentials: Partial<ClientCredentials>): void {
    this.options.credentials = { ...this.options.credentials, ...credentials } as ClientCredentials;
  }

  private forwardPackets(): void {
    const forwarder = (scope: PacketFeedEvent["scope"]) => (event: Event) => {
      if (!event.type.startsWith("PacketReceived")) {
        return;
      }

      const packetName = event.data?.packet?.constructor?.name;
      const payload: PacketFeedEvent = {
        scope,
        type: event.type,
        packetName,
        timestamp: Date.now(),
      };

      this.emit("packet", payload);
    };

    this.client.LoginClient.onAll(forwarder("login"));
    this.client.GameClient.onAll(forwarder("game"));
  }

  private buildConfig(): MMOConfig {
    const config = new MMOConfig();
    const { profile, credentials } = this.options;
    config.Username = credentials.username;
    config.Password = credentials.password;
    config.ServerId = this.options.serverId ?? config.ServerId;
    config.CharSlotIndex = this.options.charSlot ?? config.CharSlotIndex;
    config.Ip = this.options.loginHostOverride ?? profile.loginHost;
    config.Port = this.options.loginPortOverride ?? profile.loginPort;
    config.ProtocolVersion = profile.protocolVersion;
    config.UseGameEncryption = profile.useGameEncryption;
    return config;
  }

  async loginSmokeTest(): Promise<LoginSmokeTestResult> {
    if (!this.options.credentials.username || !this.options.credentials.password) {
      return {
        success: false,
        message: "Missing L2_USERNAME/L2_PASSWORD credentials.",
      };
    }

    if (this.busy) {
      return {
        success: false,
        message: "A connection attempt is already running.",
      };
    }

    this.busy = true;
    try {
      await this.client.enter(this.buildConfig());
      return {
        success: true,
        message: `Connected to ${this.options.profile.name}.`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : `${error}`;
      return {
        success: false,
        message,
      };
    } finally {
      this.busy = false;
    }
  }
}
