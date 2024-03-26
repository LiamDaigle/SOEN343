import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class RoomUpdateHvacCommand implements Command{
        private roomId;
        private hvac;

        constructor(roomId: number, hvac: boolean){
            this.roomId = roomId;
            this.hvac = hvac;
        }

        execute(): object {
                return RoomReceiver.updateHvac(this.roomId, this.hvac);
        }
}

export default RoomUpdateHvacCommand;