import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { projects, IG, embeds, videos, clients, pretty } from "./data.js";
import { useT, LangCtx, detect, dict } from "./i18n.js";

gsap.registerPlugin(ScrollTrigger, Draggable);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });

/* ícones pixel simples */
const Ico = ({ name }) => {
  const p = {
    folder: <><path d="M3 10h14l3 3h25v27H3z" fill="#ffe14d" stroke="#000" strokeWidth="2" /><path d="M3 18h42" stroke="#000" strokeWidth="2" /></>,
    note: <><path d="M9 4h22l8 8v32H9z" fill="#fff" stroke="#000" strokeWidth="2" /><path d="M31 4v8h8M15 20h18M15 27h18M15 34h12" stroke="#000" strokeWidth="2" fill="none" /></>,
    image: <><rect x="4" y="8" width="40" height="32" fill="#fff" stroke="#000" strokeWidth="2" /><path d="M4 34l12-12 10 10 6-6 12 12" fill="#008080" stroke="#000" strokeWidth="2" /><circle cx="33" cy="17" r="4" fill="#ffe14d" stroke="#000" strokeWidth="2" /></>,
    mail: <><rect x="4" y="10" width="40" height="28" fill="#fff" stroke="#000" strokeWidth="2" /><path d="M4 10l20 17 20-17" fill="none" stroke="#000" strokeWidth="2" /></>,
    insta: <><rect x="6" y="6" width="36" height="36" rx="10" fill="#ff4fa3" stroke="#000" strokeWidth="2" /><circle cx="24" cy="24" r="8" fill="none" stroke="#fff" strokeWidth="3" /><circle cx="34" cy="14" r="2.5" fill="#fff" /></>,
    star: <path d="M24 3l6 14 15 2-11 10 3 15-13-8-13 8 3-15L3 19l15-2z" fill="#ffe14d" stroke="#000" strokeWidth="2" strokeLinejoin="round" />,
    film: <><rect x="4" y="10" width="40" height="28" fill="#fff" stroke="#000" strokeWidth="2" /><path d="M4 16h40M4 32h40" stroke="#000" strokeWidth="2" /><path d="M20 20v8l8-4z" fill="#ff4fa3" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" /></>,
    cal: <><rect x="5" y="9" width="38" height="33" fill="#fff" stroke="#000" strokeWidth="2" /><rect x="5" y="9" width="38" height="8" fill="#ff4fa3" stroke="#000" strokeWidth="2" /><path d="M14 5v8M34 5v8" stroke="#000" strokeWidth="2.5" /><path d="M12 24h6M21 24h6M30 24h6M12 32h6M21 32h6" stroke="#000" strokeWidth="3" /></>,
    info: <><circle cx="24" cy="24" r="20" fill="#1f5fd6" stroke="#000" strokeWidth="2" /><path d="M24 21v14M24 13v4" stroke="#fff" strokeWidth="4" /></>,
  }[name];
  return <svg viewBox="0 0 48 48" aria-hidden="true">{p}</svg>;
};

const Win = ({ title, icon, children, className = "", onClose, style, collapsible, count }) => {
  const { t } = useT();
  const [shut, setShut] = useState(!!collapsible);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const id = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => clearTimeout(id);
  }, [shut]);
  return (
  <div className={`win ${className}`} style={style}>
    <div className="win__bar">
      <span className="win__title">{icon}{title}</span>
      <span className="win__btns">
        {collapsible
          ? <button onClick={() => setShut(!shut)} aria-expanded={!shut} aria-label={t(shut ? "open" : "minimize")}>{shut ? "▫" : "_"}</button>
          : <span aria-hidden="true">_</span>}
        {collapsible ? null : <span aria-hidden="true">▫</span>}
        {onClose ? <button onClick={onClose} aria-label={t("closeWin")}>×</button> : <span aria-hidden="true">×</span>}
      </span>
    </div>
    {collapsible && shut
      ? <button className="win__open" onClick={() => setShut(false)}>▸ {t("open")}{count ? ` · ${count} ${t("objects")}` : ""}</button>
      : children}
  </div>
  );
};

/* peças de colagem soltas: estrelas, smiley, pastas... */
const burstPoints = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2, r = i % 2 ? 15 : 24;
  return `${24 + r * Math.cos(a)},${24 + r * Math.sin(a)}`;
}).join(" ");
const DECO = {
  star: (c = "#ffe14d", s = 44) => <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden="true"><path d="M24 2C26 16 32 22 46 24 32 26 26 32 24 46 22 32 16 26 2 24 16 22 22 16 24 2Z" fill={c} stroke="#000" strokeWidth="2" strokeLinejoin="round" /></svg>,
  burst: (c = "#ff4fa3", s = 80) => <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden="true"><polygon points={burstPoints} fill={c} stroke="#000" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  smile: (c = "#ffe14d", s = 70) => <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill={c} stroke="#000" strokeWidth="2.5" /><circle cx="17" cy="19" r="2.8" fill="#000" /><circle cx="31" cy="19" r="2.8" fill="#000" /><path d="M12 28c3 9 21 9 24 0" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" /></svg>,
  arrow: (c = "#fff", s = 56) => <svg width={s} height={s * 1.2} viewBox="0 0 20 24" aria-hidden="true"><path d="M1 1v18l5-4 3 8 4-2-3-7h7z" fill={c} stroke="#000" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
};
function Deco({ items }) {
  const ref = useRef(null);
  useGSAP(() => {
    if (reduced()) return;
    const section = ref.current.parentElement;
    gsap.utils.toArray(".deco", ref.current).forEach((el) => {
      const inner = el.firstChild;
      gsap.set(inner, { rotate: +el.dataset.rot || 0 });
      gsap.to(inner, { y: "+=10", rotate: "+=4", duration: gsap.utils.random(2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(el, { yPercent: (+el.dataset.speed || 0) * 60, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
    });
    const folders = gsap.utils.toArray(".deco--folder", ref.current);
    if (folders.length) Draggable.create(folders, { type: "x,y", onPress() { this.target.style.zIndex = 12; } });
  }, { scope: ref });
  return (
    <div ref={ref} aria-hidden="true">
      {items.map(({ k, c, s, label, text, rot, speed = 0.5, keep, ...pos }, i) => (
        <span key={i} className={`deco ${k === "folder" ? "deco--folder" : ""} ${keep ? "deco--keep" : ""}`} style={pos} data-rot={rot} data-speed={speed}>
          <span className="deco__in">
            {k === "folder" && <><Ico name="folder" /><span className="lbl">{label}</span></>}
            {k === "tag" && <span className="tag">{text}</span>}
            {k === "pill" && <span className="pill">{text}</span>}
            {DECO[k] && DECO[k](c, s)}
          </span>
        </span>
      ))}
    </div>
  );
}

function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ref.current.classList.toggle("hot", !!e.target.closest("a,button,.drag,.file,.deco--folder"));
    };
    const click = (e) => {
      if (reduced()) return;
      for (let i = 0; i < 5; i++) {
        const h = document.createElement("span");
        h.className = "heart-pop";
        h.textContent = ["♥", "✦", "☻"][i % 3];
        h.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;color:${i % 2 ? "#ff4fa3" : "#ffffff"}`;
        document.body.appendChild(h);
        gsap.to(h, { x: gsap.utils.random(-60, 60), y: gsap.utils.random(-80, -20), rotation: gsap.utils.random(-50, 50), opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => h.remove() });
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("click", click); };
  }, []);
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <svg viewBox="0 0 20 24"><path d="M1 1v18l5-4 3 8 4-2-3-7h7z" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" /></svg>
    </div>
  );
}

function Loader({ onDone }) {
  const { t } = useT();
  const ref = useRef(null);
  const fill = useRef(null);
  useGSAP(() => {
    if (reduced()) { onDone(); return; }
    const o = { v: 0 };
    gsap.timeline({ onComplete: onDone })
      .to(o, { v: 100, duration: 1.8, ease: "steps(14)", onUpdate: () => { fill.current.style.width = o.v + "%"; } })
      .to(ref.current, { autoAlpha: 0, duration: 0.3 }, "+=0.2");
  }, { scope: ref });
  return (
    <div ref={ref} className="loader" role="status" aria-label={t("loader.aria")}>
      <Win title={t("loader.title")} icon={<span>♥</span>}>
        <div className="win__body">
          <p>{t("loader.text")}</p>
          <div className="sunken loader__track"><div ref={fill} className="loader__fill" /></div>
        </div>
      </Win>
    </div>
  );
}

const SECTIONS = ["top", "about", "services", "work", "desk", "contact"];

function Taskbar({ onShutdown }) {
  const { t: tr, lang, setLang } = useT();
  const [t, setT] = useState(() => new Date());
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("top");
  useEffect(() => { const i = setInterval(() => setT(new Date()), 15000); return () => clearInterval(i); }, []);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (e) => { if (!e.target.closest(".startmenu, .start")) setMenu(false); };
    const esc = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("pointerdown", close); window.removeEventListener("keydown", esc); };
  }, [menu]);
  const pick = (id) => { setMenu(false); go(id); };
  return (
    <>
      {menu && (
        <div className="startmenu" role="menu">
          <div className="startmenu__side"><b>Bruna 95</b></div>
          <ul>
            {SECTIONS.slice(1).map((id) => <li key={id}><button role="menuitem" onClick={() => pick(id)}>{tr("nav." + id)}</button></li>)}
            <li><hr /></li>
            <li><button role="menuitem" onClick={() => { setMenu(false); onShutdown(); }}>{tr("shutdown")}</button></li>
          </ul>
        </div>
      )}
      <nav className="taskbar" aria-label={tr("nav.aria")}>
        <button className={`b95 start ${menu ? "is-on" : ""}`} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
          <span aria-hidden="true" style={{ color: "var(--pink)" }}>♥</span> {tr("start")}
        </button>
        <span className="grip" aria-hidden="true" />
        <div className="taskbar__tasks">
          {SECTIONS.map((id) => (
            <button key={id} className={`b95 ${active === id ? "is-on" : ""}`} aria-current={active === id ? "true" : undefined} onClick={() => go(id)}>{tr("nav." + id)}</button>
          ))}
        </div>
        <div className="tray"><button className="b95 lang" onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label={tr("lang")}>{lang === "pt" ? "PT · en" : "EN · pt"}</button><span aria-hidden="true">♪</span><time>{t.toLocaleTimeString(lang === "pt" ? "pt-PT" : "en-GB", { hour: "2-digit", minute: "2-digit" })}</time></div>
      </nav>
    </>
  );
}

const me = [{ img: "img/bruna_1.jpg", thumb: "img/thumb/bruna_1.webp", name: "bruna.jpg" }, { img: "img/bruna_2.jpg", thumb: "img/thumb/bruna_2.webp", name: "bruna_02.jpg" }];

function Hero({ ready }) {
  const { t } = useT();
  const [cur, setCur] = useState(0);
  const first = useRef(true);
  const topImg = useRef(null);
  const n = me.length;
  const next = (cur + 1) % n, prev = (cur - 1 + n) % n;

  useGSAP(() => {
    if (reduced()) return;
    if (!ready) { gsap.set(".hero__title i", { opacity: 0 }); return; }
    gsap.fromTo(".hero__title i", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.7, ease: "back.out(2)" });
  }, { dependencies: [ready] });

  useGSAP(() => {
    if (first.current) { first.current = false; return; }
    if (reduced()) return;
    gsap.fromTo(topImg.current, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "steps(8)" });
  }, { dependencies: [cur] });

  return (
    <section id="top" className="hero">
      {/* colagem intencional: o texto fica por trás das janelas */}
      <div className="ghost ghost--low" aria-hidden="true" data-impeccable-ignore="text-occlusion" style={{ "--n": t("ghost.top").length }}>{t("ghost.top")}</div>
      <Deco items={[
        { k: "star", left: "47%", top: "7%", s: 52, rot: -10, speed: 0.6 },
        { k: "smile", left: "2%", bottom: "6%", s: 84, rot: -8, speed: 0.4, keep: true },
        { k: "burst", right: "3%", bottom: "14%", s: 96, rot: 12, speed: 0.8 },
        { k: "star", c: "#7ec8ff", left: "40%", bottom: "16%", s: 30, rot: 20, speed: 0.3 },
        { k: "tag", right: "36%", top: "4%", zIndex: 4, text: t("hero.tag"), rot: -4, speed: 0.4 },
        { k: "arrow", left: "36%", top: "58%", s: 58, rot: -8, speed: 0.5 },
      ]} />
      <div id="frame">
        <div className="icons">
          <button className="dicon" onClick={() => go("work")}><Ico name="folder" /><span>{t("nav.work")}</span></button>
          <button className="dicon" onClick={() => go("about")}><Ico name="note" /><span>{t("about.file")}</span></button>
          <button className="dicon" onClick={() => go("desk")}><Ico name="image" /><span>{t("nav.desk")}</span></button>
          <button className="dicon" onClick={() => go("contact")}><Ico name="mail" /><span>{t("nav.contact")}</span></button>
        </div>
        <Win title={t("welcome")} icon={<span aria-hidden="true">♥</span>} style={{ position: "relative", zIndex: 2 }}>
          <div className="win__body sunken" style={{ margin: 6, padding: "22px 22px 26px" }}>
            <h1 className="hero__title" aria-label="Bruna, social media">
              {["BRUNA", "SOCIAL MEDIA"].map((w) => (
                <span key={w} className="w" aria-hidden="true">{w.split("").map((c, i) => <i key={i}>{c === " " ? "\u00a0" : c}</i>)}</span>
              ))}
            </h1>
            <p className="hero__sub">{t("hero.sub")}</p>
            <div className="hero__btns">
              <button className="b95 b95--def" onClick={() => go("work")}>{t("hero.see")}</button>
              <a className="b95" href={IG} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </Win>
        <div className="hero__visual" style={{ position: "relative", zIndex: 2 }}>
          <Win title={me[cur].name}>
            <div className="sunken" style={{ margin: 4 }}>
              <div className="hero__photo">
                <img src={me[prev].img} alt="" />
                <img ref={topImg} src={me[cur].img} alt={me[cur].name} />
              </div>
            </div>
          </Win>
          <span className="pill hero__pill">@gabebruu</span>
          <button className="b95 hero__next" onClick={() => setCur(next)} aria-label={t("hero.nextAria")}>
            <img src={me[next].thumb} alt="" />{t("hero.next")}
          </button>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const { t } = useT();
  const base = t("ticker");
  const words = [...base, ...base, ...base, ...base];
  return (
    <div className="ticker sunken" style={{ background: "var(--silver)", position: "relative", zIndex: 2 }} aria-hidden="true">
      <div className="ticker__track">{words.map((w, i) => <span key={i}>{w} ♥</span>)}</div>
    </div>
  );
}

function AnimatedTitle({ text, className = "" }) {
  const ref = useRef(null);
  useGSAP(() => {
    if (reduced()) { gsap.set(".animated-word", { opacity: 1, transform: "none" }); return; }
    gsap.to(".animated-word", { opacity: 1, transform: "translate3d(0,0,0) rotateY(0) rotateX(0)", ease: "power2.inOut", stagger: 0.04, scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
  }, { scope: ref, dependencies: [text], revertOnUpdate: true }); // ao mudar de idioma o nº de palavras muda: anima de novo, senão as novas ficam invisíveis
  return (
    <h2 ref={ref} className={`animated-title ${className}`}>
      {text.split(" ").map((w, i) => <span key={i} className="animated-word">{w}&nbsp;</span>)}
    </h2>
  );
}

const COLORS = ["#ff4fa3", "#e8392e", "#ff8a00", "#c99a00", "#2fae4f", "#00a99d", "#2b6fe0", "#7b3fe4", "#c23fd1", "#555555"];

/* mini Paint: desenha com o rato; a cor também muda o tema */
function Paint() {
  const { t } = useT();
  const cv = useRef(null);
  const [color, setColor] = useState(COLORS[0]);
  const colorRef = useRef(color);
  useEffect(() => {
    const c = cv.current;
    c.width = c.clientWidth; c.height = c.clientHeight;
    const ctx = c.getContext("2d");
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 5;
    let drawing = false;
    const pos = (e) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * (c.width / r.width), (e.clientY - r.top) * (c.height / r.height)]; };
    const down = (e) => { drawing = true; c.setPointerCapture(e.pointerId); ctx.strokeStyle = colorRef.current; ctx.beginPath(); ctx.moveTo(...pos(e)); ctx.lineTo(...pos(e)); ctx.stroke(); };
    const move = (e) => { if (!drawing) return; ctx.lineTo(...pos(e)); ctx.stroke(); };
    const up = () => { drawing = false; };
    c.addEventListener("pointerdown", down); c.addEventListener("pointermove", move); c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    return () => { c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move); c.removeEventListener("pointerup", up); c.removeEventListener("pointercancel", up); };
  }, []);
  const pick = (col) => { setColor(col); colorRef.current = col; document.documentElement.style.setProperty("--pink", col); };
  const clear = () => { const c = cv.current; c.getContext("2d").clearRect(0, 0, c.width, c.height); };
  return (
    <Win title={t("paint.title")} className="paint" icon={<span aria-hidden="true">✎</span>}>
      <div className="win__menu" aria-hidden="true"><span>{t("menu.file")}</span><span>{t("menu.edit")}</span><span>{t("menu.colors")}</span></div>
      <div className="row">
        <div className="tools" aria-hidden="true">{["✎", "▭", "◯", "A", "⌫", "⬚", "✂", "⌕"].map((t) => <span key={t}>{t}</span>)}</div>
        <div className="sunken"><canvas ref={cv} aria-label={t("paint.area")} /></div>
      </div>
      <div className="palette" role="group" aria-label={t("colors")}>
        {COLORS.map((col) => <button key={col} style={{ background: col }} aria-label={`${t("color")} ${col}`} aria-pressed={color === col} onClick={() => pick(col)} />)}
        <button className="b95" style={{ gridColumn: "span 2", aspectRatio: "auto", padding: 0, fontSize: 12, justifyContent: "center", minHeight: 20 }} onClick={clear}>{t("clear")}</button>
      </div>
      <div className="status"><span>{t("paint.status")}</span></div>
    </Win>
  );
}

function About() {
  const { t } = useT();
  const BIO = t("about.bio");
  const root = useRef(null);
  const tl = useRef(null);
  const [n, setN] = useState(0);
  const play = () => {
    tl.current?.kill();
    if (reduced()) { setN(BIO.length); return; }
    setN(0);
    const o = { v: 0 };
    tl.current = gsap.timeline()
      .set(".about .back", { opacity: 0 })
      .fromTo(".about .cur", { x: 110, y: 90, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.9, ease: "power2.out" })
      .to(".about .startbtn", { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 })
      .to(".about .back", { opacity: 1, scale: 1, stagger: 0.09, duration: 0.25, ease: "back.out(2)" }, "<")
      .to(o, { v: BIO.length, duration: BIO.length * 0.03, ease: "none", onUpdate: () => setN(Math.floor(o.v)) });
  };
  useGSAP(() => {
    if (reduced()) { setN(BIO.length); return; }
    ScrollTrigger.create({ trigger: root.current, start: "top 60%", once: true, onEnter: play });
    return () => tl.current?.kill();
  }, { scope: root });
  return (
    <section id="about" ref={root} className="section about">
      <div className="ghost" aria-hidden="true" style={{ "--n": t("ghost.about").length }}>{t("ghost.about")}</div>
      <Deco items={[
        { k: "folder", label: "2025", left: "2.5%", top: "20%", speed: 0.3 },
        { k: "folder", label: "2024", left: "2.5%", top: "34%", speed: 0.5 },
        { k: "folder", label: "2023", left: "2.5%", top: "48%", speed: 0.7 },
        { k: "star", right: "4%", top: "12%", s: 56, rot: 14, speed: 0.6 },
        { k: "burst", right: "2%", top: "56%", s: 90, rot: -6, speed: 0.4 },
        { k: "smile", left: "45%", bottom: "4%", s: 64, rot: 8, speed: 0.5, keep: true },
        { k: "tag", left: "6%", bottom: "9%", text: t("about.tag"), rot: 3, speed: 0.3 },
      ]} />
      <div className="wrap">
        <AnimatedTitle className="big" text={t("about.title")} />
        <div className="about__grid">
          <div className="cascade">
            {[4, 3, 2, 1, 0].map((i) => (
              <Win key={i} title={t("about.title")} className="back" style={{ "--i": i }}><div className="win__body" /></Win>
            ))}
            <Win title={t("about.title")} className="front">
              <div className="win__body">
                <p className="h3">{t("about.title")}</p>
                <span className="startwrap">
                  <button className="b95 b95--def startbtn" onClick={play}>Start</button>
                  <span className="cur" aria-hidden="true">{DECO.arrow("#fff", 44)}</span>
                </span>
              </div>
            </Win>
          </div>
          <div>
            <Win title={t("about.notepad")} className="notepad" icon={<span aria-hidden="true">▤</span>}>
              <div className="win__menu" aria-hidden="true"><span>{t("menu.file")}</span><span>{t("menu.edit")}</span><span>{t("menu.search")}</span><span>{t("menu.help")}</span></div>
              <div className="sunken" style={{ margin: 3 }}><p className="sr-only">{BIO}</p><pre aria-hidden="true">{BIO.slice(0, n)}<span className="caret" /></pre></div>
            </Win>
            <Win title={t("about.ask")} className="ask" icon={<Ico name="info" />}>
              <div className="win__body">
                <p>{t("about.question")}</p>
                <div className="ask__btns">
                  <button className="b95 b95--def" onClick={() => go("contact")}>{t("yes")}</button>
                  <button className="b95" onClick={() => go("contact")}>{t("yes2")}</button>
                </div>
              </div>
            </Win>
          </div>
          <div>
            <Paint />
            <Win title="bruna.jpg" className="polaroid"><div className="sunken" style={{ margin: 4 }}><img src="img/thumb/bruna_2.webp" alt="" loading="lazy" /></div></Win>
          </div>
        </div>
      </div>
    </section>
  );
}

// escreve direto no estilo (transform + --x/--y/--o): sem re-render a cada movimento do rato
function Tilt({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(600px) rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 8}deg)`;
    el.style.setProperty("--x", `${e.clientX - r.left}px`); el.style.setProperty("--y", `${e.clientY - r.top}px`); el.style.setProperty("--o", 1);
  };
  const leave = () => { ref.current.style.transform = ""; ref.current.style.setProperty("--o", 0); };
  return <div ref={ref} className="tilt" onMouseMove={move} onMouseLeave={leave}>{children}</div>;
}

function Viewer({ i, setI }) {
  const { t } = useT();
  const p = projects[i];
  const dlg = useRef(null);
  // ponytail: <dialog> nativo dá foco preso, fundo inerte e Escape; só falta devolver o foco
  useEffect(() => {
    const prev = document.activeElement;
    dlg.current.showModal();
    return () => prev?.focus();
  }, []);
  useEffect(() => {
    const k = (e) => {
      if (e.key === "ArrowRight") setI((i + 1) % projects.length);
      if (e.key === "ArrowLeft") setI((i - 1 + projects.length) % projects.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [i, setI]);
  return (
    <dialog ref={dlg} className="viewer-back" aria-label={p.name} onCancel={(e) => { e.preventDefault(); setI(null); }} onClick={(e) => e.target === e.currentTarget && setI(null)}>
      <Win title={`${p.name} - ${t("viewer.title")}`} className="viewer" onClose={() => setI(null)}>
        <div className="sunken"><img src={p.img} alt={`${pretty(p.name)}, ${t("client." + p.tag)}`} /></div>
        <div className="viewer__row">
          <span>{t("client." + p.tag)} · {t("note")}</span>
          <span style={{ display: "flex", gap: 6 }}>
            <button className="b95" onClick={() => setI((i - 1 + projects.length) % projects.length)}>{t("prev")}</button>
            <button className="b95" onClick={() => setI((i + 1) % projects.length)}>{t("next")}</button>
            <button className="b95 b95--def" onClick={() => setI(null)}>{t("close")}</button>
          </span>
        </div>
      </Win>
    </dialog>
  );
}

function Files({ tag, title, desc, setOpen }) {
  const { t } = useT();
  const list = projects.map((p, i) => ({ ...p, i })).filter((p) => p.tag === tag);
  return (
    <Win title={"C:" + String.fromCharCode(92) + title.replace("\\", String.fromCharCode(92))} className="reveal" icon={<Ico name="folder" />} collapsible count={list.length}>
      <p className="feed__desc">{desc}</p>
      <div className="win__menu" aria-hidden="true"><span>{t("menu.file")}</span><span>{t("menu.edit")}</span><span>{t("menu.view")}</span><span>{t("menu.help")}</span></div>
      <div className="sunken pane">
        {list.map((p) => (
          <button key={p.name} className="file" aria-label={`${pretty(p.name)}, ${t("client." + p.tag)}`} onClick={() => setOpen(p.i)}>
            <Tilt>
              <span className="file__thumb sunken" style={{ display: "block" }}>
                <img src={p.thumb} alt="" loading="lazy" />
                <span className="file__spot" />
              </span>
            </Tilt>
          </button>
        ))}
      </div>
      <div className="status"><span>{list.length} {t("objects")}</span><span>{t("work.click")}</span></div>
    </Win>
  );
}

function Work() {
  const { t } = useT();
  const [open, setOpen] = useState(null);
  const root = useRef(null);
  useGSAP(() => {
    if (reduced()) return;
    gsap.from(".file", { opacity: 0, y: 24, stagger: 0.06, duration: 0.5, ease: "steps(5)", scrollTrigger: { trigger: ".pane", start: "top 85%" } });
  }, { scope: root });
  return (
    <section id="work" ref={root} className="section">
      <div className="ghost" aria-hidden="true" style={{ "--n": t("ghost.work").length }}>{t("ghost.work")}</div>
      <Deco items={[
        { k: "star", left: "1%", top: "14%", s: 54, rot: -12, speed: 0.5 },
        { k: "smile", left: "0.5%", top: "58%", s: 70, rot: 10, speed: 0.4 },
        { k: "burst", c: "#7ec8ff", left: "1%", bottom: "6%", s: 76, rot: 6, speed: 0.7 },
      ]} />
      <div className="wrap">
        <AnimatedTitle className="big work__title" text={t("work.heading")} />
        <Files tag="lebuse" title="Lebuse Marketing" desc={t("work.lebuse")} setOpen={setOpen} />
        <div style={{ height: 36 }} />
        <Files tag="anarkitty" title="Anarkitty\Stories" desc={t("work.stories")} setOpen={setOpen} />
        <div style={{ height: 36 }} />
        <Files tag="vintage" title="ClothesRoom\Drops" desc={t("work.drops")} setOpen={setOpen} />
        <div style={{ height: 36 }} />
        <Files tag="art" title="Ilustracao" desc={t("work.art")} setOpen={setOpen} />
        <div style={{ height: 36 }} />
        <Feed tag="lebuse" title="Lebuse Reels" desc={t("work.lebuseReel")} />
        <div style={{ height: 36 }} />
        <Feed tag="anarkitty" title="Anarkitty Reels" desc={t("work.anarkitty")} />
        <div style={{ height: 36 }} />
        <Feed tag="vintage" title="Clothes Room Vintage" desc={t("work.vintage")} />
      </div>
      {open !== null && <Viewer i={open} setI={setOpen} />}
    </section>
  );
}

function Embed({ e }) {
  const { t } = useT();
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [h, setH] = useState(0);
  const fr = useRef(null);
  useEffect(() => {
    const on = (ev) => {
      if (!fr.current || ev.source !== fr.current.contentWindow) return;
      try {
        const m = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data;
        if (m && m.type === "MEASURE" && m.details && m.details.height) setH(Math.ceil(m.details.height));
      } catch { /* mensagem de outro tipo */ }
    };
    window.addEventListener("message", on);
    return () => window.removeEventListener("message", on);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <figure ref={ref} className="reel">
      <figcaption className="reel__bar"><span>{e.kind === "reel" ? "reel" : "post"}.ig</span><i aria-hidden="true">x</i></figcaption>
      <div className="reel__body" style={h ? { height: h } : undefined}>
        {seen
          ? <iframe ref={fr} title={e.title} src={`https://www.instagram.com/${e.kind}/${e.code}/embed`} loading="lazy" scrolling="no" allowFullScreen />
          : <div className="reel__cover"><b>{e.title}</b><small>{t("loading")}</small></div>}
      </div>
    </figure>
  );
}

// só toca um vídeo de cada vez
const solo = (e) => document.querySelectorAll("video").forEach((v) => v !== e.target && v.pause());

function Video({ e }) {
  return (
    <figure className="reel">
      <figcaption className="reel__bar"><span>{e.title}</span><i aria-hidden="true">x</i></figcaption>
      <div className="reel__body reel__body--video">
        <video src={e.src} poster={e.poster} controls preload="none" playsInline onPlay={solo} aria-label={e.title} />
      </div>
    </figure>
  );
}

function Feed({ tag, title, desc }) {
  const { t } = useT();
  const local = videos.filter((e) => e.tag === tag);
  const list = local.length ? local : embeds.filter((e) => e.tag === tag);
  return (
    <Win title={"C:" + String.fromCharCode(92) + title} className="reveal" icon={<Ico name="insta" />} collapsible count={list.length}>
      <p className="feed__desc">{desc}</p>
      <div className="sunken reels">{list.map((e) => (e.src ? <Video key={e.src} e={e} /> : <Embed key={e.code} e={e} />))}</div>
      <div className="status"><span>{list.length} {t("objects")}</span><span>{t(local.length ? "videos" : "embedded")}</span></div>
    </Win>
  );
}

const deskItems = projects.filter((p) => p.desk);

function Desk() {
  const { t } = useT();
  const ref = useRef(null);
  const [h, setH] = useState(560);
  const place = () => {
    const U = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16, W = ref.current.clientWidth, cols = Math.max(1, Math.floor((W - 20 * U) / (220 * U))), rows = Math.ceil(deskItems.length / cols);
    setH((rows * 270 + 80) * U); ref.current.style.height = (rows * 270 + 80) * U + "px"; // altura já aplicada antes dos limites do Draggable
    // linhas equilibradas (13 em 4 colunas = 4,3,3,3) e centradas, para a última não ficar com uma janela sozinha
    const base = Math.floor(deskItems.length / rows), extra = deskItems.length % rows;
    const left = Math.max(12, (W / U - cols * 220) / 2);
    let r = 0, c = 0;
    gsap.utils.toArray(".drag").forEach((el, i) => {
      const len = base + (r < extra);
      gsap.set(el, { display: "block", scale: 1, x: (left + (c + (cols - len) / 2) * 220 + (i % 2) * 6) * U, y: (62 + r * 270) * U, rotate: (i % 3 - 1) * 2 });
      if (++c === len) { c = 0; r++; }
    });
  };
  useGSAP(() => {
    place();
    const els = gsap.utils.toArray(".drag");
    // em ecrã tátil só a barra de título arrasta; o resto da janela deixa fazer scroll à página
    const touch = window.matchMedia("(pointer: coarse)").matches;
    els.forEach((el) => Draggable.create(el, {
      trigger: touch ? el.querySelector(".win__bar") : el,
      bounds: ref.current, type: "x,y", edgeResistance: 0.8, dragClickables: false,
      onPress() { els.forEach((e) => (e.style.zIndex = 1)); this.target.style.zIndex = 10; gsap.to(this.target, { rotate: 0, duration: 0.15 }); },
    }));
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, { scope: ref });
  const close = (e) => gsap.to(e.currentTarget.closest(".drag"), { scale: 0, duration: 0.25, ease: "power2.in", onComplete() { this.targets()[0].style.display = "none"; } });
  return (
    <section id="desk" className="section">
      <Deco items={[
        { k: "star", left: "5%", top: "10%", s: 50, rot: 12, speed: 0.5 },
        { k: "star", c: "#ff4fa3", right: "6%", top: "16%", s: 40, rot: -14, speed: 0.7 },
        { k: "burst", right: "3%", bottom: "8%", s: 80, rot: 8, speed: 0.5 },
        { k: "smile", left: "3%", bottom: "10%", s: 66, rot: -10, speed: 0.4 },
      ]} />
      <div className="wrap">
        <AnimatedTitle className="big" text={t("desk.title")} />
        <Win title={t("desk.win")} className="desk-win" style={{ marginTop: 28 }}>
          <div ref={ref} className="desk sunken" style={{ height: h }}>
            <div className="desk__bar">
              <span className="tooltip">{t("desk.hint")}</span>
              <button className="b95" onClick={place}>{t("desk.reset")}</button>
            </div>
            {deskItems.map((p) => (
              <div key={p.name} className="drag">
                <Win title="" onClose={close}>
                  <div className="win__body"><img src={p.thumb} alt={`${pretty(p.name)}, ${t("client." + p.tag)}`} loading="lazy" /><p>{t("client." + p.tag)}</p></div>
                </Win>
              </div>
            ))}
          </div>
        </Win>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useT();
  const list = t("services");
  return (
    <section id="services" className="section">
      <div className="ghost" aria-hidden="true" style={{ "--n": t("ghost.services").length }}>{t("ghost.services")}</div>
      <div className="wrap">
        <AnimatedTitle className="big" text={t("services.title")} />
        <Win title={"C:" + String.fromCharCode(92) + t("nav.services")} className="services reveal" icon={<Ico name="folder" />}>
          <div className="win__menu" aria-hidden="true"><span>{t("menu.file")}</span><span>{t("menu.edit")}</span><span>{t("menu.view")}</span><span>{t("menu.help")}</span></div>
          <div className="sunken svc-grid">
            {list.map((s) => (
              <div key={s.n} className="svc">
                <Ico name={s.i} />
                <h3>{s.n}</h3>
                <ul>{s.d.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="status"><span>{list.length} {t("objects")}</span><span>{t("services.status")}</span></div>
        </Win>
      </div>
    </section>
  );
}

/* clipe assistente (desenho próprio): clica para a próxima dica */
function Clippy() {
  const { t } = useT();
  const tips = t("clippy");
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const next = () => {
    setI((i + 1) % tips.length);
    if (!reduced()) gsap.fromTo(ref.current, { rotate: -14 }, { rotate: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
  };
  return (
    <div className="clippy">
      <button ref={ref} className="clippy__btn" onClick={next} aria-label={t("clippy.next")}>
      <svg viewBox="0 0 40 64" aria-hidden="true">
        <path d="M14 60V16a8 8 0 0 1 16 0v34a5 5 0 0 1-10 0V24" fill="none" stroke="#4a4a4a" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M14 60V16a8 8 0 0 1 16 0v34a5 5 0 0 1-10 0V24" fill="none" stroke="#e6e6e6" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="13" cy="21" rx="4.5" ry="5.5" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="27" cy="21" rx="4.5" ry="5.5" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <circle cx="14.5" cy="22" r="2" /><circle cx="28.5" cy="22" r="2" />
        <path d="M8 12q5-4 9 0M23 12q5-4 9 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      </svg>
      </button>
      <p className="clippy__tip" aria-live="polite">{tips[i]}</p>
    </div>
  );
}

function Contact() {
  const { t } = useT();
  return (
    <section id="contact" className="section">
      <div className="ghost" aria-hidden="true" style={{ "--n": t("ghost.contact").length }}>{t("ghost.contact")}</div>
      <Deco items={[
        { k: "folder", label: t("contacts"), left: "3%", top: "22%", speed: 0.4 },
        { k: "star", right: "5%", top: "12%", s: 56, rot: 10, speed: 0.6 },
        { k: "burst", left: "5%", bottom: "12%", s: 90, rot: -8, speed: 0.5 },
        { k: "smile", right: "4%", bottom: "14%", s: 70, rot: 8, speed: 0.4 },
        { k: "tag", left: "40%", top: "6%", text: t("contact.tag"), rot: -3, speed: 0.3 },
      ]} />
      <div className="wrap">
        <AnimatedTitle className="big" text={t("contact.title")} />
        <div className="contact__grid">
          <Win title={t("contact.dialog")} className="dialog reveal" icon={<span aria-hidden="true">♥</span>}>
            <div className="dialog__row">
              <div>
                <h2>{t("about.question")}</h2>
                <p>{t("contact.p")}</p>
              </div>
            </div>
            <Clippy />
            <div className="dialog__btns">
              <a className="b95 b95--def" href={IG} target="_blank" rel="noreferrer">{t("contact.ig")}</a>
              <a className="b95" href="mailto:gabebruu@icloud.com?subject=Portef%C3%B3lio%20Bruna">{t("contact.mail")}</a>
            </div>
          </Win>
          <Win title={t("contact.card")} className="card reveal" icon={<Ico name="star" />}>
            <ul>
              <li><Ico name="mail" /><a href="mailto:gabebruu@icloud.com">gabebruu@icloud.com</a></li>
              <li><Ico name="insta" /><a href={IG} target="_blank" rel="noreferrer">@gabebruu</a></li>
            </ul>
          </Win>
        </div>
        <p className="foot">{t("contact.foot")}</p>
      </div>
    </section>
  );
}

function Shutdown({ onBack }) {
  const { t } = useT();
  useEffect(() => {
    const k = () => onBack();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onBack]);
  return (
    <div className="off-screen" onClick={onBack} role="button" tabIndex={0}>
      <p>{t("off.text")}<br /><br /><small>{t("off.back")}</small></p>
    </div>
  );
}

function useScrollFx() {
  useGSAP(() => {
    if (reduced()) return;
    gsap.utils.toArray(".reveal").forEach((el, i) => {
      gsap.from(el, { y: 80, opacity: 0, rotate: i % 2 ? 1.5 : -1.5, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.utils.toArray(".reel").forEach((el) => {
      gsap.from(el, { scale: 0.92, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%" } });
    });
    gsap.utils.toArray(".ghost").forEach((g) => {
      gsap.fromTo(g, { xPercent: -5 }, { xPercent: 5, ease: "none", scrollTrigger: { trigger: g.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true } });
  }, []);
}

export default function App() {
  useScrollFx();
  const [ready, setReady] = useState(() => location.search.includes("skip")); // ?skip salta o arranque
  const [off, setOff] = useState(false);
  const [lang, setLangState] = useState(detect);
  const setLang = (l) => { setLangState(l); try { localStorage.setItem("lang", l); } catch { /* sem storage */ } };
  const value = { lang, setLang, t: (k) => dict[lang][k] ?? k };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <LangCtx.Provider value={value}>
      <Cursor />
      <div className="progress" aria-hidden="true" />
      {!ready && <Loader onDone={() => setReady(true)} />}
      {off && <Shutdown onBack={() => setOff(false)} />}
      <Taskbar onShutdown={() => setOff(true)} />
      <main>
      <Hero ready={ready} />
      <div style={{ padding: "14px 0 0" }}><Ticker /></div>
      <About />
      <Services />
      <Work />
      <Desk />
      <Contact />
      </main>
    </LangCtx.Provider>
  );
}
