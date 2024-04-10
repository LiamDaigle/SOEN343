import axios from "axios";

class WindowReceiver{

    private static baseUrl:string = "http://localhost:8080/api/windows";

    private constructor(){}

    static async fullUpdate(window:object){
        const id:number = window.id;
        const result = await axios.put(this.baseUrl + `/${id}`, window);
        return result;
    }

    static async updateBlocked(id:number, blocked:boolean){
        const result = await axios.patch(this.baseUrl + `/${id}/blocked`, JSON.stringify(blocked),{
            headers: {
                "content-type": "application/json",
            }
        })
        return result.data;
    }

    static async getById(id:number){
        const result = await axios.get(this.baseUrl + `/${id}`)
        return result;
    }
}

export default WindowReceiver;