import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class RoomFindAllCommand implements Command{
    
        constructor(){}

        execute(): object {
                return RoomReceiver.findAll();
        }
}

export default RoomFindAllCommand;