import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowOpenCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
            this.requestBody = requestBody;
    }

    execute(): object {
            this.requestBody.open = true;
            return WindowReceiver.fullUpdate(this.requestBody);
    }
}

export default WindowOpenCommand;