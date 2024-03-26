import ZoneReceiver from "../receivers/ZoneReceiver";
import Command from "./interface/Command";

class ZoneUpdateDesiredTemperatureCommand implements Command{
    
    private zoneId:number;
    private desiredTemperature:number;
        constructor(zoneId:number, desiredTemperature:number){
            this.zoneId = zoneId;
            this.desiredTemperature = desiredTemperature;
        }

        execute(): object {
                return ZoneReceiver.updateDesiredTemperature(this.zoneId, this.desiredTemperature);
        }
}

export default ZoneUpdateDesiredTemperatureCommand;