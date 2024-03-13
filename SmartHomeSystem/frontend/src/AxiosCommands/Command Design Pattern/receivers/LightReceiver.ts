import axios from "axios";

class LightReceiver{

    private static baseUrl:string = "http://localhost:8080/api/lights";

    private constructor(){}

    static async fullUpdate(light:object){
        const id:number = light.id;
        const result = await axios.put(this.baseUrl + `/${id}`, light);
        return result;

        //Example of light object:
        // {
        //     "room": {
        //         "id": 0,
        //         "name": "Backyard"
        //     },
        //     "on": true
        // }
        //Create a light payload, omit the id and put it in the id field for the parameters
    }
}

export default LightReceiver;