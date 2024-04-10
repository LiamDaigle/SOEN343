import HomeReceiver from "../receivers/HomeReceiver";
import Command from "./interface/Command";

class HomeSetTimeCommand implements Command{

    private time:number;

    constructor(time:number){
        this.time = time;
    }
    
    execute(): object {
        return HomeReceiver.setTime(this.time)
    }
}

export default HomeSetTimeCommand;