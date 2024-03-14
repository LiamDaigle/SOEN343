import Command from './commands/interface/Command'
class SHCInvoker{
    
    private command:Command;

    constructor(command:Command){
        this.command = command;
    }

    setCommand(command:Command){
        this.command = command;
    }

    executeCommand():object{
        console.log("Command Executed!")
        return this.command.execute();
    }
}

export default SHCInvoker;