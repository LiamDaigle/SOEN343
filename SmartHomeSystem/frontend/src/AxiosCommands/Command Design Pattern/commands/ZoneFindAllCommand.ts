import ZoneReceiver from "../receivers/ZoneReceiver";
import Command from "./interface/Command";

class ZoneFindAllCommand implements Command{
    
        constructor(){}

        execute(): object {
                return ZoneReceiver.findAll();
        }
}

export default ZoneFindAllCommand;