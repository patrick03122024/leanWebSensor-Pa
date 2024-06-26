const ligarButton = document.getElementById('ligarButton');
const desligarButton = document.getElementById('desligarButton');
const restartButton = document.getElementById('restartButton');
const producaoDisplay = document.getElementById('producaoDisplay');
const producaoMsg = document.getElementById('producaoMsg');

var urlPost = 'https://leanwebsensor-pa.onrender.com/chaves'
var urlGet = 'https://leanwebsensor-pa.onrender.com/producao'

function receiverRequest(){
    fetch(urlGet, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        producaoDisplay.textContent = json.sensor;
        console.log(json.sensor);
        producaoMsg.textContent = json.msg;
        console.log(json.msg);
    })
}

setInterval(receiverRequest, 2000)  

ligarButton.addEventListener('click', () => {
    let requestData = {"liga": 1, "desliga": 0, "restart": 0}
    sendRequest(requestData)
});

desligarButton.addEventListener('click', () => {
    let requestData = {"liga": 0, "desliga": 1, "restart": 0}
    sendRequest(requestData)
});

restartButton.addEventListener('click', () => {
    let requestData = {"liga": 0, "desliga": 0, "restart": 1}
    sendRequest(requestData)
});

function sendRequest(data){
    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}