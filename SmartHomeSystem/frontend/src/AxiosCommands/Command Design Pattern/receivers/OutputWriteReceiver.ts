import axios from "axios";
import { timestamp } from "../../../Common/getTime";

class OutputWriteReceiver {

    private static profile = localStorage.getItem("selectedUserProfile");
    private static profileId;
    private static name;
    private static role;

    static async write(eventType:string, eventDescription:string){
        try {
            const json = this.profile !== null ? JSON.parse(this.profile) : {};
            this.profileId = json.id;
            this.name = json.name;
            this.role = json.role;
            console.log(this.profileId);
            const response = await axios.post(
              "http://localhost:8080/api/files/write",
              {
                data: `Timestamp: ${timestamp} \nProfile ID: ${this.profileId}\nProfile Name: ${this.name}\nRole: ${this.role}\nEvent Type: ${eventType}\nEvent Description: ${eventDescription} \nend`, // Convert the profile object to a string
              }
            );
            if (response.status !== 200) {
              throw new Error("Failed to write profile data to file");
            }
            console.log("Data written to file successfully");
          } catch (error) {
            console.error("Error writing data to file:", error);
          }
    }
}

export default OutputWriteReceiver;