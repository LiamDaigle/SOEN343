import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class GetAllWindowsCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
        this.requestBody = requestBody;
    }

    execute(): object {
        return RoomReceiver.getAllWindows(this.requestBody);
    }
}

export default GetAllWindowsCommand;