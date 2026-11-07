// contactos reais da Bruna
export const IG = "https://www.instagram.com/gabebruu/";

// thumb: WebP de 600px gerado com ffmpeg a partir do jpg (public/img/thumb); o jpg inteiro só abre no visualizador
const p = (img, name, tag, desk = false) => ({ img: `img/${img}.jpg`, thumb: `img/thumb/${img}.webp`, name: `${name}.jpg`, tag, desk });

// "contratei-a-lebuse-2.jpg" -> "Contratei a lebuse"
export const pretty = (name) => name.replace(/(-\d+)?\.jpg$/, "").replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());

export const projects = [
  p("lebuse_01", "sua-marca-precisa-de-apoio", "lebuse", true),
  p("lebuse_02", "pode-delegar", "lebuse", true),
  p("lebuse_03", "antes-de-postar", "lebuse", true),
  p("lebuse_04", "voce-faz-tudo", "lebuse", true),
  p("lebuse_05", "contratei-a-lebuse", "lebuse"),
  p("lebuse_06", "presenca-digital", "lebuse"),
  p("lebuse_07", "sua-marca-evoluiu", "lebuse"),
  p("lebuse_08", "quanto-tempo-pra-decidir", "lebuse"),
  p("lebuse_09", "contratei-a-lebuse-2", "lebuse"),
  p("lebuse_10", "sua-marca-precisa-de-apoio-2", "lebuse"),
  p("lebuse_11", "vai-alem-da-logo", "lebuse", true),
  p("lebuse_12", "o-que-postar", "lebuse"),
  p("anarkitty_01", "link-na-bio", "anarkitty", true),
  p("anarkitty_02", "encomendas", "anarkitty", true),
  p("anarkitty_03", "macabrinhos", "anarkitty"),
  p("anarkitty_04", "ceramicas-disponiveis", "anarkitty"),
  p("anarkitty_05", "encomendas-2", "anarkitty"),
  p("anarkitty_06", "valores", "anarkitty"),
  p("anarkitty_07", "sorteio", "anarkitty"),
  p("anarkitty_08", "vinted", "anarkitty"),
  p("anarkitty_09", "ceramicas-disponiveis-2", "anarkitty"),
  p("anarkitty_10", "macabrinhos-collection", "anarkitty"),
  p("vintage_01", "drop-01", "vintage", true),
  p("vintage_02", "drop-02", "vintage"),
  p("vintage_03", "drop-03", "vintage"),
  p("vintage_04", "3-brechos", "vintage"),
  p("art_01", "ilustracao-01", "art", true),
  p("art_02", "ilustracao-02", "art", true),
  p("art_03", "ilustracao-03", "art", true),
];

export const clients = ["anarkitty", "vintage"];

export const ticker = ["lebuse marketing", "anarkitty handmade", "clothes room vintage", "estratégia", "planeamento mensal", "reels", "posts", "stories", "conteúdo com personalidade"];

// Incorporações oficiais do Instagram (@anarkitty.handmade). kind: reel | p
// reels originais (comprimidos com ffmpeg para 540px em public/video; capa = frame aos 1s)
const v = (file, title, tag) => ({ src: `video/${file}.mp4`, poster: `video/${file}.webp`, title, tag });
export const videos = [
  v("anarkitty_01", "Antes e depois", "anarkitty"),
  v("anarkitty_02", "Porta-joias nuvem", "anarkitty"),
  v("anarkitty_03", "Quando vejo o meu próprio serviço", "anarkitty"),
  v("anarkitty_04", "Your new jewelry dish", "anarkitty"),
  v("anarkitty_05", "Rings off, nails on", "anarkitty"),
  v("anarkitty_06", "If you…", "anarkitty"),
  v("anarkitty_07", "One of my favorite pieces", "anarkitty"),
  v("anarkitty_08", "Give me a…", "anarkitty"),
  v("anarkitty_09", "Coração com olho", "anarkitty"),
  v("anarkitty_10", "Eu sou dona de um pequeno negócio", "anarkitty"),
  v("anarkitty_11", "Quem faz", "anarkitty"),
  v("lebuse_01", "Acabou…", "lebuse"),
];

export const embeds = [
  { kind: "reel", code: "DWJ93yIiMw5", title: "Available on Vinted", tag: "vintage" },
  { kind: "reel", code: "DMXmoFYobV6", title: "Feira do Marquês", tag: "vintage" },
  { kind: "reel", code: "DF-okvXoQNt", title: "This is my clubbing", tag: "vintage" },
  { kind: "reel", code: "DFBRgPRIqTE", title: "Drop na Vinted", tag: "vintage" },
  { kind: "reel", code: "DE2h2uuIEPQ", title: "Mini Drop", tag: "vintage" },
  { kind: "p", code: "DFYhranouHS", title: "Últimas novidades", tag: "vintage" },
];
