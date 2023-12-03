/**
 * @author Leviathan, PWiztel
 */


const express = require("express")
const fs = require("fs");
var app = express();

let filterCusss = true;

let rooms = {

} 

const makeid = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


let badWords = {
    "fuck":"s",
    "shit":"d",
    "dick":"d",
    "ass": "d",
    "dumbass": "d",
    "slut": "z",
    "cunt": "ew",
    "bitch":"asd"  
}


function filterCuss(message,callback){

    let splitMessage = message.split(" ");
    let callbaxcj = false;
    splitMessage.forEach(tag => {
        if(badWords[tag]){
            callback(true);
            callbaxcj = true; //blud my phone died even tho it was plugged tf up

        }
    });  
    if(!callbaxcj){
        callback(false);
    }else{

    }

}



app.post("/newRoom", (req,res)=>{
    rooms[makeid] = {
        "Users":{
            "Leviathan":{
                isBanned: false,
             
            }

        },
        "Messages":[
            "Hello, Mate:Leviathan"
        ],
        "Uploads": {
            
        }
    }
})

app.post('/sendMessage',(req,res)=>{
    let message = req.query["message"];
    let roomID = req.query["roomID"];
    let username = req.query["username"]
    filterCuss(message, (sussycussy)=>{
        if(sussycussy){
            res.send(({"error": "Message Not Approved", "action": "removeDiv", "rmdiv": req.query["div"]})).status(401);
        }else{
            res.send({"status": "sent", "message": message, "query":req.query});
            messages[roomID]["Messages"].append(`${message}:${username}`)
        }
        
    })
});     

app.post('/getMessages', (req,res)=>{
    let roomID = req.query["roomID"];
    res.send(rooms[roomID]["Messages"]);
})


app.listen(8080, ()=>{
    console.log(`were up!`);
})