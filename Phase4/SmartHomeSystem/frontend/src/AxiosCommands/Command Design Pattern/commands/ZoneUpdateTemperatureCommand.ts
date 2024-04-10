import ZoneReceiver from "../receivers/ZoneReceiver";
import Command from "./interface/Command";

class ZoneUpdateTemperatureCommand implements Command{
    
    private zoneId:number;
    private temperature:number;
        constructor(zoneId:number, temperature:number){
            this.zoneId = zoneId;
            this.temperature = temperature;
        }

        execute(): object {
                return ZoneReceiver.updateTemperature(this.zoneId, this.temperature);
        }
}

export default ZoneUpdateTemperatureCommand;