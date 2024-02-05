import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

const socket = io('localhost:3000');

const messageContainer = document.querySelector('.message-container');
const input = document.querySelector('input');
const form = document.querySelector('form');

socket.on('connect', () => {
    console.log(socket.id);
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        socket.emit('new-message', input.value, socket.id);
        input.value = '';
    })

    socket.on('transmitted', (message, id) => {
        const div = document.createElement('div');
        div.classList.add('message');
        if (id === socket.id) {
            div.innerText = `You: ${message}`;
            div.style.textAlign = 'Left';
        } else {
            div.innerText = `Them: ${message}`
            div.style.textAlign = 'right';
        }
        messageContainer.append(div);
    })
})