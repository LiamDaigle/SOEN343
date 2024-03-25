import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowBlockCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
            this.requestBody = requestBody;
    }

    execute(): object {
            this.requestBody.block = true;
            return WindowReceiver.fullUpdate(this.requestBody);
    }
}

export default WindowBlockCommand;