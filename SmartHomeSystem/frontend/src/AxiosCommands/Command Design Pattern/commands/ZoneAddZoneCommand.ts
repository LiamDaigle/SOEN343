import ZoneReceiver from "../receivers/ZoneReceiver";
import Command from "./interface/Command";

class ZoneAddZoneCommand implements Command{

    private requestBody:object;
    
        constructor(requestBody:object){
            this.requestBody = requestBody;
        }

        execute(): object {
                return ZoneReceiver.addZone(this.requestBody);
        }
}

export default ZoneAddZoneCommand;