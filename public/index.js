let userName = sessionStorage.getItem("userName");
if (userName == null) {
  userName = prompt("insert UserName");
  sessionStorage.setItem("userName", userName);
}

document.getElementById("userName").innerHTML = `Welcome ${userName}`;
const socket = io();

const btnSend = document.getElementById("send");

btnSend.onclick = (e) => {
  e.preventDefault();
  const msj = document.getElementById("msj").value;
  socket.emit("chat-in", { msj, userName });
};

socket.on("chat-out", (data) => {
  appDataToDiv(data);
});

function appDataToDiv(data) {
  const div = document.getElementById("chat");
  div.innerHTML += `<br> ${data.time} ${data.userName}: ${data.msj}`;
}
