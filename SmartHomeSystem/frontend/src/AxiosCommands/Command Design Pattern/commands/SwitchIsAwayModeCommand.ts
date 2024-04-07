import HomeReceiver from "../receivers/HomeReceiver";
import Command from "./interface/Command";

class SwitchIsAwayModeCommand implements Command{

    constructor(){}
    
    execute(): object {
        return HomeReceiver.switchIsAwayMode()
    }
}

export default SwitchIsAwayModeCommand;