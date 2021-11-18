const socket = io('http://192.168.1.20:5000/');

let msgObj = {
    nick: '',
    message: ''
}


let btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    msgObj.nick = nickname.value;
    msgObj.message = message.value;
    sendMessage(msgObj)
});

socket.on('msg', msg => readMessage(msg));

function sendMessage(obj) {
    socket.emit('msg', obj);
    message.value = '';
}


let regYoutube = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/; //regExp for YouTube video

function readMessage(msg) {
    let spanUserName = document.createElement('div');
    let spanMessages = document.createElement('div');

    spanUserName.style.backgroundColor = 'yellow';
    spanMessages.innerHTML += `${msg.nick} `;

    if (msg.message.match(regYoutube)) {
        console.log(`https://www.youtube.com/embed/${msg.message.match(regYoutube)[1]}`) // get youtube key
        spanMessages.innerHTML += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${msg.message.match(regYoutube)[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        spanMessages.innerHTML += `  Send message : ${msg.message}`;
    }

    answer.prepend(spanMessages);
    answer.prepend(spanUserName);
}