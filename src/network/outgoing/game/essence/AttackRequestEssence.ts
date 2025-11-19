import GameServerPacket from "../GameServerPacket";

export default class AttackRequestEssence extends GameServerPacket {
  private _shift = false;

  constructor(
    private readonly objectId: number,
    private readonly originX: number,
    private readonly originY: number,
    private readonly originZ: number,
    shift?: boolean
  ) {
    super();
    if (shift) {
      this._shift = shift;
    }
  }

  write(): void {
    this.writeC(0x32);
    this.writeD(this.objectId);
    this.writeD(this.originX);
    this.writeD(this.originY);
    this.writeD(this.originZ);
    this.writeC(this._shift ? 1 : 0);
  }
}
