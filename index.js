/**
 * @author Leviathenn
 */


const express = require("express")
const fs = require("fs");
const cors = require("cors");
const ws = require("ws");


var app = express();

app.use(express.static("."))

app.use(cors());


let filterCusss = true;

let rooms = {

} 
fs.readdirSync("rooms").forEach((file)=>{
    let rawdtd = JSON.parse(fs.readFileSync(`rooms/${file}`));
    rooms[file.split('.json')[0]] = rawdtd;
})

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
    "bitch":"asd",
    "asshat": "e",
    "shitface": "Z",
    "wanker": "x",
    "jackoff": "i",
    "jerkoff":"g",
    "motherfuck": "e",
    "skank": "x"   
}


let sendRes;
        
let jchatLib = {
    create: (botname, roomID)=>{
        return {
            send: (message)=>{ 
                rooms[roomID]["Messages"].push(`${message}:${botname} *BOT* `);
            }
        }
       
    }
}

function filterCuss(message,callback){

    let splitMessage = message.split(" ");
    let callbaxcj = false;
    splitMessage.forEach(tag => {
        if(badWords[tag]){
            callback(true);
            callbaxcj = true;

        }
    });  
    if(!callbaxcj){
        callback(false);
    }else{

    }

}




app.post("/newRoom", (req,res)=>{
    let jasd = makeid(5)
    rooms[jasd] = {
        "Users": {

        },
        "Messages": [
            
        ],
        "Uploads": {}
    }
    res.send(jasd);
})




app.post("/connectionPacket", (req,res)=>{
    res.send("OK");
    
   // jchatLib.create("TESTBOT","test").send("Hello, World!");
})
app.post('/sendMessage',(req,res)=>{
    
    let message = req.query["message"];
    let roomID = req.query["roomID"];
    let username = req.query["username"]
    let fileUpload = req.query["fileUpload"];
    if(fileUpload){
        let payload = req.query["payload"];
        let name = makeid(32);
        let otherName = makeid(21);
        let lastName = makeid(33);
        fs.mkdirSync(`cdn/${name}`);
        fs.mkdirSync(`cdn/${name}/${otherName}`);
        fs.mkdirSync(`cdn/${name}/${otherName}/${lastName}`);
        fs.writeFileSync(`cdn/${name}/${otherName}/${lastName}/${req.query.fName}`,atob(payload));
        res.send(`cdn/${name}/${otherName}/${lastName}/${req.query.fName}`);
    }
    if(username.includes("*BOT*")){

        res.send({message:"You can't have the BOT tag in your name."}).status(404)
       
    }else{
        
    }
    if(rooms[roomID]["Users"][username] != undefined){
    
    }else{
        rooms[roomID]["Users"][username] = "User"
        fs.writeFileSync(`rooms/${roomID}.json`,JSON.stringify(rooms[roomID]));
    }
    filterCuss(message, (sussycussy)=>{
        if(sussycussy){
           
                res.send(({"error": "Message Not Approved", "action": "removeDiv", "rmdiv": req.query["div"]})).status(401);
            
            
        }else{
      
               // res.send({"status": "sent", "message": message, "query":req.query});
            
            rooms[roomID]["Messages"].push(`${message}^${username}`)
            fs.writeFileSync(`rooms/${roomID}.json`,JSON.stringify(rooms[roomID]));
        }
        
    })
});     
function atob(a) {index.js
    return new Buffer(a, 'base64').toString('binary');
}; 
function btoa(b) {
    return new Buffer(b).toString('base64');
};
app.post('/getMessages', (req,res)=>{
    let roomID = req.query["roomID"];
    res.send(rooms[roomID]["Messages"]);
})



app.listen(8080, ()=>{
    console.log(`were up!`);
})
