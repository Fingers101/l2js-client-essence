import AbstractGameCommand from "./AbstractGameCommand";
import MoveBackwardToLocation from "../network/outgoing/game/MoveBackwardToLocation";
import ValidatePosition from "../network/outgoing/game/ValidatePosition";
import MoveToLocationEssence from "../network/outgoing/game/essence/MoveToLocationEssence";

export default class CommandMoveTo extends AbstractGameCommand {
  execute(x: number, y: number, z: number): void {
    const char = this.GameClient?.ActiveChar;

    if (char) {
      const MovePacket = this.isMobiusEssence ? MoveToLocationEssence : MoveBackwardToLocation;
      this.GameClient?.sendPacket(new MovePacket(x, y, z, char.X, char.Y, char.Z));

      this.GameClient?.sendPacket(
        new ValidatePosition(char.X, char.Y, char.Z, char.Heading, 0)
      );
    }
  }
}
