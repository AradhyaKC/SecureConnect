const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portSchema=new Schema({
    port:{type:Schema.Types.Number,required:true},
});

const Port=mongoose.model('Port',portSchema);
const getAllPorts=async()=>{
    return (await Port.find({})).map((ele)=>{
        return ele.port;
    });
}

module.exports = {Port,getAllPorts};
