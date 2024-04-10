import axios from "axios";

class ZoneReceiver{

    private static baseUrl:string = "http://localhost:8080/api/zones";

    private constructor(){}

    static async findAll(){
        const result = await axios.get(this.baseUrl + "/findAll");
        return result.data;
    }

    static async addZone(requestBody:object){
        const result = await axios.post(this.baseUrl + "/addZone", requestBody)
        return result.data;
    }

    static async updateTemperature(zoneId:number, temperature:number){
        const result = await axios.patch(this.baseUrl + `/${zoneId}/temperature`, JSON.stringify(temperature), {
            headers: {
                "content-type": "application/json",
            }
        })
        return result.data;
    }

    static async updateDesiredTemperature(zoneId:number, desiredTemperature:number){
        const result = await axios.patch(this.baseUrl + `/${zoneId}/desiredTemperature`, JSON.stringify(desiredTemperature),{
            headers: {
                "content-type": "application/json",
            }
        })
        return result.data;
    }

    static async updateHvac(zoneId:number, hvac:boolean){
        const result = await axios.patch(this.baseUrl + `/${zoneId}/hvac`, JSON.stringify(hvac), {
            headers: {
                "content-type": "application/json",
            }
        })
        return result.data;
    }
}

export default ZoneReceiver;