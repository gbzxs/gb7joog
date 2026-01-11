let nivel = 1;
let tempo = 25;
let intervalo;
let codigoCorreto = "";

const intro = document.getElementById("intro");
const introText = document.getElementById("introText");

const telaJogo = document.getElementById("telaJogo");
const telaScan = document.getElementById("telaScan");

const status = document.getElementById("status");
const levelSpan = document.getElementById("level");
const timeSpan = document.getElementById("time");
const progress = document.getElementById("progress");
const codesDiv = document.getElementById("codes");
const scanProgress = document.getElementById("scanProgress");
const scanText = document.getElementById("scanText");

const introLines = [
  "INICIALIZANDO TERMINAL...",
  "ESTABELECENDO CONEXÃO SEGURA...",
  "IP MASCARADO: 192.168.???.???",
  "INJETANDO PAYLOAD...",
  "BYPASS NO FIREWALL...",
  "⚠ RASTREAMENTO INICIADO ⚠",
  "LOCALIZAÇÃO FALSA ATIVA",
  "",
  "PRESSIONE PARA CONTINUAR..."
];

let introIndex = 0;

function escreverIntro() {
  if (introIndex < introLines.length) {
    introText.innerText += introLines[introIndex] + "\n";
    introIndex++;
    setTimeout(escreverIntro, 400);
  } else {
    document.body.onclick = iniciarJogo;
  }
}

function iniciarJogo() {
  intro.classList.add("hidden");
  telaJogo.classList.remove("hidden");
  document.body.onclick = null;
  atualizar();
  gerarCodigos();
  iniciarTempo();
}

function gerarCodigo() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let c = "";
  for (let i = 0; i < 7; i++) {
    c += chars[Math.floor(Math.random() * chars.length)];
  }
  return c;
}

function gerarCodigos() {
  codesDiv.innerHTML = "";
  let correta = Math.floor(Math.random() * 6);

  for (let i = 0; i < 6; i++) {
    let cod = gerarCodigo();
    if (i === correta) codigoCorreto = cod;

    let div = document.createElement("div");
    div.className = "code";
    div.innerText = cod;
    div.onclick = () => verificar(cod);
    codesDiv.appendChild(div);
  }
}

function verificar(cod) {
  if (cod === codigoCorreto) {
    status.innerText = "ACESSO CONCEDIDO";
    iniciarScan();
  } else {
    status.innerText = "ACESSO NEGADO";
  }
}

function iniciarScan() {
  telaJogo.classList.add("hidden");
  telaScan.classList.remove("hidden");
  scanProgress.style.width = "0%";
  scanText.innerText = "INJETANDO CÓDIGO NO SERVIDOR...";

  let pct = 0;
  let scan = setInterval(() => {
    pct += 5;
    scanProgress.style.width = pct + "%";
    if (pct >= 100) {
      clearInterval(scan);
      proximoNivel();
    }
  }, 60);
}

function proximoNivel() {
  nivel++;
  tempo = 25;

  telaScan.classList.add("hidden");
  telaJogo.classList.remove("hidden");

  atualizar();
  gerarCodigos();

  if (nivel > 20) {
    status.innerText = "🔥 SISTEMA TOTALMENTE INVADIDO 🔥";
    clearInterval(intervalo);
  }
}

function atualizar() {
  levelSpan.innerText = nivel;
  timeSpan.innerText = tempo;
  progress.style.width = ((nivel - 1) * 5) + "%";
}

function iniciarTempo() {
  intervalo = setInterval(() => {
    tempo--;
    timeSpan.innerText = tempo;
    if (tempo <= 0) {
      status.innerText = "💀 VOCÊ FOI LOCALIZADO 💀";
      clearInterval(intervalo);
    }
  }, 1000);
}

escreverIntro();
setInterval(() => {
  const estados = ["ESTÁVEL", "VARREDURA", "ALERTA", "INVASÃO"];
  document.getElementById("sysStatus").innerText =
    estados[Math.floor(Math.random() * estados.length)];
}, 2000);
function toggleMusica() {
  const musica = document.getElementById("musica");
  const botao = document.getElementById("btn-musica");

  if (musica.paused) {
    musica.volume = 0.35;   // volume confortável
    musica.play();
    botao.textContent = "🔊 Música";
  } else {
    musica.pause();
    botao.textContent = "🔇 Música";
  }
}