import axios from "axios";

class DoorReceiver{

    private static baseUrl:string = "http://localhost:8080/api/doors";
    
    private constructor(){}

    static async fullUpdate(door:object){
        const id:number = door.id;
        const result = await axios.put(this.baseUrl + `/${id}`, door);
        return result;
    }

    static async getById(id:number){
        const result = await axios.get(this.baseUrl + `/${id}`)
        return result;
    }
}

export default DoorReceiver;