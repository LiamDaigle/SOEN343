import ZoneReceiver from "../receivers/ZoneReceiver";
import Command from "./interface/Command";

class ZoneUpdateHvacCommand implements Command{
    
    private zoneId:number;
    private hvac:boolean;
        constructor(zoneId:number, hvac:boolean){
            this.zoneId = zoneId;
            this.hvac = hvac;
        }

        execute(): object {
                return ZoneReceiver.updateHvac(this.zoneId, this.hvac);
        }
}

export default ZoneUpdateHvacCommand;