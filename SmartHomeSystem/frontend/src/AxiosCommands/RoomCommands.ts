import axios from "axios";

class RoomCommands{

    private static baseUrl:string = "http://localhost:8080/api/rooms";

    private constructor(){}

    static async findByName(room_name:string){
        const result = await axios.post(this.baseUrl + "/findByName",
        {
            name:room_name
        }
        );
        return result.data;
    }

    static async getAllDoors(room_id:number, room_name:string){
        const result = await axios.post(this.baseUrl + "/findAllDoors",
        {
            id:room_id,
            name:room_name
        }
        );
        return result.data;
    }
    static async getAllLights(room_id:number, room_name:string){
        const result = await axios.post(this.baseUrl + "/findAllLights",
        {
            id:room_id,
            name:room_name
        }
        );
        return result.data;
    }
    static async getAllWindows(room_id:number, room_name:string){
        const result = await axios.post(this.baseUrl + "/findAllWindows",
        {
            id:room_id,
            name:room_name
        }
        );
        return result.data;
    }
}

export default RoomCommands;