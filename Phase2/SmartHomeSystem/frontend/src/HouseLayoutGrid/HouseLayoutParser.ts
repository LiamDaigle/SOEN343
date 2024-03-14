export abstract class HouseLayoutParser{

    private static layout:string[][] = [[]];
    private static rooms:object = {};
    
    constructor(){}

    public static parseJSON(json):void{
        this.rooms = {}
        for(const key in json){
            if(key === 'layout')
                this.layout = json[key]
            else
                this.rooms[key] = json[key];
        }
    }

    public static getLayout(){
        return this.layout;
    }

    public static getRooms(){
        return this.rooms;
    }

    public static getRoomByName(room:string){
        for(const key in this.rooms){
            if(room.toLowerCase === key.toLowerCase)
                return this.rooms[key];
        }
        return "";
    }
}