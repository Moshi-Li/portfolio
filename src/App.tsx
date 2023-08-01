import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Earth from "./earth";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Works from "./components/Works";
import Skill from "./components/Skill";
import Contact from "./components/Contact";
import { useScrollBlock } from "./components/Utils";

import "./App.scss";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasPointer = useRef<null | HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const introPointer = useRef<null | HTMLDivElement>(null);
  const scrollerRef = useRef<null | gsap.core.Tween>(null);
  const [canvasControl, setCanvasControl] = useState<null | Earth>(null);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (
      !canvasPointer.current ||
      !introPointer.current ||
      canvasControl !== null
    )
      return;
    blockScroll();
    const earth = new Earth(canvasPointer.current);
    earth.on("loaded", () => {
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

      gsap
        .to(introPointer.current, {
          opacity: "0",
          duration: 2.5,
          ease: "expo.in",
        })
        .then(() => {
          if (introPointer.current) introPointer.current.style.display = "none";
          allowScroll();
        });
    });
    setCanvasControl(earth);
  }, [canvasControl, allowScroll, blockScroll]);

  useLayoutEffect(() => {
    if (windowWidth <= 600) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray("section");

      scrollerRef.current = gsap.to(panels, {
        x: -(contentRef.current!.scrollWidth - 1 * window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          pin: true,
          scrub: 1,

          end: () => {
            return "+=" + innerWidth + "px";
          },
        },
      });

      const links = document.getElementsByClassName("anchor");
      for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", () => {
          const target = links[i].getAttribute("href")?.slice(1);

          const el = document.getElementById(target ? target : "");
          const elC = document.getElementsByClassName("pin-spacer");
          let left = 0;
          let total = 0;
          if (el !== null && el.offsetLeft) {
            left = el.offsetLeft;
          }
          if (elC[0] !== null && elC[0].clientWidth) {
            total = elC[0].clientWidth - innerWidth;
          }

          scrollerRef.current?.scrollTrigger?.scroll(
            ((left - 75) / total) * innerWidth
          );
        });
      }
    }, portfolioRef);

    return () => ctx.revert();
  }, [windowWidth]);

  return (
    <>
      <div
        ref={canvasPointer}
        className="three--container"
        id="scene-container"
      ></div>
      <div className="portfolio" ref={portfolioRef}>
        <Navigation
          open={menuOpen}
          closeFunction={() => {
            setMenuOpen(false);
          }}
        ></Navigation>
        <Header toggleMenu={() => setMenuOpen(!menuOpen)} />
        <div ref={contentRef} className="container">
          <Landing></Landing>
          <About></About>
          <Skill></Skill>
          <Works></Works>
          <Contact></Contact>
        </div>
      </div>
      <div ref={introPointer} className="intro"></div>
    </>
  );
}
