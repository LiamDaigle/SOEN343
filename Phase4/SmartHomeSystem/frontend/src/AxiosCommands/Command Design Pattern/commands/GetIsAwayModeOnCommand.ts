import HomeReceiver from "../receivers/HomeReceiver";
import Command from "./interface/Command";

class GetIsAwayModeOnCommand implements Command{

    constructor(){}
    
    execute(): object {
        return HomeReceiver.getIsAwayModeOn()
    }
}

export default GetIsAwayModeOnCommand;