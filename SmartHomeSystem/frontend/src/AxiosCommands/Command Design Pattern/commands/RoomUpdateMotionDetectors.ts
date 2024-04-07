import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class RoomUpdateMotionDetectorsCommand implements Command{
        private roomId;
        private hasMotionDetectors;

        constructor(roomId: number, hasMotionDetectors: boolean){
            this.roomId = roomId;
            this.hasMotionDetectors = hasMotionDetectors;
        }

        execute(): object {
                return RoomReceiver.updateMotionDetectors(this.roomId, this.hasMotionDetectors);
        }
}

export default RoomUpdateMotionDetectorsCommand;