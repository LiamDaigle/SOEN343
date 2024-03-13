import axios from "axios";

class WindowCommands{

    private static baseUrl:string = "http://localhost:8080/api/windows";

    private constructor(){}

    static async fullUpdate(id:number, window:object){
        const result = await axios.put(this.baseUrl + `/${id}`, window);
        return result;
    }
}

export default WindowCommands;