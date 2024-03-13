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

        //Example of light object:
        // {
        //     "id": 0,
        //     "room": {
        //         "id": 0,
        //         "name": "Backyard"
        //     },
        //     "on": true
        // }
        //Create a light payload, omit the id and put it in the id field for the parameters