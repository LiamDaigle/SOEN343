import LightReceiver from "../receivers/LightReceiver";
import Command from "./interface/Command";

class LightGetByIdCommand implements Command{
    
        private id:number;

        constructor(id:number){
                this.id = id;
        }

        execute(): object {
                return LightReceiver.getById(this.id);
        }
}

export default LightGetByIdCommand;