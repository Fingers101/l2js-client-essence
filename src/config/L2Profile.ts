export interface L2Profile {
  name: string;
  protocolVersion: number;
  useGameEncryption: boolean;
}

export const ClassicProfile: L2Profile = {
  name: "classic",
  protocolVersion: 273,
  useGameEncryption: true,
};

export const MobiusEssenceProfile: L2Profile = {
  name: "mobius-essence-8.3",
  protocolVersion: 502,
  useGameEncryption: false,
};
