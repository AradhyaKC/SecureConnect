var express = require('express');
var router = express.Router();
const {Port} =require('../models/port');

router.post('/', async function(req, res) {
    var {port} =req.body;

    const alreadyExists=await Port.findOne({'port':port});

    if(alreadyExists!=null)
    return res.status(200).json({'message':'success'});

    var newPort= new Port({port:port});
    await newPort.save();

    return res.status(200).json({'message':'success'});
});

router.get("/",async(req,res)=>{
    return res.status(200).json({ports:await getAllPorts()});
})
router.delete('/:port',async function(req,res){
    const doesExist=await Port.findOne({"port":req.params.port});
    if(doesExist==null){
        return res.status(200).json({'message':'success'});
    }
    await Port.deleteOne({_id:doesExist._id});
    
    return res.status(200).json({'message':'success'});
});

module.exports={router};