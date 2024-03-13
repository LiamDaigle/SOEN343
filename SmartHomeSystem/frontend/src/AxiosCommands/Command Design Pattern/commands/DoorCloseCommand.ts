import DoorReceiver from "../receivers/DoorReceiver";

class DoorCloseCommand implements Command{
        
        private requestBody:object;

        constructor(requestBody:object){
                this.requestBody = requestBody;
        }

        execute(): object {
                this.requestBody.open = false;
                return DoorReceiver.fullUpdate(this.requestBody);
        }
}

        //example of type door:
        // {
        //     "id": 0,        
        //     "room": {
        //         "id": 0,
        //         "name": "Backyard"
        //     },
        //     "open": true,
        //     "autoLock": false
        // }
        //You basically just make a door payload, but omit the id in the body and instead put it into the id field for the method
export default DoorCloseCommand;