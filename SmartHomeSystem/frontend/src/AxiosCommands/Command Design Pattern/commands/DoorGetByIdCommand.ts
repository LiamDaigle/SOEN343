import DoorReceiver from "../receivers/DoorReceiver";
import Command from "./interface/Command";

class DoorGetByIdCommand implements Command{
    
        private id:number;

        constructor(id:number){
                this.id = id;
        }

        execute(): object {
                return DoorReceiver.getById(this.id);
        }
}

export default DoorGetByIdCommand;