import { createContext, useContext } from "react";

export const detect = () => {
  try { const saved = localStorage.getItem("lang"); if (saved === "pt" || saved === "en") return saved; } catch { /* sem storage */ }
  return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
};

export const dict = {
  pt: {
    "nav.top": "Início", "nav.about": "Sobre", "nav.work": "Trabalho", "nav.desk": "Secretária", "nav.contact": "Contacto",
    "client.lebuse": "story Lebuse Marketing", "client.anarkitty": "story Anarkitty Handmade", "client.vintage": "drop Clothes Room Vintage", "client.art": "ilustração digital",
    "nav.aria": "Navegação", start: "Iniciar", shutdown: "Encerrar…", lang: "Mudar idioma",
    "loader.title": "A iniciar o portefólio da Bruna…", "loader.text": "Por favor aguarde enquanto o portefólio arranca.", "loader.aria": "A carregar",
    "hero.sub": "Estratégia e criação de conteúdo para redes sociais.", "hero.see": "Ver trabalho", "hero.tag": "planeamento · conteúdo",
    "hero.next": "Seguinte ›", "hero.nextAria": "Ver a próxima foto", "welcome": "Bem-vindo.exe", "about.file": "Sobre.txt", "ghost.top": "PORTEFÓLIO",
    "menu.file": "Ficheiro", "menu.edit": "Editar", "menu.search": "Pesquisar", "menu.help": "Ajuda", "menu.view": "Ver", "menu.colors": "Cores",
    "ghost.about": "SOBRE", "about.title": "Quem sou eu?", "about.notepad": "Sobre.txt - Bloco de notas", "about.ask": "Pergunta",
    "about.question": "Vamos trabalhar juntos?", yes: "Sim", yes2: "Claro que sim", "about.tag": "criatividade com estratégia",
    "about.bio": "Olá! Sou a Bruna.\n\nFaço o planeamento mensal da estratégia de conteúdo e crio os posts: reels, stories e carrosséis com personalidade.\n\nTrabalho com a Lebuse Marketing e a Anarkitty Handmade. Aqui ficam alguns dos meus trabalhos. ♥",
    "paint.title": "Paint - sem título", clear: "Limpar", "paint.status": "Crie a sua arte também", "paint.area": "Área de desenho: desenha com o rato", colors: "Cores", color: "Cor",
    "ghost.work": "TRABALHO", "work.title": "Recente", "work.heading": "Trabalho recente", "work.tag": "clica num ficheiro",
    "work.stories": "Stories e peças gráficas da marca de cerâmica: encomendas, valores, sorteios e coleções.", "work.drops": "Drops e criativos para a loja vintage.", "work.art": "Ilustração digital: o lado mais criativo.", "work.lebuse": "Planeamento e criação de conteúdo para a Lebuse: stories e carrosséis.",
    "work.anarkitty": "Reels e posts da marca de cerâmica: ideia, guião e publicação.",
    "work.vintage": "Drops, reels e posts para a loja de roupa vintage.",
    open: "Clica para abrir", minimize: "Minimizar",
    objects: "objeto(s)", "work.click": "Clica num ficheiro para abrir", embedded: "Incorporados do Instagram", loading: "a carregar…",
    "viewer.title": "Visualizador", prev: "‹ Anterior", next: "Seguinte ›", close: "Fechar", closeWin: "Fechar janela", note: "conteúdo criado do zero",
    "desk.title": "Arruma a minha secretária", "desk.win": "Ambiente de trabalho", "desk.hint": "Arrasta as janelas pela barra", "desk.reset": "Reorganizar",
    "ghost.contact": "CONTACTO", "contact.title": "Vamos fazer barulho?", "contact.dialog": "Mensagem", "contact.p": "Conta-me o que queres comunicar. Respondo por mensagem no Instagram ou por email.",
    "contact.ig": "Abrir Instagram", "contact.mail": "Enviar email", "contact.card": "Contactos", "contact.tag": "responde-se em 24h",
    "contact.foot": "© Bruna · Este site funciona melhor em ecrã grande.", "contacts": "contactos",
    "off.text": "Agora já pode desligar o computador com segurança.", "off.back": "(clica para voltar)",
    ticker: ["lebuse marketing", "anarkitty handmade", "clothes room vintage", "estratégia", "planeamento mensal", "reels", "posts", "stories", "conteúdo com personalidade"],
  },
  en: {
    "nav.top": "Home", "nav.about": "About", "nav.work": "Work", "nav.desk": "Desk", "nav.contact": "Contact",
    "client.lebuse": "Lebuse Marketing story", "client.anarkitty": "Anarkitty Handmade story", "client.vintage": "Clothes Room Vintage drop", "client.art": "digital illustration",
    "nav.aria": "Navigation", start: "Start", shutdown: "Shut down…", lang: "Change language",
    "loader.title": "Starting Bruna's portfolio…", "loader.text": "Please wait while the portfolio starts up.", "loader.aria": "Loading",
    "hero.sub": "Content strategy and creation for social media.", "hero.see": "See work", "hero.tag": "planning · content",
    "hero.next": "Next ›", "hero.nextAria": "See the next photo", "welcome": "Welcome.exe", "about.file": "About.txt", "ghost.top": "PORTFOLIO",
    "menu.file": "File", "menu.edit": "Edit", "menu.search": "Search", "menu.help": "Help", "menu.view": "View", "menu.colors": "Colors",
    "ghost.about": "ABOUT", "about.title": "Who am I?", "about.notepad": "About.txt - Notepad", "about.ask": "Question",
    "about.question": "Shall we work together?", yes: "Yes", yes2: "Of course", "about.tag": "creativity with strategy",
    "about.bio": "Hi! I'm Bruna.\n\nI plan the monthly content strategy and create the posts: reels, stories and carousels with personality.\n\nI work with Lebuse Marketing and Anarkitty Handmade. Here are some of my projects. ♥",
    "paint.title": "Paint - untitled", clear: "Clear", "paint.status": "Create your art too", "paint.area": "Drawing area: draw with your mouse", colors: "Colors", color: "Color",
    "ghost.work": "WORK", "work.title": "Recent", "work.heading": "Recent work", "work.tag": "click a file",
    "work.stories": "Stories and graphics for the ceramics brand: orders, prices, giveaways and collections.", "work.drops": "Drops and creatives for the vintage shop.", "work.art": "Digital illustration: the creative side.", "work.lebuse": "Content planning and creation for Lebuse: stories and carousels.",
    "work.anarkitty": "Reels and posts for the ceramics brand: idea, script and publishing.",
    "work.vintage": "Drops, reels and posts for the vintage clothing shop.",
    open: "Click to open", minimize: "Minimize",
    objects: "item(s)", "work.click": "Click a file to open it", embedded: "Embedded from Instagram", loading: "loading…",
    "viewer.title": "Viewer", prev: "‹ Previous", next: "Next ›", close: "Close", closeWin: "Close window", note: "content created from scratch",
    "desk.title": "Tidy up my desk", "desk.win": "Desktop", "desk.hint": "Drag the windows by their title bar", "desk.reset": "Rearrange",
    "ghost.contact": "CONTACT", "contact.title": "Let's make some noise?", "contact.dialog": "Message", "contact.p": "Tell me what you want to communicate. I reply by Instagram message or email.",
    "contact.ig": "Open Instagram", "contact.mail": "Send email", "contact.card": "Contacts", "contact.tag": "replies within 24h",
    "contact.foot": "© Bruna · This site works best on a large screen.", "contacts": "contacts",
    "off.text": "It is now safe to turn off your computer.", "off.back": "(click to go back)",
    ticker: ["lebuse marketing", "anarkitty handmade", "clothes room vintage", "strategy", "monthly planning", "reels", "posts", "stories", "content with personality"],
  },
};

export const LangCtx = createContext({ lang: "pt", t: (k) => dict.pt[k] ?? k, setLang: () => {} });
export const useT = () => useContext(LangCtx);
