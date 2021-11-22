const socket=io();
let name;
const textarea=document.querySelector("#textarea")
const mass_area=document.querySelector(".mass_area")
do{
  name= prompt("plz Enter your name")
}while(!name)

textarea.addEventListener("keyup",(e)=>{
    if(e.key==='Enter'){
        sendMassage(e.target.value);
    }
})

function sendMassage(massage){
    let msg={
        user:name,
        massage:massage.trim()
    }
    appendMassage(msg,"outgoing")
    textarea.value='';
    socket.emit("massage",msg)
    scrolltoptoButtom();
}

function appendMassage(msg,type){
    let maindiv=document.createElement('div');
    let className=type;
    maindiv.classList.add(className,'massage');

    let markup=`
    <h3>${msg.user}</h3>
    <P>${msg.massage}</p>`

    maindiv.innerHTML=markup;
    mass_area.appendChild(maindiv);
    


}

socket.on("massage",(msg)=>{
    appendMassage(msg,"incoming");
    scrolltoptoButtom();
})


function scrolltoptoButtom(){
    mass_area.scrollTop=mass_area.scrollHeight
}

