const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("../backend/database/mongoose");
mongoose.Promise= global.Promise;
const Music = require("./database/music")
const cors = require("cors");
const port = 3000;
const app = express();
app.use(cors())
// const api = require("./server/routes/api")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
// app.use('api', api);

app.post("/musics",(req,res)=>{
    (new  Music({
        'name': req.body.name,
     'genre' : req.body.genre,
      'title': req.body.title,
      'overview':req.body.overview
     }))
     .save()
     .then((musics)=>res.json(musics))
     .catch((err)=>console.log(err));
     console.log("music posted succesfully")
});
app.get("/musics",(req,res)=>{
    Music.find()
    .then(musics=> res.send(musics))
    .catch(err=>console.log(err))
    console.log("music got succesfully")
});
app.get("/musics/:id",(req,res)=>{
    Music.findById(req.params.id)
    .then(musics=>res.send(musics))  
    .catch(err=>console.log(err))
    console.log("music got by id succesfully")
});
app.put("musics/:id",(req,res)=>{
    Music.findByIdAndUpdate(req.params.id, {
      $set:{
             name:req.body.name, 
             genre:req.body.genre,
             title:req.body.title,
             overview:req.body.overview
            }
        },
             {
                  new : true
                },
                function(err,updatedMusic){
                    if(!err)
                    res.send(updatedMusic)
                    
                    else
                    console.log(err)
                })
                console.log("music updated succesfully")

            })
app.delete('/musics/:id',(req,res)=>{
    Music.findByIdAndRemove(req.params.id)
   .then(()=>res.send("music removed succesfully"))
   console.log("music deleted succesfully")

}) 
  



app.listen(port,()=>{
    console.log(`server running at port : ${port}`)
})