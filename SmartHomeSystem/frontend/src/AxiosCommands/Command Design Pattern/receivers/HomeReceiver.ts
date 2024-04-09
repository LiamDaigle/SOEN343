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

    static async closeAllWindows() {
        try {
            const windowsResponse = await axios.get(`${this.baseUrl}/windows/findAll`);
            const windows = windowsResponse;
            for (const window of windows) {
                if (window.open) {
                    await axios.patch(`${this.baseUrl}/windows/${window.id}`, { open: false });
                }
            }
            return "All windows closed successfully";
        } catch (error) {
            console.error('Error closing all windows:', error);
            throw error;
        }
    }

    static async closeAllDoors() {
        try {
            const doorsResponse = await axios.get(`${this.baseUrl}/doors/findAll`);
            const doors = doorsResponse;
            for (const door of doors) {
                if (door.open) {
                    await axios.patch(`${this.baseUrl}/doors/${door.id}`, { open: false });
                }
            }
            return "All doors closed successfully";
        } catch (error) {
            console.error('Error closing all doors:', error);
            throw error;
        }
    }
    
}

export default HomeReceiver;