import WindowReceiver from "../receivers/WindowReceiver";
import Command from "./interface/Command";

class WindowCloseCommand implements Command{
    
    private requestBody:object;

    constructor(requestBody:object){
            this.requestBody = requestBody;
    }

    execute(): object {
            this.requestBody.open = false;
            return WindowReceiver.fullUpdate(this.requestBody);
    }
}

export default WindowCloseCommand;

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