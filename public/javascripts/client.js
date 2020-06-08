const socket = io();

// server connection and disconnection
socket.on('connect' , () =>  console.log('Connected to server'));
socket.on('disconnect' , () =>  console.log('disConnected to server'));

// get name using prompt 

var name = prompt('Enter your name to join Chat');
if(name !== "") {
    outputMsg('You joined.' , 'bg-primary' ,'mt-3' )
    socket.emit('new-chat' , name);

}

// new user coonnection broadcast
socket.on('new-user-message' , msg => {
    //  outputMsg(msg , 'justify-contnent-center' , 'bg-success' , 'text-white');
    outputMsg(`${msg.name} : ${msg.msg}` ,'mr-1', 'float-right' , 'bg-primary2');


});

// getting msg froms server
socket.on('message' , msg => {

    outputMsg( `you : ${msg}` , 'bg-darkBlue' , 'mt-2');

    // auto scroll

   
    var chatMessages = document.getElementById('messages');

    chatMessages.scrollTop = chatMessages.scrollHeight;
   
});

// new user join the char

socket.on('new-user' , name => {
    outputMsg(`${name}: joined` , 'text-dark');
    
});

// user diconnecting
 socket.on('leave' , msg => {
      outputMsg(`${msg.name} left the chat` , 'bg-dark' , 'text-white' );
 });

// message sedning using form 
const msg = document.getElementById('msg');
const msgForm = document.getElementById('msgForm');



msgForm.addEventListener('submit' , e => {
    e.preventDefault();
    var text = msg.value;
    
    socket.emit('message' , text);
    
    //clear input field
     msg.value = "";
});


function outputMsg(msg , margin , float , bg) {
        // audio init
     var audio = new Audio('message_tone.mp3');
    var div = document.createElement('div');
    
    div.innerHTML = `
    <div class="message clearfix">
        <div class="${bg} border msg-box  text-white ${float}  px-2 py-1 ${margin} ">${msg}</div>
        <br>
    </div>
    `;
    document.getElementById('messages').appendChild(div);
    
    if(float === 'float-right') {
         audio.play();
    }
}