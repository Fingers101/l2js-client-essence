export type PacketScope = "login" | "game";

export interface PacketFeedEvent {
  scope: PacketScope;
  type: string;
  packetName?: string;
  timestamp: number;
}

export interface LoginSmokeTestResult {
  success: boolean;
  message?: string;
}

export interface RendererApi {
  loginSmokeTest: () => Promise<LoginSmokeTestResult>;
  onPacket: (callback: (event: PacketFeedEvent) => void) => () => void;
}
