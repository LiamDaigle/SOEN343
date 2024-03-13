import axios from "axios";

class DoorCommands{

    private static baseUrl:string = "http://localhost:8080/api/doors";
    
    private constructor(){}

    static async fullUpdate(id:number, door:object){
        const result = await axios.put(this.baseUrl + `/${id}`, door);
        return result;
    }
}

export default DoorCommands;