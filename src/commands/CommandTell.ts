import AbstractGameCommand from "./AbstractGameCommand";
import Say2 from "../network/outgoing/game/Say2";
import Say2Essence from "../network/outgoing/game/essence/Say2Essence";

export default class CommandTell extends AbstractGameCommand {
  execute(text: string, target: string): void {
    const SayPacket = this.isMobiusEssence ? Say2Essence : Say2;
    this.GameClient?.sendPacket(new SayPacket(SayPacket.TELL, text, target));
  }
}
