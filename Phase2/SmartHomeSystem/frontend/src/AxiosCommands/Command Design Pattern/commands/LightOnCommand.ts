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