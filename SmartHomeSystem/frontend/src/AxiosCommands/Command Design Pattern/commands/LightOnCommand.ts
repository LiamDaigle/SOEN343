import LightReceiver from "../receivers/LightReceiver";

class LightOnCommand implements Command{
    
        private requestBody:object;

        constructor(requestBody:object){
                this.requestBody = requestBody;
        }

        execute(): object {
                this.requestBody.on = true;
                return LightReceiver.fullUpdate(this.requestBody);
        }
}

export default LightOnCommand;

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