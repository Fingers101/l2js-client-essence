export interface MobiusEssenceProfile {
  protocolVersion: number;
  useGameEncryption: boolean;
}

export const EssenceProfile: MobiusEssenceProfile = {
  protocolVersion: 502,
  useGameEncryption: false,
};
