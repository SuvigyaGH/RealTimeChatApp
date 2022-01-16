const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('tabla.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classlist.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){

        audio.play();
    }
}

const username = prompt("Type in your name to enter the chat");
socket.emit('new-user-join', username);

socket.on('user-joined', username=>{
    append(`${username} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.user}: ${data.message}`, 'left');
})

socket.on('left', username => {
    append(`${username} left the chat`, 'right');
})


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';

})