export interface EssenceConnectionConfig {
  username?: string;
  password?: string;
  loginHost?: string;
  loginPort?: number;
  serverId?: number;
  characterSlot?: number;
}

export interface LoginSmokeTestResponse {
  success: boolean;
  message?: string;
}

export interface PacketEventPayload {
  name: string;
  timestamp: number;
  payload: Record<string, unknown>;
}

export interface RendererAPI {
  loginSmokeTest: () => Promise<LoginSmokeTestResponse>;
  onPacket: (listener: (packet: PacketEventPayload) => void) => () => void;
}
