import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowCloseCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
            this.requestBody = requestBody;
    }

    execute(): object {
            this.requestBody.open = false;
            return WindowReceiver.fullUpdate(this.requestBody);
    }
}

export default WindowCloseCommand;