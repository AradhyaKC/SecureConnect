// function Login(username,password) //return true or false
// function SetLeaseTimeOut(ipAddress){}
// function AllowIpAddresses(ipaddress[])
// function blockRest

const {User,authenticateUser}= require("./models/user");
// const {getAllPorts}=require('./routes/ports');
const {getAllPorts}=require('./models/port.js');

const {spawn} =require("child_process");

class secureConnect{
    constructor(){
        this.allowedIpAddresses=[];
    }

    async Init(){
        AllowIpAddresses(await getAllPorts(),this.allowedIpAddresses);
    }

    async Login(username,password,ipaddress) {
        var message=await authenticateUser(username,password);
        if(message!='success'){
            console.error(message);
            return false;
        }

        var index = this.allowedIpAddresses.findIndex((ipv4)=>ipv4==ipaddress); 

        if(index<0){
            this.allowedIpAddresses.push(ipaddress);
            AllowIpAddresses(await getAllPorts(),this.allowedIpAddresses);
            //SetLeaseTimeout
            setTimeout(()=>{this.#removeFromAllowedIpAddress(ipaddress)},1000*60*60*6);
        }

        return true;
    }
    LogOut(ipAddress){
        this.#removeFromAllowedIpAddress(ipaddress);
    }

    async #removeFromAllowedIpAddress(ipv4){
        var isIpStillThereIndex = this.allowedIpAddresses.findIndex((ipv4Ele)=>ipv4Ele==ipv4);
        if(isIpStillThereIndex>=0){
            this.allowedIpAddresses.splice(isIpStillThereIndex,1);
            AllowIpAddresses(await getAllPorts(),this.allowedIpAddresses);
        }
    }
}


const AllowIpAddresses=(ports,ipAddresses)=>{
    
    var ipaddressString ="";
    // console.log(ipAddresses);
    ipAddresses.map((ele)=>{
        ipaddressString+=' '+ele;
    });
    var portsString ="";
    ports.map((ele)=>{
        portsString+=" "+ele;
    });
    
    const scriptProcess = spawn('bash', ['AllowIPsForPorts.sh',portsString,ipaddressString]);
    // scriptProcess.stdout.on('data', (data) => {
    //     console.log(`Script output: ${data}`);
    // });
}


var connectApp=new secureConnect();
connectApp.Init();

module.exports=connectApp;

