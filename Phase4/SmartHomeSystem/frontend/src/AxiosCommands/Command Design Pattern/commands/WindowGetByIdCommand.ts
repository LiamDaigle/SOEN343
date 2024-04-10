import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowGetByIdCommand implements Command{
    
        private id:number;

        constructor(id:number){
                this.id = id;
        }

        execute(): object {
                return WindowReceiver.getById(this.id);
        }
}

export default WindowGetByIdCommand;