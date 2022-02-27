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

app.listen(port, ()=>{
    console.log(`connection is live at port number ${port}`);
});