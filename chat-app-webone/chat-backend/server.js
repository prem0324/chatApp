//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import ChatUsers from './chatUser.js';
import Pusher from "pusher";
import cors from 'cors';




// app config 
const app = express();
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1793832",
    key: "f4a0acda517a03105c5f",
    secret: "1cc6baf84f329d832793",
    cluster: "ap2",
    useTLS: true
  });


//middleware 
app.use(express.json());
app.use(cors());


// db config
const DB_URI = 'mongodb+srv://arihant2001jain:aJBUXIGpQ5Rcl64s@chatapp-cluster.q25bea2.mongodb.net/chatappdb?retryWrites=true&w=majority&appName=chatapp-cluster'

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true // don't use this one

}

mongoose.connect(DB_URI,connectionParams).then(()=>console.log("connected to db")).catch((err)=>console.log(err));

//pusher config
const db = mongoose.connection;
db.once('open',()=>{

    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();
    changeStream.on('change',(change)=>{console.log(change);

    if(change.operationType==='insert'){
        const messageDetails = change.fullDocument;
        pusher.trigger('messages','inserted',{
            name:messageDetails.name,
            message:messageDetails.message,
            timestamp:messageDetails.timestamp,
            received:messageDetails.received,
            chatuser:messageDetails.chatuser,

        })}
        else{
            console.log("Error triggering Pusher")
        }
    })
})

db.once('open',()=>{

    const chatCollection = db.collection("chatusers");
    const changeStream = chatCollection.watch();
    changeStream.on('change',(change)=>{console.log(change);

    if(change.operationType==='insert'){
        const chatDetails = change.fullDocument;
        pusher.trigger('chatusers','inserted',{
            name:chatDetails.name,
            Number:"766666666666"

        })}
        else{
            console.log("Error triggering Pusher")
        }
})

})

//api routes
app.get('/',(req,res)=>{res.status(200).send("hello")})

app.get('/message/sync',(req,res)=>{
    
    Messages.find({}).then((data) => {
        res.status(200).send(data)}).catch((err) => {
            res.status(500).send(err)
        })
    })

app.get('/chatuser/sync',(req,res)=>{

    ChatUsers.find({}).then((data) => {
        console.log(data);
        res.status(200).send(data)}).catch((err) => {
            res.status(500).send(err)
            
})
})



app.post('/message/new',(req,res)=>{
const dbMessage = req.body;
console.log(dbMessage);

Messages.create(dbMessage)
.then((data) => {
    res.status(201).send(data)
})
.catch((err) => {
    res.status(500).send(err)
})
})

app.post('/chatuser/newuser',(req,res)=>{
    const chats = req.body;
    console.log(chats);
    ChatUsers.create(chats)
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

let listOfCollections = Object.keys(db.collections);
console.log(listOfCollections);



//listen
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))

