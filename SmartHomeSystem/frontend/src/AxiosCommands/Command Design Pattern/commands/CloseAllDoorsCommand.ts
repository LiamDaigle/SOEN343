import HomeReceiver from "../receivers/HomeReceiver";
import Command from "./interface/Command";

class CloseAllDoorsCommand implements Command{
    
    execute(): object {
        return HomeReceiver.closeAllDoors()
    }
}

export default CloseAllDoorsCommand;