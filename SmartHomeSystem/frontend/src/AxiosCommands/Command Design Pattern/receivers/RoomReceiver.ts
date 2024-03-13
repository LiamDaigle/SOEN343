import axios from "axios";

class RoomReceiver{

    private static baseUrl:string = "http://localhost:8080/api/rooms";

    private constructor(){}

    static async findByName(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findByName", requestBody);
        return result.data;
        // {
        //     name:"Backyard"
        // }
    }

    static async getAllDoors(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findAllDoors", requestBody);
        return result.data;
        // {
        //     id:room_id,
        //     name:room_name
        // }
        //ex:
        // {
        //     id:0,
        //     name:"Backyard"
        // }
    }
    static async getAllLights(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findAllLights", requestBody);
        return result.data;
        // {
        //     id:room_id,
        //     name:room_name
        // }
        
    }
    static async getAllWindows(requestBody:object){
        const result = await axios.post(this.baseUrl + "/findAllWindows", requestBody);
        return result.data;
        // {
        //     id:room_id,
        //     name:room_name
        // }
    }
}

export default RoomReceiver;