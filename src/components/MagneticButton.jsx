import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({children}) {
  const buttonRef = useRef();

  useEffect(() => {
    const xTo = gsap.quickTo(buttonRef.current, "x", {
      duration: 0.8,
      ease: "power3.out"
    });

    const yTo = gsap.quickTo(buttonRef.current, "y", {
      duration: 0.8,
      ease: "power3.out"
    });

    function move(e) {
      const rect = buttonRef.current.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      xTo(x * 0.25);
      yTo(y * 0.25);
    }

    function leave() {
      xTo(0);
      yTo(0);
    }

    const btn = buttonRef.current;

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="px-2 py-1 shadow rounded-xl bg-white"
    >
      {children}
    </button>
  );
}