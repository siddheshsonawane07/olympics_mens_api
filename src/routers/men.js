const express = require("express");
const router = new express.Router();
const MensRanking = require("../models/mens");
require("../database/conn");

//create request
router.post("/mens",async(req,res)=>{
    try{
        const addingMensRecords = new MensRanking(req.body);
        const insertMens = await addingMensRecords.save();
        res.status(201).send(insertMens);
    }
    catch(e){
        res.send(400).send(e);
    }
})

//read request
router.get("/mens",async(req,res)=>{
try{
    const getMens = await MensRanking.find({}).sort({"ranking":1})
    res.send(getMens);
}
catch(e){
    res.send(400).send(e);
}
});

//read request using id
router.get("/mens/:id",async(req,res)=>{
try{
    const _id = req.params.id;
    const getMen = await MensRanking.findById(_id);
    res.send(getMen);
}
catch(e){
    res.send(400).send(e);
}
});

//update request
router.patch("/mens/:id",async(req,res)=>{
try{
    console.log(req.body);
    const _id = req.params.id;
    const updateMen = await MensRanking.findByIdAndUpdate(_id,req.body,{
        new:true
    });
    res.send(updateMen);
    // const updateMen = await MensRanking.findByIdAndUpdate({_id:_id},{
    //     $set: req.body
    // });
    // res.send(updateMen);
}
catch(e){
    res.status(500).send(e);
}
});

//delete request
router.delete("/mens/:id",async(req,res)=>{
try{
  const delMan = await MensRanking.findByIdAndDelete(req.params.id);
  res.send(delMan);
}
catch(e){
    res.status(500).send(e);
}
});

module.exports = router;