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
}

export default HomeReceiver;