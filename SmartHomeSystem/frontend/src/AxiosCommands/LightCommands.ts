import axios from "axios";

class LightCommands{

    private static baseUrl:string = "http://localhost:8080/api/lights";

    private constructor(){}

    static async fullUpdate(id:number, light:object){
        const result = await axios.put(this.baseUrl + `/${id}`, light);
        return result;
    }
}

export default LightCommands;