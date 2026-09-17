import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + slides a section into view as it enters the viewport on scroll.
 * Attach the returned ref to the section's outer element.
 *
 * @param {object} options
 * @param {number} options.y - starting vertical offset in px
 * @param {number} options.duration - animation duration in seconds
 * @param {number} options.delay - delay in seconds
 * @param {string} options.start - ScrollTrigger "start" position
 */
export default function useScrollReveal({ y = 40, duration = 0.9, delay = 0, start = "top 80%" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return ref;
}
