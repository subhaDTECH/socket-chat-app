const express=require("express");
const app=express();
const port=process.env.PORT || 4000;

const http=require("http").createServer(app);
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
   
    res.sendFile(__dirname+"/index.html");
})

http.listen(port,()=>{
    console.log("server run")
})
const io=require("socket.io")(http)
io.on('connection',(socket)=>{
    console.log("connected successfully")

    socket.on('massage',(msg)=>{
        socket.broadcast.emit('massage',msg)
    })
})