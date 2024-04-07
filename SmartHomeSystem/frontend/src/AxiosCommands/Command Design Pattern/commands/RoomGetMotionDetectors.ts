import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class RoomGetMotionDetectorsCommand implements Command{
        private roomId;

        constructor(roomId: number){
            this.roomId = roomId;
        }

        execute(): object {
                return RoomReceiver.getMotionDetectors(this.roomId);
        }
}

export default RoomGetMotionDetectorsCommand;