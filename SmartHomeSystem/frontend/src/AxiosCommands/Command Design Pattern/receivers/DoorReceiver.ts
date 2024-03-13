import axios from "axios";

class DoorReceiver{

    private static baseUrl:string = "http://localhost:8080/api/doors";
    
    private constructor(){}

    static async fullUpdate(door:object){
        const id:number = door.id;
        const result = await axios.put(this.baseUrl + `/${id}`, door);
        return result;

        //example of type door:
        // {
        //     "room": {
        //         "id": 0,
        //         "name": "Backyard"
        //     },
        //     "open": true,
        //     "autoLock": false
        // }
        //You basically just make a door payload, but omit the id in the body and instead put it into the id field for the method
    }
}

export default DoorReceiver;