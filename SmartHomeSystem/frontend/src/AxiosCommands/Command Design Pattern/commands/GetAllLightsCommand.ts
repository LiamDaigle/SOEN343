import RoomReceiver from "../receivers/RoomReceiver";
import Command from "./interface/Command";

class GetAllLightsCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
        this.requestBody = requestBody;
    }

    execute(): object {
        return RoomReceiver.getAllLights(this.requestBody);
    }
}

export default GetAllLightsCommand;

        // {
        //     id:room_id,
        //     name:room_name
        // }