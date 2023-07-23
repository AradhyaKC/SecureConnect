// function Login(username,password) //return true or false
// function SetLeaseTimeOut(ipAddress){}
// function AllowIpAddresses(ipaddress[])
// function blockRest

const {User,authenticateUser}= require("./models/user");
const {Port,getAllPorts}=require('./routes/ports');

const {spawn} =require("child_process");

class secureConnect{
    constructor(){
        this.allowedIpAddresses=[];
    }

    async Init(){
        // console.log(await getAllPorts());
        //AllowIpAddresses
    }

    async Login(username,password,ipaddress) {
        var message=await authenticateUser(username,password)
        if(message!='success'){
            console.error(message);
            return false;
        }
        this.allowedIpAddresses.push(ipaddress);
        AllowIpAddresses(this.allowedIpAddresses);

        //SetLeaseTimeout
        return true;
    }
}

const AllowIpAddresses=(ipAddresses)=>{
    
    // const scriptProcess = spawn('bash', ['hello.sh',...ipaddress]);
    // scriptProcess.stdout.on('data', (data) => {
    //     console.log(`Script output: ${data}`);
    // });
}


var connectApp=new secureConnect();
connectApp.Init();

module.exports=connectApp;

