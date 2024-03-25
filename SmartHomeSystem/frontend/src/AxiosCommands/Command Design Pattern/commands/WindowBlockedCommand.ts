import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowBlockedCommand implements Command{
    
    private id:number;
    private isBlocked:boolean;

    constructor(id:number, isBlocked:boolean){
        this.id = id;
        this.isBlocked = isBlocked;
    }

    execute(): object {
            return WindowReceiver.updateBlocked(this.id, this.isBlocked);
    }
}

export default WindowBlockedCommand;