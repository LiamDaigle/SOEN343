import HomeReceiver from "../receivers/HomeReceiver";
import Command from "./interface/Command";

class CloseAllWindowsCommand implements Command{
    
    execute(): object {
        return HomeReceiver.closeAllWindows()
    }
}

export default CloseAllWindowsCommand;