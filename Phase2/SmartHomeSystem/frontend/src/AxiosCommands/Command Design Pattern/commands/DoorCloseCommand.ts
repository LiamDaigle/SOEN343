import DoorReceiver from "../receivers/DoorReceiver";
import Command from "./interface/Command";

class DoorCloseCommand implements Command{
        
        private requestBody:object;

        constructor(requestBody:object){
                this.requestBody = requestBody;
        }

        execute(): object {
                this.requestBody.open = false;
                return DoorReceiver.fullUpdate(this.requestBody);
        }
}
export default DoorCloseCommand;