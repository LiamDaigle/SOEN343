import axios from "axios";

class LightReceiver{

    private static baseUrl:string = "http://localhost:8080/api/lights";

    private constructor(){}

    static async fullUpdate(light:object){
        const id:number = light.id;
        const result = await axios.put(this.baseUrl + `/${id}`, light);
        return result;
    }
}

export default LightReceiver;