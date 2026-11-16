/*
  LOVE.PROJECT — personalize este arquivo antes de enviar o link.
  Não precisa instalar React, Node ou qualquer dependência: é HTML, CSS e JS puro.
*/
const CONFIG = {
  nomeDela: "Amor",
  seuNome: "Seu namorado",
  dataInicio: "", // formato: AAAA-MM-DD (ex.: 2024-06-15). Deixe vazio se preferir não mostrar.
  motivos: [
    "A forma como seus olhos brilham quando você sorri.",
    "Sua inteligência — e a paixão que coloca no que faz.",
    "Seu sorriso, que sempre contagia.",
    "Seu jeitinho de durona.",
    "Seu carinho nos detalhes pequenos.",
    "O jeito único que só você tem.",
    "As nossas conversas, até quando são sobre absolutamente nada.",
    "Porque posso aprender com você e continuar sendo eu mesmo.",
    "Porque os momentos simples ficam especiais ao seu lado.",
    "Porque, entre tantas possibilidades, eu escolheria você de novo. ♥"
  ],
  memorias: [
    { titulo: "O começo de tudo", texto: "Quando nas lives, me ajudava com dicas do que eu tinha que fazer" },
    { titulo: "Um commit inesquecível", texto: "Dia 01/11, quando você aceitou e meu coração acelerou" },
    { titulo: "Nossa melhor feature", texto: "Todos, principalmente quando estamos assistindo algo e eu fico reparando em você." }
  ]
};
// Criando o áudio
const musica = new Audio("musica.mp3");

// Ativando o loop
musica.loop = true;

// Selecionando o botão
const botao = document.getElementById("botaoMusica");

// Evento de clique
botao.addEventListener("click", function() {

    if (musica.paused) {

        musica.play();

        botao.textContent = "⏸ Pausar música";

    } else {

        musica.pause();

        botao.textContent = "▶ Tocar música";

    }

});

const $ = (selector) => document.querySelector(selector);
const output = $("#terminalOutput");
const modal = $("#modalBackdrop");
let reasonIndex = 0;
let toastTimer;

$("#herName").textContent = CONFIG.nomeDela;
$("#year").textContent = new Date().getFullYear();

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}
function appendTerminal(command, html, type = "body") {
  const line = document.createElement("div");
  line.className = "output-line";
  line.innerHTML = `<span class="prompt">guest@love-project ~ %</span> <span class="typed">${escapeHTML(command)}</span>`;
  const result = document.createElement("div");
  result.className = `output-${type}`;
  result.innerHTML = html;
  output.append(line, result);
  output.scrollTop = output.scrollHeight;
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function openModal({ symbol = "♡", eyebrow = "A MESSAGE FOR YOU", title, content }) {
  $("#modalSymbol").textContent = symbol;
  $("#modalEyebrow").textContent = eyebrow;
  $("#modalTitle").textContent = title;
  $("#modalContent").innerHTML = content;
  modal.hidden = false;
  $("#closeModal").focus();
}
function closeModal() { modal.hidden = true; }
$("#closeModal").addEventListener("click", closeModal);
$("#modalOk").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

const commands = {
  help() {
    return `<p>Comandos disponíveis neste repositório:</p>
      <div class="code-block">help       → lista de comandos\nhello      → mensagem de boas-vindas\nlove       → executa uma declaração\nabout      → sobre este projeto\nletter     → abre o README do nosso amor\nbug        → investiga um bug crítico\nreasons    → consulta o banco de motivos\nmemories   → mostra alguns commits especiais\ndate       → tempo desde o nosso primeiro commit\nsecret     → revela um easter egg\nclear      → limpa o terminal</div>`;
  },
  hello() { return `<p>Oi, <strong>${escapeHTML(CONFIG.nomeDela)}</strong>! Autenticação concluída: você é a única pessoa com acesso a este repositório. 💗</p>`; },
  love() { return `<p>Resultado da execução: <strong>eu gosto de você mais do que consigo colocar em palavras.</strong></p><p>return "sempre escolheria você"; ♥</p>`; },
  about() { return `<p><strong>love.project</strong> é um projeto independente, desenvolvido por ${escapeHTML(CONFIG.seuNome)}, com uma única finalidade: lembrar você de como é especial.</p><p>Tecnologias: HTML, CSS, JavaScript e muitos sentimentos não tipados.</p>`; },
  letter() {
    openModal({ symbol: "♡", eyebrow: "README.md · DOCUMENTAÇÃO OFICIAL", title: "Sobre nós", content:
      `<p><strong># Nosso projeto favorito</strong></p>
       <p>Se nosso relacionamento fosse um projeto, seria aquele que eu nunca gostaria de arquivar. Gosto de cada etapa, dos aprendizados, das risadas e até dos pequenos bugs que a gente resolve junto.</p>
       <p><strong>## Objetivo</strong><br>Continuar criando memórias, apoiando os sonhos um do outro e escolhendo estar perto.</p>
       <p><strong>## Licença</strong><br>Uso exclusivo: nós dois. Sem data de expiração. ♥</p>
       <p><em>Observação: este README foi escrito com carinho, não gerado automaticamente.</em></p>` });
    return `<p>README.md aberto em uma nova janela. <strong>Documentação do coração carregada.</strong></p>`;
  },
  bug() {
    openModal({ symbol: "⌁", eyebrow: "ISSUE #001 · PRIORITY: HIGH", title: "Bug report: saudade", content:
      `<div class="code-block">[BUG] Abraço não encontrado\nStatus: OPEN\nSeverity: critical\nAffected user: ${escapeHTML(CONFIG.seuNome)}\nExpected: abraço presencial\nActual: saudade em execução contínua</div>
       <p><strong>Possível solução:</strong> agendar um abraço demorado, acompanhado de beijo e tempo sem olhar para o relógio.</p>
       <p>Workaround temporário: esta mensagem e um lembrete de que estou pensando em você. 💗</p>` });
    return `<p>Issue #001 registrada. Diagnóstico: <strong>saudade em nível crítico.</strong></p>`;
  },
  reasons() {
    const reason = CONFIG.motivos[reasonIndex % CONFIG.motivos.length];
    const current = (reasonIndex % CONFIG.motivos.length) + 1;
    reasonIndex++;
    return `<p><strong>SELECT motivo FROM motivos WHERE pessoa = '${escapeHTML(CONFIG.nomeDela)}';</strong></p>
      <p>Registro ${current}/${CONFIG.motivos.length}: ${escapeHTML(reason)}</p>
      <p class="output-muted">Query executada com sucesso. Digite <strong>reasons</strong> novamente para outro resultado.</p>`;
  },
  memories() {
    const rows = CONFIG.memorias.map((item, index) =>
      `<p><strong>commit ${String(index + 1).padStart(3, "0")} — ${escapeHTML(item.titulo)}</strong><br>${escapeHTML(item.texto)}</p>`
    ).join("");
    openModal({ symbol: "▧", eyebrow: "GIT LOG · OUR HISTORY", title: "Memórias versionadas", content: rows });
    return `<p>Histórico carregado. ${CONFIG.memorias.length} commits especiais encontrados.</p>`;
  },
  date() {
    if (!CONFIG.dataInicio) return `<p>A data do primeiro commit ainda não foi configurada. Edite <strong>dataInicio</strong> no script.js para ativar este recurso. ♥</p>`;
    const start = new Date(`${CONFIG.dataInicio}T00:00:00`);
    if (Number.isNaN(start.getTime()) || start > new Date()) return `<p>Data inválida. Use o formato AAAA-MM-DD e confira o primeiro commit. 🙂</p>`;
    const days = Math.floor((new Date() - start) / 86400000);
    return `<p>Já são <strong>${days} dias</strong> de história desde o nosso primeiro commit.</p><p>E eu espero que ainda venham muitos releases pela frente. ♥</p>`;
  },
  secret() {
    openModal({ symbol: "✦", eyebrow: "EASTER EGG FOUND", title: "Você desbloqueou!", content:
      `<p>Parabéns, dev! Você encontrou uma função secreta.</p>
       <div class="code-block">if (person === "${escapeHTML(CONFIG.nomeDela)}") {\n  favoritePerson = true;\n  love.level = Infinity;\n}</div>
       <p>Não existe algoritmo que explique completamente o quanto você é especial para mim. Esse código só tenta chegar perto. 💗</p>` });
    return `<p>Easter egg desbloqueado. Você ganhou acesso ao carinho em modo administrador. ✨</p>`;
  },
  clear() { output.innerHTML = `<div class="output-muted">Terminal limpo. O carinho continua em execução. ♥</div>`; return null; }
};

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;
  if (command === "cls") return runCommand("clear");
  const handler = commands[command];
  if (!handler) {
    appendTerminal(rawCommand, `Comando não encontrado: <strong>${escapeHTML(command)}</strong>. Digite <span class="terminal-pink">help</span> para ver os comandos.`, "error");
    return;
  }
  const result = handler();
  if (result !== null && result !== undefined) appendTerminal(rawCommand, result, "body");
}

$("#terminalForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#commandInput");
  runCommand(input.value);
  input.value = "";
});
$("#clearTerminal").addEventListener("click", () => runCommand("clear"));
document.querySelectorAll("[data-command]").forEach(button => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;
    runCommand(command);
    $("#terminalSection").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
$("#runProject").addEventListener("click", () => {
  runCommand("hello");
  runCommand("help");
  $("#terminalSection").scrollIntoView({ behavior: "smooth", block: "center" });
});
$("#deployButton").addEventListener("click", () => {
  openModal({ symbol: "✦", eyebrow: "DEPLOYMENT SUCCESSFUL · 200 OK", title: "Você é meu melhor projeto.", content:
    `<p>Build concluído. Testes passando. Coração feliz.</p>
     <div class="code-block">✓ carinho: deployed\n✓ admiração: always on\n✓ parceria: growing\n✓ amor: no end date</div>
     <p>Brincadeiras de código à parte, eu espero que você nunca duvide do quanto é importante para mim. Admiro sua inteligência, sua dedicação e a pessoa que você é — não só a programadora incrível.</p>
     <p><strong>Meu lugar favorito continua sendo ao seu lado. ♥</strong></p>` });
  showToast("Deploy concluído com sucesso ♥");
});

// Atalho: "/" leva o foco ao terminal, exceto quando já está digitando.
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    $("#commandInput").focus();
  }
});
