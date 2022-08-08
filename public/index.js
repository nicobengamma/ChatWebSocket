let userName = sessionStorage.getItem("userName");
if (userName == null) {
  userName = prompt("insert UserName");
  sessionStorage.setItem("userName", userName);
}

document.getElementById("userName").innerHTML = `${userName}`;
const socket = io();
loadFirstData();

const btnSend = document.getElementById("send");

btnSend.onclick = (e) => {
  const msj = document.getElementById("msj").value;
  socket.emit("chat-in", { msj, userName });
  formulario.reset();
  e.preventDefault();
};

socket.on("chat-out", (data) => {
  appDataToDiv(data);
});
function appDataToDiv(data) {
  const div = document.getElementById("chat");
  div.innerHTML += `<br> <small>${data.time}</small> <b>${data.userName}:</b> <small>${data.msj}</small>`;

  setTimeout((scrollpapi(), 3000));
}

function loadDataToDiv(data) {
  console.log(data);
  data.forEach((d) => {
    appDataToDiv(d);
  });
}

function loadFirstData() {
  fetch("/data")
    .then((data) => data.json())
    .then((data) => {
      loadDataToDiv(data);
    })
    .catch((e) => console.log(e));
}

function scrollpapi() {
  const scroll = document.getElementById("chat");
  scroll.scrollTop = scroll.scrollHeight;
}

const mensaje = document.getElementById("msj");
mensaje.addEventListener("keypress", () => {
  socket.emit("tiping", userName);
});

const tipean2 = document.getElementById("tipean2");

socket.on("tiping", (userName) => {
  tipean2.innerHTML = `<b>${userName}</b> Esta Escribiendo...`;
  setTimeout(() => {
    tipean2.innerHTML = `Todo tranquilo por aqui....`;
  }, 1000);
});
