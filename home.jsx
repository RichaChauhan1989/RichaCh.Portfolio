// Home — stack with About + one card per case study
const { useEffect: useEffectH, useState: useStateH, useRef: useRefH } = React;

const PAD = (n) => String(n).padStart(2, "0");

// ── About card: decorative doodles, meta icons ──
const RUST = "#1C1C1A", OLIVE = "#6BAA7B", INK = "#111827", DOTGREY = "#D1D5DB";

function MetaIcon({ type }) {
  const p = { fill: "none", stroke: INK, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (type) {
    case "now": return <g><circle cx="12" cy="9" r="3.2" {...p} /><path d="M6 19 a6 6 0 0 1 12 0" {...p} /></g>;
    case "based": return <g><path d="M12 21 C7 15 5 12 5 9 a7 7 0 0 1 14 0 c0 3 -2 6 -7 12 Z" {...p} /><circle cx="12" cy="9" r="2.3" {...p} /></g>;
    case "exp": return <g><rect x="4" y="8" width="16" height="11" rx="2" {...p} /><path d="M9 8 V6 a2 2 0 0 1 2 -2 h2 a2 2 0 0 1 2 2 v2" {...p} /><path d="M4 13 h16" {...p} /></g>;
    case "focus": return <g><circle cx="12" cy="12" r="8" {...p} /><circle cx="12" cy="12" r="4" {...p} /><circle cx="12" cy="12" r="1.1" fill={INK} stroke="none" /></g>;
    case "scale": return <g><path d="M4 20 H20" {...p} /><path d="M6.5 20 V15" {...p} /><path d="M12 20 V10.5" {...p} /><path d="M17.5 20 V6" {...p} /></g>;
    default: return null;
  }
}

function DotGrid() {
  const dots = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) dots.push(<circle key={r + "-" + c} cx={5 + c * 13} cy={5 + r * 13} r="2.2" fill={DOTGREY} />);
  return <svg viewBox="0 0 36 36" width="100%" height="100%">{dots}</svg>;
}

function AboutDeco() {
  const sage = "#3a3a34";
  return (
    <div className="about-deco" aria-hidden="true">
      <span className="dc dc-wire">
        <svg viewBox="0 0 104 60" width="100%" height="100%">
          <rect x="3" y="6" width="52" height="42" rx="4" fill="none" stroke={sage} strokeWidth="1.8" />
          <rect x="3" y="2" width="9" height="9" rx="2" fill="#f0f1ec" stroke={sage} strokeWidth="1.8" />
          <path d="M3 6 L55 48 M55 6 L3 48" stroke={sage} strokeWidth="1.4" />
          <path d="M64 16 H100 M64 26 H92" stroke={sage} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>

      <span className="dc dc-purpose">
        <svg className="dp-arrow" viewBox="0 0 60 60" width="44" height="44">
          <path d="M40 54 C 40 30 30 20 18 12" fill="none" stroke={sage} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 20 L17 10 L27 14" fill="none" stroke={sage} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hw">Designing<br />with purpose</span>
      </span>

      <span className="dc dc-sticky">
        <span className="dn-paper"><span className="dn-tape" /><span className="hw">Solving complexity &rarr; Creating clarity</span></span>
        <svg className="dn-arrow" viewBox="0 0 64 70" width="64" height="70">
          <path d="M42 6 C 54 22 42 40 18 46" fill="none" stroke={sage} strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" />
          <circle cx="12" cy="48" r="4" fill="none" stroke={sage} strokeWidth="1.6" />
        </svg>
      </span>

      <span className="dc dc-flowdiag" style={{ display: "none" }}>
        <svg viewBox="0 0 122 58" width="100%" height="100%">
          <rect x="3" y="17" width="34" height="26" rx="6" fill="#fff" stroke={sage} strokeWidth="1.8" />
          <path d="M11 27 H29 M11 34 H23" stroke={sage} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M37 30 H71" stroke={sage} strokeWidth="1.7" strokeLinecap="round" />
          <rect x="71" y="17" width="34" height="26" rx="6" fill="#fff" stroke={sage} strokeWidth="1.8" />
          <path d="M80 30 L86 36 L97 23" fill="none" stroke={sage} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M110 10 L114 3 M116 18 L122 16 M112 24 L117 27" stroke={sage} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

const ABOUT_META = [
  { type: "now", k: "Now", v: "Open to new roles" },
  { type: "based", k: "Based", v: "New Zealand" },
  { type: "exp", k: "Experience", v: "4+ years" },
  { type: "focus", k: "Focus", v: "End-to-end product experience" }
];

function AboutCard({ idx, total, state, onClick, onHover, onExplore }) {
  return (
    <article
      className={`card about-card ${state}`}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover && onHover("leave")}
      onClick={onClick}
      aria-hidden={state !== "top" && state !== "peek" ? "true" : undefined}
    >
      <AboutDeco />
      <div className="card-body about-hero">
        <h1 className="about-h">
          <span className="ah-l1"><span className="wave" aria-hidden="true">👋</span> Hi! I'm</span>
          <span className="ah-name">Richa Chauhan</span>
          <span className="ah-role serif u-line">UX/UI Designer</span>
        </h1>
        <p className="about-sub">I make things that <span className="u-line">feel as good as they work</span> &mdash; for the people who actually have to live with them.</p>
      </div>
      <div className="card-foot about-foot">
        <div className="meta-row">
          {ABOUT_META.map((m, i) => (
            <div className="mi" key={i}>
              <span className="mi-icon"><svg viewBox="0 0 24 24" width="27" height="27"><defs><filter id={`rgh${i}`} x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed={i * 9 + 3} result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" /></filter></defs><g filter={`url(#rgh${i})`}><MetaIcon type={m.type} /></g></svg></span>
              <span className="mi-text">
                <span className="meta-label">{m.k}</span>
                <span className="meta-val">{m.v}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ThanksCard({ idx, total, state, onClick, onHover }) {
  return (
    <article
      className={`card thanks-card ${state}`}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover && onHover("leave")}
      onClick={onClick}
      aria-hidden={state !== "top" && state !== "peek" ? "true" : undefined}
    >
      <svg className="tfx tfx-spark" width="30" height="30" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true"><path d="M15 1 C17 8 22 13 29 15 C22 17 17 22 15 29 C13 22 8 17 1 15 C8 13 13 8 15 1 Z" /></svg>
      <svg className="tfx tfx-dots" width="40" height="40" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">{[0,1,2].map((r)=>[0,1,2].map((c)=>(<circle key={r+"-"+c} cx={5+c*14} cy={5+r*14} r="2.6" />)))}</svg>
      <svg className="tfx tfx-arrow" width="76" height="50" viewBox="0 0 76 50" fill="none" aria-hidden="true"><path d="M6 12 C 34 6 58 16 68 38" stroke="currentColor" strokeWidth="1.7" strokeDasharray="2 6" strokeLinecap="round" /><path d="M60 40 L70 39 L67 28" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div className="card-head">
        <span className="eyebrow on-dark"><span className="bar" />Let&rsquo;s talk</span>
      </div>
      <div className="thanks-body">
        <h2 className="thanks-headline">
          Thanks for stopping by
          <svg className="thanks-smile" width="48" height="34" viewBox="0 0 48 34" fill="none" aria-hidden="true"><circle cx="13" cy="9" r="2.6" fill="currentColor" /><circle cx="33" cy="9" r="2.6" fill="currentColor" /><path d="M9 18 C 17 31 31 31 39 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
        </h2>
        <p className="thanks-sub">If anything resonated, I'd love to hear from you. Let's build something together.</p>
        <div className="thanks-actions">
          <a className="thanks-btn primary" href="assets/Richa-Chauhan-Resume.pdf" download
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.stopPropagation(); onHover && onHover("leave"); }}
          >
            <span>Download résumé</span>
            <span className="thanks-arrow" aria-hidden="true">↓</span>
          </a>
          <a className="thanks-btn ghost" href="mailto:richasain1989@gmail.com"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.stopPropagation(); onHover && onHover("leave"); }}
          >
            <span>Say hi</span>
            <span className="thanks-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="thanks-btn ghost" href="https://www.linkedin.com/in/richa-chauhan-7ba436178/" target="_blank" rel="noopener"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.stopPropagation(); onHover && onHover("leave"); }}
          >
            <span>LinkedIn</span>
            <span className="thanks-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="thanks-email">richasain1989@gmail.com</p>
      </div>
    </article>
  );
}

const CARD_TINTS = { sphara: "peach", deloitte: "lav", techtds: "sand" };

// Per-card handwritten annotation, neutral grey/black (sticky note / dashed loop / sparkle)
const NOTE_VARIANT = { sphara: "sticky", deloitte: "loop", techtds: "sparkle" };
function NoteDoodle({ slug, text }) {
  const v = NOTE_VARIANT[slug] || "sparkle";
  const grey = "#9aa1ab", ink = "#2a2a26";
  if (v === "sticky") {
    return (
      <div className="pc-note note-sticky" aria-hidden="true">
        <div className="ns-paper">
          <span className="ns-tape" />
          <span className="hw">{text}</span>
        </div>
        <svg className="ns-arrow" viewBox="0 0 96 58" width="92" height="56">
          <path d="M84 8 C 62 16 36 30 18 48" fill="none" stroke={grey} strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" />
          <path d="M12 36 L17 50 L29 45" fill="none" stroke={grey} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (v === "loop") {
    return (
      <div className="pc-note note-loop" aria-hidden="true">
        <svg className="nl-arrow" viewBox="0 0 150 64" width="150" height="62">
          <path d="M8 8 L10 2 M5 13 L0 12 M11 16 L15 19" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M14 16 C 44 26 30 50 52 50 C 66 50 64 38 53 41 C 44 43 50 60 110 54" fill="none" stroke={grey} strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
        </svg>
        <span className="hw">{text}</span>
      </div>
    );
  }
  return (
    <div className="pc-note note-sparkle" aria-hidden="true">
      <svg className="np-spark" viewBox="0 0 40 40" width="38" height="38">
        <path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2Z" fill="none" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className="hw">{text}</span>
    </div>
  );
}


function SpharaScreen() {
  const ink = "#1C1C1A", line = "#33332e", grey = "#6B6B65";
  const clay = "#CF6B3F", claySoft = "#F7E3D6";
  const green = "#5E8C6A", greenSoft = "#E3EDE2";
  const slate = "#7A7A72", slateSoft = "#ECEAE5";
  const blob = "#EFE6DD", mapBg = "#E9E6E0", street = "#FFFFFF", streetSoft = "#D9D5CD", cream = "#FBFAF7";
  const F = { fontFamily: "Satoshi, sans-serif" };
  return (
    <svg className="doodle-screen sphara-scene" viewBox="0 0 540 384" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <clipPath id="sph-map"><rect x="258" y="84" width="270" height="210" rx="16" /></clipPath>
      </defs>

      {/* soft blob behind phone */}
      <path d="M150 70 C 92 80 70 138 80 196 C 88 248 64 300 118 340 C 172 378 252 372 300 340 C 346 310 330 252 334 200 C 338 150 352 98 300 78 C 252 60 204 62 150 70 Z" fill={blob} />

      {/* map panel */}
      <g clipPath="url(#sph-map)">
        <rect x="258" y="84" width="270" height="210" fill={mapBg} />
        <path d="M258 150 H528" stroke={street} strokeWidth="8" />
        <path d="M258 226 H528" stroke={streetSoft} strokeWidth="5" />
        <path d="M340 84 V294" stroke={street} strokeWidth="8" />
        <path d="M444 84 V294" stroke={streetSoft} strokeWidth="5" />
        <path d="M258 104 L528 244" stroke={streetSoft} strokeWidth="4" opacity="0.55" />
        <path d="M300 294 L420 84" stroke={streetSoft} strokeWidth="4" opacity="0.45" />
      </g>
      <rect x="258" y="84" width="270" height="210" rx="16" fill="none" stroke="#E2DED6" strokeWidth="1" />

      {/* route + destination pin */}
      <path d="M312 252 C 366 240 384 196 470 156" fill="none" stroke={clay} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="312" cy="252" r="4.5" fill="#fff" stroke={clay} strokeWidth="2" />
      <circle cx="470" cy="150" r="22" fill={clay} opacity="0.16" />
      <path d="M470 128 c -10 0 -17 7 -17 17 c 0 12 17 28 17 28 c 0 0 17 -16 17 -28 c 0 -10 -7 -17 -17 -17 Z" fill={clay} />
      <circle cx="470" cy="146" r="5.5" fill="#fff" />

      {/* help-on-the-way card */}
      <rect x="368" y="226" width="152" height="60" rx="11" fill="#fff" stroke="#EEEAE2" strokeWidth="1" />
      <rect x="380" y="236" width="50" height="16" rx="8" fill={greenSoft} />
      <circle cx="391" cy="244" r="2.4" fill={green} />
      <text x="416" y="248" fontSize="8.5" fontWeight="700" fill={green} textAnchor="middle" {...F}>Active</text>
      <text x="380" y="270" fontSize="11" fontWeight="700" fill={ink} {...F}>Help is on the way</text>
      <text x="380" y="282" fontSize="8.5" fill={grey} {...F}>ETA &mdash; 03:24 mins</text>

      {/* phone */}
      <rect x="128" y="34" width="168" height="336" rx="30" fill={ink} />
      <rect x="136" y="42" width="152" height="320" rx="23" fill={cream} />
      <rect x="190" y="52" width="44" height="11" rx="5.5" fill={ink} />

      {/* SOS */}
      <circle cx="212" cy="98" r="20" fill={claySoft} />
      <text x="212" y="102" fontSize="11" fontWeight="800" fill={clay} textAnchor="middle" {...F}>SOS</text>

      {/* heading */}
      <text x="156" y="150" fontSize="15.5" fontWeight="700" fill={ink} {...F}>How can</text>
      <text x="156" y="170" fontSize="15.5" fontWeight="700" fill={ink} {...F}>we help you?</text>

      {/* category tiles */}
      <rect x="148" y="190" width="40" height="46" rx="11" fill={greenSoft} />
      <path d="M168 204 v15 M160 211 h16" stroke={green} strokeWidth="3" strokeLinecap="round" />
      <text x="168" y="250" fontSize="7.5" fill={grey} textAnchor="middle" {...F}>Medical</text>
      <rect x="194" y="190" width="40" height="46" rx="11" fill={slateSoft} />
      <path d="M214 202 l9 3 v6 c0 6 -5 9 -9 11 c -4 -2 -9 -5 -9 -11 v-6 Z" fill="none" stroke={slate} strokeWidth="2" strokeLinejoin="round" />
      <text x="214" y="250" fontSize="7.5" fill={grey} textAnchor="middle" {...F}>Police</text>
      <rect x="240" y="190" width="40" height="46" rx="11" fill={claySoft} />
      <path d="M260 200 c 6 6 8 10 8 14 c 0 5 -4 8 -8 8 c -4 0 -8 -3 -8 -8 c 0 -2 1 -4 2 -6 c 1 3 3 3 3 1 c 0 -3 1 -6 3 -9 Z" fill={clay} />
      <text x="260" y="250" fontSize="7.5" fill={grey} textAnchor="middle" {...F}>Fire</text>

      {/* location bar */}
      <rect x="148" y="300" width="132" height="30" rx="10" fill="#fff" stroke="#E6E2DB" strokeWidth="1.5" />
      <path d="M160 308 c -3 0 -5 2 -5 5 c 0 4 5 8 5 8 c 0 0 5 -4 5 -8 c 0 -3 -2 -5 -5 -5 Z" fill={ink} />
      <text x="174" y="319" fontSize="9" fill={ink} {...F}>Mumbai, India</text>
      <path d="M262 315 h10 M268 311 l4 4 -4 4" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpharaFx() {
  const ink = "#2a2a26", clay = "#1C1C1A";
  return (
    <div className="sphara-fx" aria-hidden="true">
      <svg className="fx fx-dots" width="38" height="38" fill="#cdd0da">
        {[0,1,2].map(r => [0,1,2].map(c => <circle key={r+"-"+c} cx={5+c*14} cy={5+r*14} r="2.6" />))}
      </svg>
      <svg className="fx fx-sparkle" width="34" height="34" fill={clay}>
        <path d="M17 1 C19 9 25 15 33 17 C25 19 19 25 17 33 C15 25 9 19 1 17 C9 15 15 9 17 1 Z" />
      </svg>
    </div>
  );
}

const SPHARA_PILLS = [
  { label: "Panic SOS", icon: "M8 2.2a3.4 3.4 0 0 1 3.4 3.4v2.6l1.3 1.8H3.3l1.3-1.8V5.6A3.4 3.4 0 0 1 8 2.2Z M6.6 12.4a1.5 1.5 0 0 0 2.8 0", dot: false },
  { label: "Live tracking", pin: true },
  { label: "Direct dispatch", dispatch: true },
  { label: "Offline SMS", chat: true },
  { label: "Languages", globe: true },
  { label: "Gesture trigger", hand: true },
];

function PillIcon({ p }) {
  const s = { fill: "none", stroke: "#3a3a34", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (p.pin) return (<svg width="15" height="15" viewBox="0 0 16 16"><path d="M8 1.6c-2.4 0-4.3 1.9-4.3 4.3 0 3.2 4.3 8 4.3 8s4.3-4.8 4.3-8c0-2.4-1.9-4.3-4.3-4.3Z" {...s} /><circle cx="8" cy="5.9" r="1.7" {...s} /></svg>);
  if (p.dispatch) return (<svg width="16" height="15" viewBox="0 0 18 16"><path d="M1.5 4.5h8.5v6.5H1.5Z M10 6.5h3l2.3 2.2v2.3H10Z" {...s} /><circle cx="5" cy="12.4" r="1.5" {...s} /><circle cx="12.6" cy="12.4" r="1.5" {...s} /><path d="M4.6 6.4v2.4M3.4 7.6h2.4" {...s} /></svg>);
  if (p.chat) return (<svg width="15" height="15" viewBox="0 0 16 16"><path d="M2 3.2h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6l-3 2.8V11.2H2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z" {...s} /><path d="M5 6.4h6M5 8.6h4" {...s} /></svg>);
  if (p.globe) return (<svg width="15" height="15" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.3" {...s} /><path d="M1.7 8h12.6M8 1.7c1.9 2 1.9 10.6 0 12.6M8 1.7c-1.9 2-1.9 10.6 0 12.6" {...s} /></svg>);
  if (p.hand) return (<svg width="15" height="15" viewBox="0 0 16 16"><path d="M5 8V4.4a1 1 0 0 1 2 0V7m0-.6V3.6a1 1 0 0 1 2 0V7m0-.4V4.2a1 1 0 0 1 2 0V8m0-1.4a1 1 0 0 1 2 0v3.2c0 2.4-1.8 4-4 4s-3.2-1-4-2.4L3 9c-.5-.8.5-1.8 1.3-1.2L5 8.5" {...s} /></svg>);
  return (<svg width="15" height="15" viewBox="0 0 16 16"><path d={p.icon} {...s} /></svg>);
}

function SpharaPhone() {
  const ink = "#1C1C1A", clay = "#CF6B3F", claySoft = "#F7E3D6";
  const green = "#5E8C6A", greenSoft = "#E3EDE2", slate = "#7A7A72", slateSoft = "#ECEAE5";
  const grey = "#6B6B65", cream = "#FBFAF7";
  const F = { fontFamily: "Satoshi, sans-serif" };
  return (
    <svg className="sph-phone" viewBox="0 0 150 312" aria-hidden="true">
      <rect x="5" y="4" width="140" height="304" rx="26" fill={ink} />
      <rect x="12" y="11" width="126" height="290" rx="20" fill={cream} />
      <rect x="57" y="20" width="36" height="9" rx="4.5" fill={ink} />
      <circle cx="75" cy="58" r="16" fill={claySoft} />
      <text x="75" y="62" fontSize="9" fontWeight="800" fill={clay} textAnchor="middle" {...F}>SOS</text>
      <text x="24" y="100" fontSize="12.5" fontWeight="700" fill={ink} {...F}>How can</text>
      <text x="24" y="117" fontSize="12.5" fontWeight="700" fill={ink} {...F}>we help you?</text>
      <rect x="20" y="138" width="34" height="40" rx="10" fill={greenSoft} />
      <path d="M37 150 v15 M30 157.5 h14" stroke={green} strokeWidth="2.6" strokeLinecap="round" />
      <text x="37" y="190" fontSize="7" fill={grey} textAnchor="middle" {...F}>Medical</text>
      <rect x="58" y="138" width="34" height="40" rx="10" fill={slateSoft} />
      <path d="M75 148 l8 3 v5 c0 5 -4 8 -8 10 c -4 -2 -8 -5 -8 -10 v-5 Z" fill="none" stroke={slate} strokeWidth="1.8" strokeLinejoin="round" />
      <text x="75" y="190" fontSize="7" fill={grey} textAnchor="middle" {...F}>Police</text>
      <rect x="96" y="138" width="34" height="40" rx="10" fill={claySoft} />
      <path d="M113 147 c 5 5 7 9 7 13 c 0 4 -3 7 -7 7 c -4 0 -7 -3 -7 -7 c 0 -2 1 -3 2 -5 c 1 3 3 3 3 1 c 0 -3 0 -6 2 -9 Z" fill={clay} />
      <text x="113" y="190" fontSize="7" fill={grey} textAnchor="middle" {...F}>Fire</text>
      <rect x="20" y="250" width="110" height="26" rx="9" fill="#fff" stroke="#E6E2DB" strokeWidth="1.3" />
      <path d="M32 257 c -3 0 -5 2 -5 5 c 0 4 5 8 5 8 c 0 0 5 -4 5 -8 c 0 -3 -2 -5 -5 -5 Z" fill={ink} />
      <text x="46" y="267" fontSize="8.5" fill={ink} {...F}>Telangana, India</text>
      <path d="M114 263 h9 M119 259 l4 4 -4 4" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpharaHub() {
  const left = SPHARA_PILLS.filter((_, i) => i % 2 === 0);
  const right = SPHARA_PILLS.filter((_, i) => i % 2 === 1);
  return (
    <div className="sph-hub">
      <div className="sph-col sph-col-l">
        {left.map((p) => (
          <span className="sph-pill" key={p.label}><PillIcon p={p} /><span>{p.label}</span></span>
        ))}
      </div>
      <SpharaPhone />
      <div className="sph-col sph-col-r">
        {right.map((p) => (
          <span className="sph-pill" key={p.label}><PillIcon p={p} /><span>{p.label}</span></span>
        ))}
      </div>
    </div>
  );
}

const DEC = [
  { n: "1", label: ["Sidebar \u2192", "Top Navigation"], pr: ["Fitts\u2019s Law +", "Information Density"], desc: ["Maximize space for", "content, minimize", "navigation cost."] },
  { n: "2", label: ["Tab Order", "Reordering"], pr: ["Mental Model", "Alignment (Jakob\u2019s)"], desc: ["Match the real task", "flow, not a linear", "onboarding model."] },
  { n: "3", label: ["Upload", "Feedback"], pr: ["Visibility of", "System Status"], desc: ["Keep users informed", "with clear status at", "every step."] },
  { n: "4", label: ["Clause Cards", "with Descriptions"], pr: ["Progressive", "Disclosure"], desc: ["Show just enough", "context for faster,", "informed decisions."] },
  { n: "5", label: ["Colour Hierarchy", "& Ownership"], pr: ["Colour as", "Communication"], desc: ["Semantic colour +", "visible ownership", "drive accountability."] },
];

function DecSketch({ i, bx, by }) {
  const ink = "#3a3a34", line = "#D8D5CE", soft = "#F4F3EF", grey = "#9aa1ab";
  const green = "#5E8C6A", amber = "#C2902f", clay = "#CF6B3F";
  const st = { fill: "none", stroke: ink, strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" };
  if (i === 0) return (<g>
    <rect x={bx + 8} y={by + 10} width="14" height="40" rx="2" fill={soft} stroke={ink} strokeWidth="1.3" />
    <path d={`M${bx + 11} ${by + 18} h8 M${bx + 11} ${by + 25} h8 M${bx + 11} ${by + 32} h8`} stroke={grey} strokeWidth="1.2" strokeLinecap="round" />
    <path d={`M${bx + 25} ${by + 30} h7`} {...st} strokeWidth="1.5" />
    <path d={`M${bx + 30} ${by + 27} l3 3 -3 3`} {...st} strokeWidth="1.5" />
    <rect x={bx + 36} y={by + 10} width="32" height="40" rx="3" fill="#fff" stroke={ink} strokeWidth="1.3" />
    <rect x={bx + 40} y={by + 14} width="24" height="5" rx="2" fill={ink} />
    <path d={`M${bx + 40} ${by + 26} h24 M${bx + 40} ${by + 33} h18 M${bx + 40} ${by + 40} h22`} stroke={grey} strokeWidth="1.2" strokeLinecap="round" />
  </g>);
  if (i === 1) return (<g>
    {[0, 1, 2].map((k) => (<g key={k}>
      <circle cx={bx + 16} cy={by + 14 + k * 15} r="5" {...st} />
      <text x={bx + 16} y={by + 17 + k * 15} fontSize="7" fontWeight="700" fill={ink} textAnchor="middle" fontFamily="Satoshi, sans-serif">{k + 1}</text>
      <path d={`M${bx + 25} ${by + 14 + k * 15} h22`} stroke={grey} strokeWidth="1.4" strokeLinecap="round" />
    </g>))}
    <path d={`M${bx + 56} ${by + 12} c 8 6 8 24 0 32`} {...st} strokeDasharray="2 3" />
    <path d={`M${bx + 52} ${by + 40} l4 5 4 -5`} {...st} />
  </g>);
  if (i === 2) return (<g>
    <rect x={bx + 10} y={by + 8} width="56" height="13" rx="3" fill="#fff" stroke={line} strokeWidth="1.3" />
    <path d={`M${bx + 18} ${by + 17} v-6 M${bx + 15} ${by + 13} l3 -3 3 3`} {...st} />
    <text x={bx + 40} y={by + 18} fontSize="6.5" fill={grey} textAnchor="middle" fontFamily="Satoshi, sans-serif">Upload file</text>
    <rect x={bx + 10} y={by + 26} width="56" height="8" rx="4" fill="#fff" stroke={line} strokeWidth="1.2" />
    <rect x={bx + 11} y={by + 27} width="34" height="6" rx="3" fill={ink} />
    <rect x={bx + 10} y={by + 39} width="56" height="13" rx="3" fill="#fff" stroke={line} strokeWidth="1.3" />
    <path d={`M${bx + 16} ${by + 45.5} l3 3 5 -6`} fill="none" stroke={green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <text x={bx + 42} y={by + 49} fontSize="6.5" fill={grey} textAnchor="middle" fontFamily="Satoshi, sans-serif">Complete</text>
  </g>);
  if (i === 3) return (<g>
    <rect x={bx + 12} y={by + 8} width="52" height="44" rx="3" fill="#fff" stroke={line} strokeWidth="1.3" />
    <rect x={bx + 18} y={by + 14} width="28" height="4" rx="2" fill={ink} />
    <path d={`M${bx + 18} ${by + 24} h40 M${bx + 18} ${by + 31} h34 M${bx + 18} ${by + 38} h40 M${bx + 18} ${by + 45} h28`} stroke={grey} strokeWidth="1.3" strokeLinecap="round" />
  </g>);
  return (<g>
    {[{ c: green }, { c: amber }, { c: clay }].map((r, k) => (<g key={k}>
      <rect x={bx + 6} y={by + 8 + k * 15} width="44" height="12" rx="6" fill={soft} />
      <circle cx={bx + 13} cy={by + 14 + k * 15} r="3" fill={r.c} />
      <path d={`M${bx + 20} ${by + 14 + k * 15} h22`} stroke={grey} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx={bx + 60} cy={by + 14 + k * 15} r="5.5" fill="#fff" stroke={line} strokeWidth="1.2" />
      <circle cx={bx + 60} cy={by + 12 + k * 15} r="1.8" fill={grey} />
      <path d={`M${bx + 56.5} ${by + 18 + k * 15} c 1 -2 6 -2 7 0`} fill={grey} />
    </g>))}
  </g>);
}

function PrincipleIcon({ i, cx, cy }) {
  const st = { fill: "none", stroke: "#3a3a34", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (i === 0) return (<g><circle cx={cx} cy={cy} r="9" {...st} /><circle cx={cx} cy={cy} r="4.5" {...st} /><path d={`M${cx} ${cy - 12} v5 M${cx} ${cy + 7} v5 M${cx - 12} ${cy} h5 M${cx + 7} ${cy} h5`} {...st} /></g>);
  if (i === 1) return (<g><path d={`M${cx - 3} ${cy + 10} v-6 c -6 -1 -8 -6 -7 -10 c 1 -5 6 -7 10 -6 c 5 1 7 5 6 10 c 0 2 -2 4 -4 5 v7 Z`} {...st} /><circle cx={cx + 1} cy={cy - 5} r="1.4" fill="#3a3a34" /></g>);
  if (i === 2) return (<g><path d={`M${cx - 11} ${cy} c 4 -6 18 -6 22 0 c -4 6 -18 6 -22 0 Z`} {...st} /><circle cx={cx} cy={cy} r="3.2" {...st} /></g>);
  if (i === 3) return (<g><circle cx={cx - 4} cy={cy - 2} r="6" {...st} /><circle cx={cx + 4} cy={cy - 2} r="6" {...st} /><circle cx={cx} cy={cy + 5} r="6" {...st} /></g>);
  if (i === 4) return (<g>{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <circle key={r + "" + c} cx={cx - 8 + c * 8} cy={cy - 8 + r * 8} r="1.8" fill="#3a3a34" />))}</g>);
  return (<g><circle cx={cx} cy={cy - 5} r="4" {...st} /><path d={`M${cx - 7} ${cy + 9} c 0 -5 3 -8 7 -8 c 4 0 7 3 7 8`} {...st} /><path d={`M${cx + 4} ${cy + 4} l2.5 2.5 4 -5`} fill="none" stroke="#5E8C6A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></g>);
}

function DRowIcon({ i, cy }) {
  const ink = "#3a3a34", grey = "#aeb2ba";
  const st = { fill: "none", stroke: ink, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  const cx = 50;
  if (i === 0) return (<g>
    <rect x={cx - 8} y={cy - 12} width="16" height="24" rx="2" fill="#fff" stroke={ink} strokeWidth="1.4" />
    <circle cx={cx - 4} cy={cy - 7} r="1" fill={grey} /><circle cx={cx - 4} cy={cy} r="1" fill={grey} /><circle cx={cx - 4} cy={cy + 7} r="1" fill={grey} />
    <path d={`M${cx - 1} ${cy - 7} h7 M${cx - 1} ${cy} h7 M${cx - 1} ${cy + 7} h7`} stroke={grey} strokeWidth="1.3" strokeLinecap="round" />
  </g>);
  if (i === 1) return (<g>
    {[-8, 0, 8].map((d, k) => (<g key={k}><circle cx={cx - 7} cy={cy + d} r="2.1" {...st} /><path d={`M${cx - 2} ${cy + d} h9`} stroke={grey} strokeWidth="1.4" strokeLinecap="round" /></g>))}
  </g>);
  if (i === 2) return (<g>
    <path d={`M${cx - 9} ${cy + 4} a5 5 0 0 1 1 -9 a6 6 0 0 1 11 1 a4 4 0 0 1 -1 8 Z`} {...st} />
    <path d={`M${cx} ${cy + 6} v-8 M${cx - 3} ${cy - 4} l3 -3 3 3`} {...st} />
  </g>);
  if (i === 3) return (<g>
    {[-8, 0, 8].map((d, k) => (<g key={k}><circle cx={cx - 7} cy={cy + d} r="1.6" fill={ink} /><path d={`M${cx - 2} ${cy + d} h9`} stroke={grey} strokeWidth="1.4" strokeLinecap="round" /></g>))}
  </g>);
  return (<g>{[-8, 0, 8].map((d, k) => (<circle key={k} cx={cx + d} cy={cy} r="2.4" fill="#9aa1ab" />))}</g>);
}

function DRowWidget({ i, cy }) {
  const ink = "#1C1C1A", grey = "#6B6B65", faint = "#c4c8cf", line = "#E2DFD8";
  const green = "#5E8C6A", greenSoft = "#E3EDE2", amber = "#C2902f", clay = "#CF6B3F";
  const F = { fontFamily: "Satoshi, sans-serif" };
  const bx = 116, bw = 232;
  const box = (<rect x={bx} y={cy - 19} width={bw} height="38" rx="9" fill="#fff" stroke={line} strokeWidth="1.4" />);
  if (i === 0) return (<g>
    <circle cx={bx + 14} cy={cy} r="5" fill={ink} />
    <path d={`M${bx + 26} ${cy} H${bx + bw}`} stroke={faint} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="2 16" />
  </g>);
  if (i === 1) return (<g>
    {box}
    <path d={`M${bx + 44} ${cy} H${bx + 188}`} stroke={faint} strokeWidth="2" />
    {[0, 1, 2].map((k) => { const x = bx + 44 + k * 72; return (<g key={k}><circle cx={x} cy={cy} r="11" fill={ink} /><text x={x} y={cy + 3.5} fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle" {...F}>{k + 1}</text></g>); })}
  </g>);
  if (i === 2) return (<g>
    {box}
    <text x={bx + 14} y={cy - 4} fontSize="8.5" fill={grey} {...F}>Uploading&hellip;</text>
    <rect x={bx + 14} y={cy + 5} width="150" height="6" rx="3" fill="#ECEAE5" />
    <rect x={bx + 14} y={cy + 5} width="96" height="6" rx="3" fill={ink} />
    <circle cx={bx + 210} cy={cy} r="11" fill={greenSoft} />
    <path d={`M${bx + 205} ${cy} l3.5 3.5 6 -7`} fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </g>);
  if (i === 3) return (<g>
    {box}
    <rect x={bx + 14} y={cy - 9} width="18" height="18" rx="3" fill="#D9D6CF" />
    <rect x={bx + 42} y={cy - 5} width="150" height="5" rx="2.5" fill="#CFCBC4" />
    <rect x={bx + 42} y={cy + 5} width="110" height="5" rx="2.5" fill="#E0DDD6" />
  </g>);
  return (<g>
    {box}
    {[{ c: green }, { c: amber }, { c: clay }].map((a, k) => { const x = bx + 34 + k * 60; return (<g key={k}><circle cx={x} cy={cy} r="13" fill={a.c} /><circle cx={x} cy={cy - 3} r="4" fill="#fff" /><path d={`M${x - 6} ${cy + 9} c 0 -5 3 -7 6 -7 c 3 0 6 2 6 7 Z`} fill="#fff" /></g>); })}
  </g>);
}

function DeloitteBoard() {
  const ink = "#1C1C1A", faint = "#aeb2ba", soft = "#F5F4F1", label = "#2a2a26";
  const F = { fontFamily: "Satoshi, sans-serif" };
  const cys = [92, 162, 232, 302, 372];
  return (
    <svg className="deloitte-board" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M150 30 h22 M178 30 h10 M428 30 h22 M412 30 h10" stroke={faint} strokeWidth="2" strokeLinecap="round" />
      <text x="300" y="34" fontSize="14" fontWeight="800" letterSpacing="2" fill={ink} textAnchor="middle" {...F}>5 DESIGN DECISIONS</text>
      <rect x="12" y="52" width="392" height="360" rx="18" fill={soft} />
      {DEC.map((d, i) => {
        const cy = cys[i];
        return (
          <g key={d.n}>
            <rect x="28" y={cy - 22} width="44" height="44" rx="11" fill="#fff" stroke="#E7E4DD" strokeWidth="1.4" />
            <DRowIcon i={i} cy={cy} />
            <path d={`M88 ${cy} h14`} stroke={ink} strokeWidth="1.7" strokeLinecap="round" />
            <path d={`M99 ${cy - 4} l5 4 -5 4`} fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <DRowWidget i={i} cy={cy} />
            <text x="424" y={cy - 2} fontSize="13.5" fontWeight="700" fill={label} {...F}>{d.label[0]}</text>
            <text x="424" y={cy + 14} fontSize="13.5" fontWeight="700" fill={label} {...F}>{d.label[1]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DeloitteFx() {
  return (
    <div className="deloitte-fx" aria-hidden="true">
      <div className="dfx-sticky">
        <span className="dfx-tape" />
        <span className="dfx-hw dfx-hw-3">Match the system to the user&rsquo;s <span className="dfx-ul">reality</span></span>
      </div>
      <svg className="dfx-arrow" width="74" height="44" fill="none">
        <path d="M4 10 C 28 8 50 18 66 34" stroke="#2a2a26" strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" />
        <path d="M58 36 L68 36 L66 26" stroke="#2a2a26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="dfx-spark" width="30" height="30" fill="#1C1C1A">
        <path d="M15 1 C17 8 22 13 29 15 C22 17 17 22 15 29 C13 22 8 17 1 15 C8 13 13 8 15 1 Z" />
      </svg>
    </div>
  );
}

function TechChipIcon({ i, x, cy }) {
  const ink = "#3a3a34";
  const st = { fill: "none", stroke: ink, strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" };
  if (i === 0) return (<g><circle cx={x} cy={cy} r="6.5" {...st} /><path d={`M${x - 3.2} ${cy} h6.4`} {...st} /></g>);
  if (i === 1) return (<g><path d={`M${x - 7} ${cy - 1} L${x} ${cy - 8} L${x + 7} ${cy - 1}`} {...st} /><path d={`M${x - 5} ${cy - 1} v6 M${x} ${cy - 1} v6 M${x + 5} ${cy - 1} v6 M${x - 7} ${cy + 6} h14`} {...st} /></g>);
  if (i === 2) return (<g><rect x={x - 5} y={cy - 7} width="10" height="15" rx="1.5" {...st} /><path d={`M${x - 2.5} ${cy - 3} h5 M${x - 2.5} ${cy} h5 M${x - 2.5} ${cy + 3} h5`} {...st} /></g>);
  if (i === 3) return (<g><circle cx={x} cy={cy - 3} r="5" {...st} /><path d={`M${x - 3} ${cy + 1} L${x - 4} ${cy + 8} L${x} ${cy + 5} L${x + 4} ${cy + 8} L${x + 3} ${cy + 1}`} {...st} /></g>);
  if (i === 4) return (<g><path d={`M${x - 6} ${cy - 3} h9`} {...st} /><path d={`M${x + 1} ${cy - 6} l3 3 -3 3`} {...st} /><path d={`M${x + 6} ${cy + 3} h-9`} {...st} /><path d={`M${x - 1} ${cy} l-3 3 3 3`} {...st} /></g>);
  return (<g><circle cx={x - 2} cy={cy - 2} r="5" {...st} /><path d={`M${x + 1.5} ${cy + 1.5} l4.5 4.5`} {...st} /></g>);
}

function TechBoard() {
  const ink = "#1C1C1A", grey = "#6B6B65", faint = "#aeb2ba", line = "#E2DFD8", soft = "#F5F4F1";
  const green = "#5E8C6A", greenSoft = "#E3EDE2", label = "#2a2a26";
  const F = { fontFamily: "Satoshi, sans-serif" };
  const chips = ["Deduct TDS", "Deposit challan", "File returns", "Issue Form 16A", "Reconcile 26AS", "Year-end audit"];
  const cys = [92, 142, 192, 242, 292, 342];
  const rows = ["Deductions", "Challans", "Returns", "Reconciliation"];
  const ry = [190, 220, 250, 280];
  return (
    <svg className="deloitte-board" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <text x="104" y="40" fontSize="9" fontWeight="800" letterSpacing="1.5" fill={grey} textAnchor="middle" {...F}>MANUAL TODAY</text>
      <text x="458" y="40" fontSize="9" fontWeight="800" letterSpacing="1.5" fill={grey} textAnchor="middle" {...F}>ONE PLATFORM</text>

      <rect x="14" y="54" width="180" height="352" rx="16" fill={soft} />
      {chips.map((c, i) => { const cy = cys[i]; return (
        <g key={i}>
          <rect x="26" y={cy - 17} width="156" height="34" rx="8" fill="#fff" stroke={line} strokeWidth="1.3" />
          <TechChipIcon i={i} x={46} cy={cy} />
          <text x="62" y={cy + 3.5} fontSize="9.5" fontWeight="600" fill={label} {...F}>{c}</text>
        </g>
      ); })}

      {cys.map((cy, i) => (<path key={i} d={`M186 ${cy} C 244 ${cy}, 274 232, 300 232`} fill="none" stroke={faint} strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" />))}
      <circle cx="300" cy="232" r="7" fill="#fff" stroke={ink} strokeWidth="1.6" />
      <path d="M309 232 H326" stroke={ink} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M321 227 l5 5 -5 5" fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="332" y="118" width="252" height="216" rx="16" fill="#fff" stroke={line} strokeWidth="1.5" />
      <rect x="348" y="134" width="18" height="18" rx="4" fill={ink} />
      <text x="374" y="143" fontSize="11.5" fontWeight="800" fill={ink} {...F}>TDS / TCS Platform</text>
      <text x="374" y="154" fontSize="8" fill={grey} {...F}>One source of truth</text>
      <path d="M348 166 H568" stroke={line} strokeWidth="1.3" />
      {rows.map((r, i) => { const y = ry[i]; return (
        <g key={i}>
          <text x="352" y={y + 3.5} fontSize="10" fontWeight="600" fill={label} {...F}>{r}</text>
          <circle cx="556" cy={y} r="9" fill={greenSoft} />
          <path d={`M551 ${y} l3.5 3.5 6 -7`} fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ); })}
      <rect x="348" y="300" width="220" height="24" rx="8" fill={greenSoft} />
      <path d="M362 312 l3 3 5 -6" fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="464" y="315.5" fontSize="9" fontWeight="700" fill={green} textAnchor="middle" {...F}>All reconciled, year-round</text>

      <text x="300" y="392" fontSize="17" fill={ink} textAnchor="middle" fontFamily="Caveat, cursive">six jobs, one source of truth</text>
      <path d="M214 399 H386" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M566 70 C 568 76 572 80 578 82 C 572 84 568 88 566 94 C 564 88 560 84 554 82 C 560 80 564 76 566 70 Z" fill={ink} />
    </svg>
  );
}

function WorkCard({ cs, idx, total, state, isTop, onClick, onDoubleClick, onHover, csNum }) {
  const tint = CARD_TINTS[cs.slug] || "mint";
  return (
    <article
      className={`card pastel-card tint-${tint} ${state}${cs.comingSoon ? " coming" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover && onHover("leave")}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      aria-hidden={state !== "top" && state !== "peek" ? "true" : undefined}
    >
      <div className="pc-grid">
        <div className="pc-left">
          <span className="pc-badge">{cs.comingSoon ? "In progress" : <>Case Study <b>{PAD(csNum)}</b></>}</span>
          <h2 className="pc-title">{cs.company}</h2>
          {cs.subtitle && <p className="pc-subtitle">{cs.subtitle}</p>}
          <p className="pc-desc">{cs.tagline}</p>
          <a className="pc-cta" href={cs.comingSoon ? undefined : cs.href}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => { e.stopPropagation(); onHover && onHover("leave"); }}
          >
            <span>{cs.comingSoon ? "In progress" : "View case study"}</span>
            <span className="pc-cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className={`pc-right${cs.slug === "sphara" ? " pc-right-doodle" : ""}${(cs.slug === "deloitte" || cs.slug === "techtds") ? " pc-right-board" : ""}`}>
          {cs.slug === "sphara" ? (
            <SpharaHub />
          ) : cs.slug === "deloitte" ? (
            <DeloitteBoard />
          ) : cs.slug === "techtds" ? (
            <TechBoard />
          ) : (
          <div
            className="pc-screen"
            onClick={(e) => {
              const slot = e.target.closest && e.target.closest("image-slot");
              if (slot && !slot.hasAttribute("data-filled")) e.stopPropagation();
            }}
          >
            <image-slot
              id={cs.cover}
              shape="rect"
              fit="cover"
              placeholder={cs.comingSoon ? "in progress · drop a teaser later" : `drop ${cs.company} screens`}
            ></image-slot>
          </div>
          )}
        </div>
      </div>
      {cs.slug === "sphara" && <SpharaFx />}
      {cs.slug === "deloitte" && <DeloitteFx />}
      {/* note rendered at grid level (see Home) */}
    </article>
  );
}

function SpharaHighlights() {
  const notes = [
    { t: "A 10-point brief, grown into a full app", c: "hl-1", r: -3 },
    { t: "Real panic — researched on Quora & Reddit", c: "hl-2", r: 2.5 },
    { t: "Built for panic, where every tap counts", c: "hl-3", r: -2 },
    { t: "My first real product, built end to end", c: "hl-4", r: 2 },
  ];
  return (
    <div className="sph-hl" aria-hidden="true">
      <div className="hl-head">Quick facts</div>
      {notes.map((n) => (
        <div className={`hl ${n.c}`} key={n.c} style={{ "--r": n.r + "deg" }}>
          <span className="hl-tx">{n.t}</span>
        </div>
      ))}
    </div>
  );
}

function DeloitteHighlights() {
  const notes = [
    { head: "NDA Protected —", t: "Real screens omitted", c: "hl-1", r: -3 },
    { head: "Enterprise UX —", t: "Built for consultants", c: "hl-2", r: 2.5 },
    { t: "5 redesign decisions guided by UX principles", c: "hl-3", r: -2 },
    { t: "Redesigned without making users relearn a thing", c: "hl-4", r: 2 },
  ];
  return (
    <div className="sph-hl" aria-hidden="true">
      <div className="hl-head">Quick facts</div>
      {notes.map((n) => (
        <div className={`hl ${n.c}`} key={n.c} style={{ "--r": n.r + "deg" }}>
          {n.head && <span className="hl-bold">{n.head}</span>}
          <span className="hl-tx">{n.t}</span>
        </div>
      ))}
    </div>
  );
}

function TechHighlights() {
  const notes = [
    { t: "Started with a 100-page brief", c: "hl-1", r: -3 },
    { t: "Built for tax consultants & firms", c: "hl-2", r: 2.5 },
    { t: "TDS/TCS compliance made easier to navigate", c: "hl-3", r: -2 },
    { head: "NDA Protected —", t: "Screens omitted", c: "hl-4", r: 2 },
  ];
  return (
    <div className="sph-hl" aria-hidden="true">
      <div className="hl-head">Quick facts</div>
      {notes.map((n) => (
        <div className={`hl ${n.c}`} key={n.c} style={{ "--r": n.r + "deg" }}>
          {n.head && <span className="hl-bold">{n.head}</span>}
          <span className="hl-tx">{n.t}</span>
        </div>
      ))}
    </div>
  );
}

function Home({ topCardIdx, setTopCardIdx, onOpenWork, onCursorChange }) {
  const { CASE_STUDIES, TOTAL_CARDS } = window.PORTFOLIO_DATA;
  const wheelLock = useRefH(false);
  const maxIdx = TOTAL_CARDS - 1;

  // wheel / keyboard
  useEffectH(() => {
    const onWheel = (e) => {
      if (wheelLock.current) return;
      if (Math.abs(e.deltaY) < 6) return;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 600);
      if (e.deltaY > 0) setTopCardIdx((i) => Math.min(maxIdx, i + 1));
      else setTopCardIdx((i) => Math.max(0, i - 1));
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setTopCardIdx((i) => Math.min(maxIdx, i + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setTopCardIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter" && topCardIdx >= 1) {
        const cs = CASE_STUDIES[topCardIdx - 1];
        if (cs && !cs.comingSoon) onOpenWork(cs);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [topCardIdx, setTopCardIdx, maxIdx, onOpenWork, CASE_STUDIES]);

  // touch
  useEffectH(() => {
    let startY = null;
    const onStart = (e) => { startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      if (startY == null) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        if (dy > 0) setTopCardIdx((i) => Math.min(maxIdx, i + 1));
        else setTopCardIdx((i) => Math.max(0, i - 1));
      }
      startY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [maxIdx, setTopCardIdx]);

  // Build the card list. Index 0 = About, 1..N = case studies.
  const cardSpec = [
    { kind: "about" },
    ...CASE_STUDIES.map((cs, ci) => ({ kind: "work", cs, csNum: ci + 1 })),
    { kind: "thanks" }
  ];

  const hoverFor = (i, kind, cs) => (where) => {
    if (where === "leave") {
      onCursorChange({ label: "", glyph: "" });
      return;
    }
    if (i === topCardIdx) {
      if (kind === "about")
        onCursorChange({ label: "scroll for work", glyph: "↓" });
      else if (kind === "thanks")
        onCursorChange({ label: "", glyph: "" });
      else if (cs?.comingSoon)
        onCursorChange({ label: "in progress", glyph: "·" });
      else
        onCursorChange({ label: "double-click to open", glyph: "↗", accent: true });
    } else if (i === topCardIdx + 1) {
      onCursorChange({ label: "click to bring forward", glyph: "↓" });
    } else if (i === topCardIdx - 1) {
      onCursorChange({ label: "click to go back", glyph: "↑" });
    }
  };

  const clickFor = (i, kind, cs) => () => {
    // Single click: stack navigation only. Top card requires double-click to open.
    if (i === topCardIdx + 1 || i === topCardIdx - 1) {
      setTopCardIdx(i);
    }
  };

  const dblClickFor = (i, kind, cs) => () => {
    if (i === topCardIdx && kind === "work" && cs && !cs.comingSoon) {
      onOpenWork(cs);
    }
  };

  // Compute z-index ordering: top card highest, peek next, others behind.
  const stateForIdx = (i) => {
    if (i === topCardIdx) return "top";
    if (i === topCardIdx + 1) return "peek";
    if (i < topCardIdx) return "gone";
    return "behind";
  };

  // Status text under stack
  const statusUnder =
    topCardIdx === 0
      ? "scroll to see work"
      : topCardIdx === maxIdx
        ? "scroll up to go back"
        : "scroll · double-click to open";

  // Section marker for the left rail, by card index
  const sectionFor = (i) => {
    if (i === 0) return { n: "01", label: "About me", note: "Let's start with a quick introduction." };
    if (i === maxIdx) return { n: "03", label: "Say hello", note: "Let's build something together." };
    return { n: "02", label: "My work", note: "A deep dive into my selected work." };
  };
  const sec = sectionFor(topCardIdx);
  const activeSpec = cardSpec[topCardIdx];
  const gridNote = activeSpec && activeSpec.cs && activeSpec.cs.note ? activeSpec.cs.note : null;
  const gridSticky = activeSpec && activeSpec.cs && activeSpec.cs.slug === "sphara";
  const gridBoard = activeSpec && activeSpec.cs && activeSpec.cs.slug === "deloitte";
  const gridTech = activeSpec && activeSpec.cs && activeSpec.cs.slug === "techtds";

  return (
    <main className="home">
      <aside className="side-rail" aria-hidden="true">
        <span className="sr-head">{sec.n ? <>{sec.n} <span className="sr-dash">—</span> </> : null}<span className="sr-label">{sec.label}</span></span>
        <span className="sr-rule" />
        <span className="sr-note">{sec.note}</span>
        <svg className="sr-arrow" viewBox="0 0 80 16" width="80" height="16">
          <path d="M2 8 H70" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M62 3 L72 8 L62 13" fill="none" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </aside>
      {gridNote && !gridSticky && !gridBoard && !gridTech && (
        <div className={`grid-note ${gridSticky ? "gn-v-sticky" : "gn-v-text"}`} aria-hidden="true">
          {gridSticky ? (
            <div className="gn-paper"><span className="gn-tape" /><span className="hw">{gridNote}</span></div>
          ) : (
            <span className="gn-hw">{gridNote}</span>
          )}
          <svg className="gn-arrow" viewBox="0 0 110 70" width="104" height="66">
            <path d="M98 8 C 70 18 38 34 16 58" fill="none" stroke="#9aa1ab" strokeWidth="1.7" strokeDasharray="2 6" strokeLinecap="round" />
            <path d="M10 44 L15 60 L29 54" fill="none" stroke="#9aa1ab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {gridSticky && <SpharaHighlights />}
      {gridBoard && <DeloitteHighlights />}
      {gridTech && <TechHighlights />}
      <div className="stack" role="region" aria-roledescription="card stack">
        {cardSpec.map((spec, i) => {
          const state = stateForIdx(i);
          const isTop = state === "top";
          const cls = `state-${state}`;
          const baseProps = {
            state,
            onClick: clickFor(i, spec.kind, spec.cs),
            onDoubleClick: dblClickFor(i, spec.kind, spec.cs),
            onHover: hoverFor(i, spec.kind, spec.cs)
          };
          return (
            <div
              key={spec.cs?.slug || spec.kind}
              className={`stack-slot ${cls}`}
              style={{ zIndex: 10 - i + (isTop ? 100 : 0) }}
            >
              {spec.kind === "about" ? (
                <AboutCard idx={1} total={window.PORTFOLIO_DATA.TOTAL_CARDS} {...baseProps} onExplore={() => setTopCardIdx(1)} />
              ) : spec.kind === "thanks" ? (
                <ThanksCard idx={i + 1} total={window.PORTFOLIO_DATA.TOTAL_CARDS} {...baseProps} />
              ) : (
                <WorkCard
                  cs={spec.cs}
                  idx={i + 1}
                  csNum={spec.csNum}
                  total={window.PORTFOLIO_DATA.TOTAL_CARDS}
                  {...baseProps}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className={`peek-hint${topCardIdx === 0 ? " is-explore" : ""}`}>
        {topCardIdx === 0 ? (
          <button type="button" className="explore-next" onClick={() => setTopCardIdx(1)}>
            <span className="en-text">Explore my selected work</span>
            <span className="en-arrow" aria-hidden="true">↓</span>
          </button>
        ) : (
          <>
            <span className="bar" />
            <span>{statusUnder}</span>
            <span className="bar" />
          </>
        )}
      </div>
    </main>
  );
}

window.Home = Home;
