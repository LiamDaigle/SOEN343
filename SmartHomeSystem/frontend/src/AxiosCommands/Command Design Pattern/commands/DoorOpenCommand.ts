import DoorReceiver from "../receivers/DoorReceiver";
import Command from "./interface/Command";

class DoorOpenCommand implements Command{

        private requestBody:object;

        constructor(requestBody:object){
                this.requestBody = requestBody;
        }

        execute(): object {
                this.requestBody.open = true;
                return DoorReceiver.fullUpdate(this.requestBody);
        }
    
}

export default DoorOpenCommand;