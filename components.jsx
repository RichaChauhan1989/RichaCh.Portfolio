// Shared components: TopNav, Cursor, icons

const { useEffect, useState, useRef, useCallback } = React;

function ArrowDown({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 2v8m0 0L2.5 6.5M6 10l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowUpRight({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowLeft({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M10 6H2m0 0l3.5-3.5M2 6l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Top Nav ─────────────────────────────────────────────
function TopNav({ activeId, onNavigate }) {
  const { NAV_ITEMS } = window.PORTFOLIO_DATA;
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-inner">
        <a
          href="#"
          className="nav-brand"
          onClick={(e) => { e.preventDefault(); onNavigate("about"); }}
        >
          Richa Chauhan<span className="dot">.</span>
        </a>
        {NAV_ITEMS.map((it) => (
          <a
            key={it.id}
            href="#"
            className={activeId === it.id ? "active" : ""}
            onClick={(e) => { e.preventDefault(); onNavigate(it.id); }}
            aria-current={activeId === it.id ? "page" : undefined}
          >
            {it.label}
            <span className="active-dot" />
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── Custom cursor ────────────────────────────────────────
function Cursor({ label, glyph, accent }) {
  const ref = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (!supportsHover) return;
    document.body.classList.add("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;
      if (ref.current) {
        ref.current.style.transform =
          `translate3d(${pos.current.x + 14}px, ${pos.current.y + 14}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`cursor${visible && label ? " visible" : ""}${accent ? " accent" : ""}`}
        aria-hidden="true"
      >
        <span>{label}</span>
        <span className="glyph">{glyph}</span>
      </div>
      <span className="sr-only" aria-live="polite">{label}</span>
    </>
  );
}

window.Components = { TopNav, Cursor, ArrowDown, ArrowUpRight, ArrowLeft };
