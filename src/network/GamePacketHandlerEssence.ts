import IPacketHandler from "../mmocore/IPacketHandler";
import Logger from "../mmocore/Logger";
import ReceivablePacket from "../mmocore/ReceivablePacket";
import GameClient from "./GameClient";
import GamePacketHandlerClassic from "./GamePacketHandlerClassic";
import {
  CharSelectionInfoEssence,
  CharSelectedEssence,
  CreatureSayEssence,
  ItemListEssence,
  MoveToLocationEssence,
  NpcInfoEssence,
  StatusUpdateEssence,
  UserInfoEssence,
} from "./incoming/game/essence";

export default class GamePacketHandlerEssence implements IPacketHandler<GameClient> {
  protected logger: Logger = Logger.getLogger(this.constructor.name);
  private readonly classicHandler = new GamePacketHandlerClassic();

  handlePacket(data: Uint8Array, client: GameClient): ReceivablePacket {
    const opcode: number = data[0] & 0xff;

    let rpk: ReceivablePacket | undefined;

    try {
      switch (opcode) {
        case 0x09:
          rpk = new CharSelectionInfoEssence();
          break;
        case 0x0b:
          rpk = new CharSelectedEssence();
          break;
        case 0x0c:
          rpk = new NpcInfoEssence();
          break;
        case 0x11:
          rpk = new ItemListEssence();
          break;
        case 0x18:
          rpk = new StatusUpdateEssence();
          break;
        case 0x2f:
          rpk = new MoveToLocationEssence();
          break;
        case 0x32:
          rpk = new UserInfoEssence();
          break;
        case 0x4a:
          rpk = new CreatureSayEssence();
          break;
      }
    } catch (error) {
      this.logger.error(error);
    }

    if (!rpk) {
      return this.classicHandler.handlePacket(data, client);
    }

    return rpk;
  }
}
