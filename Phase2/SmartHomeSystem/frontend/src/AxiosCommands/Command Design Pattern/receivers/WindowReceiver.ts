import axios from "axios";

class WindowReceiver{

    private static baseUrl:string = "http://localhost:8080/api/windows";

    private constructor(){}

    static async fullUpdate(window:object){
        const id:number = window.id;
        const result = await axios.put(this.baseUrl + `/${id}`, window);
        return result;
    }
}

export default WindowReceiver;