import axios from "axios";

class WindowReceiver{

    private static baseUrl:string = "http://localhost:8080/api/windows";

    private constructor(){}

    static async fullUpdate(window:object){
        const id:number = window.id;
        const result = await axios.put(this.baseUrl + `/${id}`, window);
        return result;

    //Example of type window:
    //     {
    //         "id":0,
    //         "room": {
    //             "id": 0,
    //             "name": "Backyard"
    //         },
    //         "open": false
    // }
    //You make a window payload but omit the id, and put it into the id field in the parameters instead
    }
}

export default WindowReceiver;