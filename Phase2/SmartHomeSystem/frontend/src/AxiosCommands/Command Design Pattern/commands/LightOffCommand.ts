import LightReceiver from "../receivers/LightReceiver";
import Command from "./interface/Command";

class LightOffCommand implements Command{
    
        private requestBody:object;

        constructor(requestBody:object){
                this.requestBody = requestBody;
        }

        execute(): object {
                this.requestBody.on = false;
                return LightReceiver.fullUpdate(this.requestBody);
        }
}

export default LightOffCommand;