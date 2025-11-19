export interface L2ClientProfile {
  name: string;
  loginHost: string;
  loginPort: number;
  protocolVersion: number;
  useGameEncryption: boolean;
}

export const MobiusEssenceProfile: L2ClientProfile = {
  name: "L2J Mobius Essence 8.3",
  loginHost: "127.0.0.1",
  loginPort: 2106,
  protocolVersion: 502,
  useGameEncryption: false,
};
