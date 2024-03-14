import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class GetAllDoorsCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
        this.requestBody = requestBody;
    }

    execute(): object {
        return RoomReceiver.getAllDoors(this.requestBody);
    }
}

export default GetAllDoorsCommand;