import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class FindRoomCommand implements Command{

    private requestBody:object;

    constructor(requestBody:object){
        this.requestBody = requestBody;
    }
    
    execute(): object {
        return RoomReceiver.findByName(this.requestBody)
    }
}

export default FindRoomCommand;