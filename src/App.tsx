import React, { useState, useRef, useEffect, useCallback } from "react";
import Earth from "./earth";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Works from "./components/Works";

import "./App.scss";

function App() {
  const canvasPointer = useRef<null | HTMLDivElement>(null);
  const portfolioPointer = useRef<null | HTMLDivElement>(null);
  const [canvasControl, setCanvasControl] = useState<null | Earth>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const pageOnWheel = useCallback(
    (e: React.WheelEvent) => {
      if (portfolioPointer.current && window.innerWidth > 600) {
        portfolioPointer.current.scrollTo({
          left: (portfolioPointer.current.scrollLeft += e.deltaY * 2),
          behavior: "smooth",
        });
      }
    },
    [portfolioPointer]
  );

  useEffect(() => {
    if (!canvasPointer.current || canvasControl !== null) return;
    const earth = new Earth(canvasPointer.current);
    setCanvasControl(earth);

    document.addEventListener("mousemove", (e: MouseEvent) => {
      if (e.clientX <= window.innerWidth * 0.1) {
        earth.setKeyMap("KeyA", true);
      } else if (e.clientX >= window.innerWidth * 0.9) {
        earth.setKeyMap("KeyD", true);
      } else {
        earth.setKeyMap("KeyA", false);
        earth.setKeyMap("KeyD", false);
      }
    });
  }, [canvasControl]);

  return (
    <>
      <div
        ref={canvasPointer}
        className="three--container"
        id="scene-container"
      ></div>

      <div
        ref={portfolioPointer}
        className="portfolio"
        onWheel={(e) => pageOnWheel(e)}
      >
        <Navigation
          open={menuOpen}
          closeFunction={() => {
            setMenuOpen(false);
          }}
        ></Navigation>
        <Header toggleMenu={() => setMenuOpen(!menuOpen)} />
        <Landing></Landing>
        <About></About>
        <Works></Works>
        <section className="content--section">Hello</section>
      </div>
    </>
  );
}

export default App;
