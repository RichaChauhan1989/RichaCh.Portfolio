// App — top-level + cursor + nav state. Case studies are external HTML files in /work.

const { useState: useStateA, useEffect: useEffectA, useCallback: useCallbackA } = React;

function App() {
  const [topCardIdx, setTopCardIdx] = useStateA(0);
  const [cursor, setCursor] = useStateA({ label: "", glyph: "", accent: false });

  const goWork = useCallbackA((cs) => {
    if (!cs || cs.comingSoon || !cs.href) return;
    window.location.href = cs.href;
  }, []);

  const onNavigate = useCallbackA((id) => {
    if (id === "about") setTopCardIdx(0);
    else if (id === "work") setTopCardIdx(1);
    else if (id === "resume") window.open("assets/Richa-Chauhan-Resume.pdf", "_blank");
    // Playground — placeholder for now
  }, []);

  const activeNavId = topCardIdx === 0 ? "about" : "work";

  return (
    <>
      <window.Home
        topCardIdx={topCardIdx}
        setTopCardIdx={setTopCardIdx}
        onOpenWork={goWork}
        onCursorChange={setCursor}
      />

      {/* Touch fallback removed per request */}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
