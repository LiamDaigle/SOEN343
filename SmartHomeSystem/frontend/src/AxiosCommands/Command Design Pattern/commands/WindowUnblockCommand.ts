import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowUnblockCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
            this.requestBody = requestBody;
    }

    execute(): object {
            this.requestBody.blocked = false;
            return WindowReceiver.fullUpdate(this.requestBody);
    }
}

export default WindowUnblockCommand;