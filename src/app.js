const express = require("express");
require("../src/database/conn");
const MensRanking = require("../src/models/mens");

const app = express();
const port = process.env.PORT || 3000;

//create request
app.post("/mens",async(req,res)=>{
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
app.get("/mens",async(req,res)=>{
    try{
        const getMens = await MensRanking.find({})
        res.send(getMens);
    }
    catch(e){
        res.send(400).send(e);
    }
});

//read request using id
app.get("/mens/:id",async(req,res)=>{
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
app.patch("/mens/:id",async(req,res)=>{
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
app.delete("/mens/:id",async(req,res)=>{
    try{
      const delMan = await MensRanking.findByIdAndDelete(req.params.id);
      res.send(delMan);
    }
    catch(e){
        res.status(500).send(e);
    }
});

app.listen(port, ()=>{
    console.log(`connection is live at port number ${port}`);
});