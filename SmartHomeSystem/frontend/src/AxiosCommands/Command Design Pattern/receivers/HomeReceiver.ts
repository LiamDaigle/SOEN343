import axios from "axios";

class HomeReceiver{

    private static baseUrl:string = "http://localhost:8080/api/home";

    private constructor(){}

    static async getIsAwayModeOn(){
        const result = await axios.get(this.baseUrl + `/getIsAway`);
        return result;
    }

    static async switchIsAwayMode(){
        const result = await axios.post(this.baseUrl + `/switchIsAway`);
        return result;
    }

    static async setTime(time:number){
        const result = await axios.post(this.baseUrl + "/setTime", JSON.stringify(time), {
            headers:{
                "content-type": "application/json",
            }
        });
        return result;
    }
}

export default HomeReceiver;