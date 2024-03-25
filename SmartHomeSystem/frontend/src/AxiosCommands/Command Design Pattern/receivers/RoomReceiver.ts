import axios from "axios";

class RoomReceiver{

    private static baseUrl:string = "http://localhost:8080/api/rooms";

    private constructor(){}

    static async findAll(){
        const result = await axios.get(this.baseUrl + "/findAll");
        return result.data;
    }

    static async findByName(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findByName", requestBody);
        return result.data;
    }

    static async getAllDoors(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findAllDoors", requestBody);
        return result.data;
    }
    static async getAllLights(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findAllLights", requestBody);
        return result.data;
    }
    static async getAllWindows(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findAllWindows", requestBody);
        return result.data;
    }

    static async updateHvac(roomId:number, hvac: boolean){
        const result = await axios.patch(this.baseUrl + `/${roomId}/hvac`, JSON.stringify(hvac), {
            headers: {
                "content-type": "application/json",
            }
        });
        return result.data;
    }
}

export default RoomReceiver;