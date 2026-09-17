// import { useLayoutEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Hero() {
//   const sectionRef = useRef(null);
//   const frameRef = useRef(null);

//   // Hero content refs
//   const contentRef = useRef(null);
//   const headlineRef = useRef(null);
//   const subRef = useRef(null);
//   const ctaRef = useRef(null);
//   const stackRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // =========================================
//       // CREATE FRAME PATHS
//       // =========================================

//       const frameCount = 31;

//       const frames = [];

//       for (let i = 1; i <= frameCount; i++) {
//         frames.push(
//           `/frames2/frame_${String(i).padStart(4, "0")}.avif`
//         );
//       }

//       // =========================================
//       // PRELOAD FRAMES
//       // =========================================

//       const images = [];

//       for (let i = 0; i < frames.length; i++) {
//         const img = new Image();

//         img.src = frames[i];

//         images.push(img);
//       }

//       // =========================================
//       // FRAME CONTROLLER
//       // =========================================

//       const frame = {
//         current: 0,
//       };

//       // First frame
//       if (frameRef.current) {
//         frameRef.current.src = frames[0];
//       }

//       // =========================================
//       // INITIAL STATE OF HERO CONTENT
//       // =========================================

//       gsap.set(contentRef.current, {
//         autoAlpha: 0,
//       });

//       gsap.set(headlineRef.current, {
//         y: 50,
//         autoAlpha: 0,
//       });

//       gsap.set(subRef.current, {
//         y: 30,
//         autoAlpha: 0,
//       });

//       gsap.set(ctaRef.current, {
//         y: 30,
//         autoAlpha: 0,
//       });

//       gsap.set(stackRef.current?.children || [], {
//         y: 60,
//         rotate: -4,
//         autoAlpha: 0,
//       });

//       // =========================================
//       // MAIN SCROLL TIMELINE
//       // =========================================

//       const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,

//             start: "top top",

//             // Much shorter pinned scroll distance
//             end: "+=3500",

//             // Smoother response
//             scrub: 1,

//             pin: true,

//             anticipatePin: 1,

//             invalidateOnRefresh: true,
//           },
//         });

//       // =========================================
//       // PART 1
//       // FRAME ANIMATION
//       // =========================================

//       tl.to(
//         frame,
//         {
//           current: frameCount - 1,
//           ease: "none",

//           onUpdate: () => {
//             const frameIndex = Math.round(frame.current);

//             if (
//               frameRef.current &&
//               images[frameIndex]
//             ) {
//               frameRef.current.src = images[frameIndex].src;
//             }
//           },
//         },
//         0
//       );

//       // =========================================
//       // PART 2
//       // SHOW HERO CONTENT
//       // =========================================

//       tl.to(
//         contentRef.current,
//         {
//           autoAlpha: 1,
//           duration: 0.2,
//           ease: "power2.out",
//         },
//         0.35
//       );

//       // Headline
//       tl.to(
//         headlineRef.current,
//         {
//           y: 0,
//           autoAlpha: 1,
//           duration: 0.35,
//           ease: "power3.out",
//         },
//         0.35
//       );

//       // Subtitle
//       tl.to(
//         subRef.current,
//         {
//           y: 0,
//           autoAlpha: 1,
//           duration: 0.3,
//           ease: "power3.out",
//         },
//         0.35
//       );

//       // Buttons
//       tl.to(
//         ctaRef.current,
//         {
//           y: 0,
//           autoAlpha: 1,
//           duration: 0.3,
//           ease: "power3.out",
//         },
//         0.35
//       );

//       // Book stack
//       tl.to(
//         stackRef.current?.children || [],
//         {
//           y: 0,
//           rotate: 0,
//           autoAlpha: 1,
//           duration: 0.4,
//           stagger: 0.08,
//           ease: "power3.out",
//         },
//         0.35
//       );
//     }, sectionRef);

//     return () => {
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="
//         relative overflow-hidden
//         w-full h-screen
//         bg-[#F5F1E8]
//       "
//     >
//       {/* FRAME ANIMATION */}
//       <img
//         ref={frameRef}
//         src="/frames2/frame_0001.avif"
//         alt=""
//         className="
//           absolute inset-0 object-cover object-center
//           w-full h-full
//           select-none pointer-events-none
//         "
//         draggable="false"
//       />

//       {/* HERO CONTENT */}
//       <div
//         ref={contentRef}
//         className="
//           absolute inset-0 z-10 flex items-center
//         "
//       >
//         <div
//           className="
//             w-full max-w-7xl
//             mx-auto px-8 md:px-12 lg:px-16 xl:px-20
//           "
//         >
//           <div
//             className="
//               grid grid-cols-2 items-center
//               gap-16
//             "
//           >
//             {/* LEFT CONTENT */}
//             <div
//               className="
//                 max-w-xl
//               "
//             >

//               <h1
//                 ref={headlineRef}
//                 className="
//                   font-display
//                   text-4xl text-ink md:text-5xl lg:text-6xl xl:text-7xl
//                   leading-[1.02] tracking-tight
//                 "
//               >
//                 Books worth
//                 <br />
//                 staying up for.
//               </h1>

//               <p
//                 ref={subRef}
//                 className="
//                   max-w-lg
//                   mt-6
//                   text-ink-soft text-base md:text-lg leading-relaxed
//                 "
//               >
//                 New releases, timeless classics, and
//                 hidden gems — carefully curated
//                 for readers who love great stories,
//                 available instantly at your fingertips.
//               </p>

//               {/* BUTTONS */}
//               <div
//                 ref={ctaRef}
//                 className="
//                   flex items-center
//                   mt-8
//                   gap-4
//                 "
//               >
//                 <Link
//                   to="/books"
//                   className="
//                     btn-primary
//                   "
//                 >
//                   Buy Books
//                 </Link>

//                 <Link
//                   to="/books?sort=rating"
//                   className="
//                     btn-secondary
//                   "
//                 >
//                   See top rated
//                 </Link>
//               </div>

//             </div>

//             {/* RIGHT BOOK STACK */}
//             <div
//               ref={stackRef}
//               className="
//                 flex items-center justify-center
//                 h-[420px]
//                 pr-4
//                 gap-4
//               "
//             >
//               <div
//                 className="
//                   overflow-hidden
//                   w-24 md:w-28 lg:w-32 h-56 md:h-64 lg:h-72
//                   shadow-xl
//                 "
//               >
//               <img
//                 src="/images/book-cover-1.jpg"
//                 alt="Botanical book cover"
//                 className="
//                   object-cover
//                   w-full h-full
//                 "
//               />
//             </div>

//             <div
//               className="
//                 overflow-hidden
//                 w-24 md:w-28 lg:w-32 h-64 md:h-72 lg:h-80
//                 shadow-xl
//                 -mb-2
//               "
//             >
//               <img
//                 src="/images/book-cover-2.jpg"
//                 alt="Library book cover"
//                 className="
//                   object-cover
//                   w-full h-full
//                 "
//               />
//             </div>

//             <div
//               className="
//                 overflow-hidden
//                 w-24 md:w-28 lg:w-32 h-48 md:h-56 lg:h-64
//                 shadow-xl
//               "
//             >
//               <img
//                 src="/images/book-cover-3.jpg"
//                 alt="Celestial book cover"
//                 className="
//                   object-cover
//                   w-full h-full
//                 "
//               />
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }













// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";

// const images = [
//   "/images/image1.jpg",
//   "/images/image2.jpg",
//   "/images/image3.jpg",
//   "/images/image4.jpg",
//   "/images/image5.jpg",
//   "/images/image6.jpg",
//   "/images/image7.jpg",
//   "/images/image8.jpg",
//   "/images/image9.jpg",
// ];

// export default function Hero() {
//   const sectionRef = useRef(null);
//   const topBannerRef = useRef(null);
//   const collageRef = useRef(null);
//   const logoRef = useRef(null);

//   useLayoutEffect(() => {
//     // Respect users who've asked for less motion.
//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     const ctx = gsap.context(() => {
//       const imageEls = collageRef.current.querySelectorAll("img");

//       if (prefersReducedMotion) {
//         gsap.set([topBannerRef.current, imageEls, logoRef.current], {
//           opacity: 1,
//           scale: 1,
//           filter: "blur(0px)",
//         });
//         return;
//       }

//       // =========================================
//       // STARTING STATE
//       // Larger, out-of-focus, invisible — as if
//       // pulled back in space (-z) before landing
//       // into place at true size.
//       // =========================================

//       gsap.set(topBannerRef.current, {
//         opacity: 0,
//         scale: 1.15,
//         filter: "blur(18px)",
//         transformOrigin: "center top",
//       });

//       gsap.set(imageEls, {
//         opacity: 0,
//         scale: 1.35,
//         filter: "blur(16px)",
//       });

//       gsap.set(logoRef.current, {
//         opacity: 0,
//         scale: 1.4,
//         filter: "blur(22px)",
//       });

//       // =========================================
//       // REVEAL TIMELINE
//       // Banner settles first, images cascade in
//       // behind it, logo lands last on top.
//       // =========================================

//       const tl = gsap.timeline({
//         defaults: { ease: "power3.out" },
//       });

//       tl.to(topBannerRef.current, {
//         opacity: 1,
//         scale: 1,
//         filter: "blur(0px)",
//         duration: 0.8,
//       })
//         .to(
//           imageEls,
//           {
//             opacity: 1,
//             scale: 1,
//             filter: "blur(0px)",
//             duration: 1,
//             stagger: 0.12,
//           },
//           "-=0.35"
//         )
//         .to(
//           logoRef.current,
//           {
//             opacity: 1,
//             scale: 1,
//             filter: "blur(0px)",
//             duration: 0.9,
//             ease: "back.out(1.5)",
//           },
//           "-=0.45"
//         );
//     }, sectionRef);

//     return () => {
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="relative min-h-screen overflow-hidden bg-[#0b0c1b] text-white"
//       >

//         {/* =====================================================
//             TOP PURPLE BANNER
//         ====================================================== */}

//         <div
//           ref={topBannerRef}
//           className="
//             relative
//             flex
//             h-[58px]
//             w-full
//             items-center
//             justify-center
//             overflow-hidden
//             bg-gradient-to-b
//             from-[#8d59ae]
//             to-[#b674ca]

//             max-[600px]:h-[40px]
//           "
//         >
//           {/* Left decorative shape */}
//           <div
//             className="
//               absolute
//               -left-[120px]
//               -top-[70px]
//               h-[120px]
//               w-[430px]
//               rotate-[-8deg]
//               rounded-[50%]
//               bg-[#48366b]/70

//               max-[600px]:-left-[100px]
//               max-[600px]:-top-[55px]
//               max-[600px]:h-[90px]
//               max-[600px]:w-[280px]
//             "
//           />

//           {/* Right decorative shape */}
//           <div
//             className="
//               absolute
//               -right-[120px]
//               -top-[70px]
//               h-[120px]
//               w-[430px]
//               rotate-[8deg]
//               rounded-[50%]
//               bg-[#48366b]/70

//               max-[600px]:-right-[100px]
//               max-[600px]:-top-[55px]
//               max-[600px]:h-[90px]
//               max-[600px]:w-[280px]
//             "
//           />

//           <span
//             className="
//               relative
//               z-10
//               text-[11px]
//               font-bold
//               tracking-[3px]

//               max-[600px]:text-[7px]
//               max-[600px]:tracking-[1.5px]
//             "
//           >
//             AN EXTENDED LOOK: NOW PLAYING
//           </span>
//         </div>


//         {/* =====================================================
//             NAVBAR
//         ====================================================== */}

//         <nav
//           className="
//             absolute
//             left-0
//             top-[58px]
//             z-50
//             flex
//             h-[95px]
//             w-full
//             items-center
//             justify-between
//             px-10

//             max-[900px]:px-7

//             max-[600px]:top-[40px]
//             max-[600px]:h-[65px]
//             max-[600px]:px-5
//           "
//         >

//           {/* Left VI */}
//           <div
//             className="
//               text-[32px]
//               font-black
//               leading-none
//               tracking-[-4px]

//               max-[600px]:text-[24px]
//               max-[600px]:tracking-[-3px]
//             "
//           >
//             VI
//           </div>


//           {/* Hamburger */}
//           <button
//             type="button"
//             aria-label="Menu"
//             className="
//               flex
//               w-[25px]
//               flex-col
//               gap-[5px]

//               max-[600px]:w-[21px]
//               max-[600px]:gap-[4px]
//             "
//           >
//             <span
//               className="
//                 block
//                 h-[4px]
//                 w-[25px]
//                 bg-white

//                 max-[600px]:h-[3px]
//                 max-[600px]:w-[21px]
//               "
//             />

//             <span
//               className="
//                 block
//                 h-[4px]
//                 w-[25px]
//                 bg-white

//                 max-[600px]:h-[3px]
//                 max-[600px]:w-[21px]
//               "
//             />

//             <span
//               className="
//                 block
//                 h-[4px]
//                 w-[25px]
//                 bg-white

//                 max-[600px]:h-[3px]
//                 max-[600px]:w-[21px]
//               "
//             />
//           </button>

//         </nav>


//         {/* =====================================================
//             MAIN CONTENT
//         ====================================================== */}

//         <div
//           className="
//             flex
//             min-h-[calc(100vh-58px)]
//             flex-col
//             items-center
//             pt-[40px]

//             max-[900px]:pt-[35px]

//             max-[600px]:min-h-[calc(100vh-40px)]
//             max-[600px]:pt-[30px]
//           "
//         >

//           {/* =====================================================
//               IMAGE COLLAGE
//           ====================================================== */}

//           <div
//             ref={collageRef}
//             className="
//               relative
//               grid

//               /* Keep exact desktop aspect ratio */
//               aspect-[770/425]

//               /* Desktop */
//               w-[770px]

//               /* Never exceed viewport */
//               max-w-[90vw]

//               /* 5 columns */
//               grid-cols-[140fr_165fr_145fr_140fr_145fr]

//               /* 2 rows */
//               grid-rows-[175fr_245fr]

//               /* Space between images */
//               gap-[6px]

//               /* Purple border/background */
//               bg-[#1b002d]
//               p-[6px]

//               /* Tablet */
//               max-[900px]:w-[90vw]
//               max-[900px]:gap-[4px]
//               max-[900px]:p-[4px]

//               /* Mobile */
//               max-[600px]:w-[94vw]
//               max-[600px]:gap-[3px]
//               max-[600px]:p-[3px]
//             "
//           >

//             {/* =================================================
//                 IMAGE 1
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[1]
//                 row-[1]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[0]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 2
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[2/4]
//                 row-[1]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[1]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 3
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[4]
//                 row-[1]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[2]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 4
//                 Tall image
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[5]
//                 row-[1/3]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[3]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 5
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[1]
//                 row-[2]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[4]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 6
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[2]
//                 row-[2]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[5]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 7
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[3]
//                 row-[2]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[6]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 8
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[4]
//                 row-[2]
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[7]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                   transition-transform
//                   duration-500
//                   hover:scale-105
//                 "
//               />
//             </div>


//             {/* =================================================
//                 IMAGE 9
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 col-[5]
//                 row-[2]
//                 hidden
//                 overflow-hidden
//               "
//             >
//               <img
//                 src={images[8]}
//                 alt=""
//                 className="
//                   block
//                   h-full
//                   w-full
//                   object-cover
//                 "
//               />
//             </div>


//             {/* =================================================
//                 CENTER LOGO

//                 Sized as a % of the collage box (not px), and the
//                 collage box has a locked aspect-ratio, so this
//                 proportion is identical at every breakpoint — no
//                 separate tablet/mobile width or height overrides
//                 needed. 31% x 43.5%, centered, keeps it entirely
//                 over columns 2-3 (with only a small, intentional
//                 bleed into column 4) and never reaches column 1
//                 (image 1 / image 5) or column 5 (the tall image 4),
//                 so it can't collide with those edge photos at any
//                 screen size.
//             ================================================= */}

//             <div
//               ref={logoRef}
//               className="
//                 absolute
//                 left-1/2
//                 top-1/2
//                 z-40

//                 flex
//                 h-[43.5%]
//                 w-[31%]

//                 -translate-x-1/2
//                 -translate-y-1/2

//                 items-center
//                 justify-center

//                 border-[6px]
//                 border-white

//                 bg-gradient-to-br
//                 from-[#1c3e8f]
//                 via-[#752895]
//                 to-[#ffb2ce]

//                 shadow-[0_0_0_4px_#291252,0_8px_25px_rgba(0,0,0,0.6)]

//                 /* Tablet: thinner border only, box stays same % size */
//                 max-[900px]:border-[4px]

//                 /* Mobile: thinner border + lighter shadow, box stays same % size */
//                 max-[600px]:border-[2px]
//                 max-[600px]:shadow-[0_0_0_2px_#291252,0_5px_15px_rgba(0,0,0,0.6)]
//               "
//             >

//               {/* GTA text */}

//               <div
//                 className="
//                   flex
//                   flex-col
//                   items-center
//                   justify-center

//                   font-['Impact']
//                   text-[39px]
//                   uppercase
//                   leading-[0.76]
//                   text-white

//                   [text-shadow:3px_3px_0_#111,-2px_-2px_0_#111]

//                   max-[900px]:text-[4.5vw]
//                   max-[600px]:text-[5.2vw]
//                 "
//               >
//                 <span>grand</span>
//                 <span>theft</span>
//                 <span>auto</span>
//               </div>


//               {/* =================================================
//                   VI

//                   IMPORTANT:
//                   This stays INSIDE the logo instead of extending
//                   into the neighboring image tiles.
//               ================================================= */}

//               <span
//                 className="
//                   absolute

//                   bottom-[2px]
//                   right-[5px]

//                   font-['Impact']
//                   text-[65px]
//                   leading-none

//                   text-[#ffb5cf]

//                   [-webkit-text-stroke:3px_white]

//                   [text-shadow:4px_4px_0_#241052]

//                   max-[900px]:bottom-[0px]
//                   max-[900px]:right-[2px]
//                   max-[900px]:text-[7vw]
//                   max-[900px]:[-webkit-text-stroke:2px_white]

//                   max-[600px]:bottom-[0px]
//                   max-[600px]:right-[1px]
//                   max-[600px]:text-[7vw]
//                   max-[600px]:[-webkit-text-stroke:1px_white]
//                 "
//               >
//                 VI
//               </span>

//             </div>

//           </div>


//           {/* =====================================================
//               BOTTOM INFORMATION
//           ====================================================== */}

//           <div
//             className="
//               mt-[28px]

//               grid
//               w-[770px]
//               max-w-[90vw]

//               grid-cols-[1fr_auto_1fr]
//               items-center

//               max-[900px]:mt-[22px]
//               max-[900px]:w-[90vw]

//               max-[600px]:mt-[14px]
//               max-[600px]:w-[94vw]
//               max-[600px]:flex
//               max-[600px]:flex-col
//               max-[600px]:gap-[14px]
//               "
//           >

//             {/* Coming/date */}

//             <div
//               className="
//                 max-[600px]:text-center
//               "
//             >
//               <p
//                 className="
//                   text-[19px]
//                   font-bold
//                   leading-none

//                   max-[900px]:text-[16px]
//                   max-[600px]:text-[13px]
//                 "
//               >
//                 COMING
//               </p>

//               <p
//                 className="
//                   mt-[5px]
//                   text-[19px]
//                   font-extrabold
//                   leading-none

//                   max-[900px]:text-[16px]
//                   max-[600px]:mt-[4px]
//                   max-[600px]:text-[14px]
//                 "
//               >
//                 NOVEMBER 19, 2026
//               </p>
//             </div>


//             {/* Pre-order button */}

//             <button
//               type="button"
//               className="
//                 rounded-full
//                 bg-[#ffb7d1]

//                 px-[25px]
//                 py-[15px]

//                 text-[15px]
//                 font-bold
//                 text-[#312043]

//                 transition-all
//                 duration-200

//                 hover:scale-105
//                 hover:bg-[#ffc4da]

//                 max-[900px]:px-[22px]
//                 max-[900px]:py-[13px]
//                 max-[900px]:text-[14px]

//                 max-[600px]:px-[23px]
//                 max-[600px]:py-[11px]
//                 max-[600px]:text-[13px]
//                 "
//             >
//               Pre-Order Now
//             </button>


//             {/* Platforms */}

//             <div
//               className="
//                 flex
//                 flex-col
//                 items-end
//                 gap-[5px]

//                 text-[15px]

//                 max-[900px]:text-[13px]

//                 max-[600px]:items-center
//                 max-[600px]:gap-[3px]
//                 max-[600px]:text-[12px]
//               "
//             >
//               <span>PS5</span>
//               <span>Xbox Series X|S</span>
//             </div>

//           </div>


//           {/* =====================================================
//               BLINKING ARROW
//           ====================================================== */}

//           <div
//             className="
//               mt-[18px]
//               animate-[arrowPulse_1.2s_ease-in-out_infinite]

//               max-[600px]:mt-[10px]
//             "
//           >
//             <div
//               className="
//                 h-[20px]
//                 w-[20px]
//                 rotate-45

//                 border-b-[4px]
//                 border-r-[4px]
//                 border-[#ffb4ce]

//                 shadow-[4px_4px_10px_rgba(255,159,202,0.8)]

//                 max-[600px]:h-[15px]
//                 max-[600px]:w-[15px]
//                 max-[600px]:border-b-[3px]
//                 max-[600px]:border-r-[3px]
//               "
//             />
//           </div>

//         </div>

//       </section>


//       {/* =========================================================
//           ARROW ANIMATION
//       ========================================================== */}

//       <style>{`
//         @keyframes arrowPulse {
//           0% {
//             opacity: 0.25;
//             transform: translateY(0);
//           }

//           50% {
//             opacity: 1;
//             transform: translateY(6px);
//           }

//           100% {
//             opacity: 0.25;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// }










import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
 
const COLORS = {
  ink: '#12161A',
  parchment: '#F1ECDE',
  parchmentMuted: '#AFA793',
  gold: '#C89B4A',
  oxblood: '#7A2E2E',
  forest: '#2F4538',
  navy: '#1F2A44',
  line: 'rgba(241,236,222,0.12)',
};
 
function useGoogleFonts() {
  useEffect(() => {
    const id = 'folio-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}
 
function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Folio home">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="4" y="3" width="18" height="24" rx="1" fill={COLORS.oxblood} />
        <rect x="4" y="3" width="4" height="24" rx="1" fill={COLORS.gold} />
        <path d="M22 3 L26 7 V27 H22 Z" fill="#000000" opacity="0.3" />
        <rect x="10" y="10" width="8" height="1.3" fill={COLORS.parchment} opacity="0.85" />
        <rect x="10" y="13.5" width="6" height="1.3" fill={COLORS.parchment} opacity="0.55" />
      </svg>
      <span
        style={{ fontFamily: "'Fraunces', serif", color: COLORS.parchment }}
        className="text-xl font-medium tracking-tight"
      >
        TenPages
      </span>
    </a>
  );
}
 
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Browse', href: '/books' },
    { label: 'Categories', href: '/books' },
    
  ];
 
  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{ borderColor: COLORS.line, backgroundColor: 'rgba(18,22,26,0.86)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-20 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="text-sm transition-colors"
                style={{
                  color: COLORS.parchmentMuted,
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="/login"
              className="text-sm"
              style={{
                color: COLORS.parchmentMuted,
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              Sign in
            </a>

            <a
              href="/books"
              className="rounded-sm px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: COLORS.gold,
                color: COLORS.ink,
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              Browse library
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 md:hidden"
            style={{ color: COLORS.parchment }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
 
      {open && (
        <div id="mobile-menu" className="border-t px-5 pb-6 pt-2 md:hidden" style={{ borderColor: COLORS.line }}>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-sm px-2 py-3 text-base"
                style={{ color: COLORS.parchment, fontFamily: "'Work Sans', sans-serif" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="#signin"
              className="rounded-sm px-2 py-2.5 text-center text-sm"
              style={{
                color: COLORS.parchmentMuted,
                border: `1px solid ${COLORS.line}`,
                fontFamily: "'Work Sans', sans-serif",
              }}
              onClick={() => setOpen(false)}
            >
              Sign in
            </a>
            <a
              href="#browse"
              className="rounded-sm px-2 py-3 text-center text-sm font-medium"
              style={{ backgroundColor: COLORS.gold, color: COLORS.ink, fontFamily: "'Work Sans', sans-serif" }}
              onClick={() => setOpen(false)}
            >
              Browse library
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
 
function BookCard({ title, author, spine, className }) {
  return (
    <div
      className={`absolute h-48 w-32 rounded-sm shadow-2xl sm:h-52 sm:w-36 lg:h-56 lg:w-40 ${className}`}
      style={{ backgroundColor: spine }}
    >
      <div className="flex h-full flex-col justify-between p-3.5">
        <div className="h-0.5 w-7" style={{ backgroundColor: COLORS.gold }} />
        <div>
          <p className="text-sm leading-snug" style={{ fontFamily: "'Fraunces', serif", color: COLORS.parchment }}>
            {title}
          </p>
          <p
            className="mt-1.5 text-xs italic"
            style={{ color: COLORS.parchmentMuted, fontFamily: "'Fraunces', serif" }}
          >
            {author}
          </p>
        </div>
        <div className="h-0.5 w-7" style={{ backgroundColor: COLORS.gold }} />
      </div>
    </div>
  );
}
 
function BookStack() {
  return (
    <div className="relative mx-auto h-64 w-full max-w-xs sm:h-80 sm:max-w-sm lg:h-96 lg:max-w-none">
      <BookCard
        title="Low Tide, Late Light"
        author="Inés Marchetti"
        spine={COLORS.navy}
        className="left-0 top-0 z-10 -rotate-6 sm:left-4"
      />
      <BookCard
        title="Systems of Attention"
        author="D. R. Okafor"
        spine={COLORS.oxblood}
        className="left-1/2 top-4 z-20 -translate-x-1/2 rotate-3"
      />
      <div className="absolute right-0 top-10 z-30 -rotate-2 sm:right-40">
        <BookCard title="The Unfinished Room" author="Marta Solheim" spine={COLORS.forest} className="static" />
        <span
          className="absolute -right-2 -top-2 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: COLORS.gold, color: COLORS.ink, fontFamily: "'Work Sans', sans-serif" }}
        >
          PDF
        </span>
      </div>
    </div>
  );
}
 
export default function Hero() {
  useGoogleFonts();
 
  return (
    <div
      id="top"
      className="folio-hero min-h-screen w-full"
      style={{ backgroundColor: COLORS.ink, fontFamily: "'Work Sans', sans-serif" }}
    >
      <style>{`
        .folio-hero a:focus-visible,
        .folio-hero button:focus-visible {
          outline: 2px solid ${COLORS.gold};
          outline-offset: 3px;
          border-radius: 3px;
        }
        .folio-hero .riseIn { opacity: 1; }
        @media (prefers-reduced-motion: no-preference) {
          .folio-hero .riseIn {
            opacity: 0;
            transform: translateY(16px);
            animation: folioRiseIn 0.7s cubic-bezier(0.16, 0.84, 0.44, 1) forwards;
          }
          @keyframes folioRiseIn {
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
 
      <Navbar />
 
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 md:pb-28 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-12">
          <div>
            <h1
              className="riseIn text-4xl font-medium sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Fraunces', serif", color: COLORS.parchment, lineHeight: 1.08 }}
            >
              Your next read,
              <br />
              downloaded in seconds.
            </h1>
 
            <p
              className="riseIn mt-6 max-w-md text-base sm:text-lg"
              style={{ color: COLORS.parchmentMuted, fontFamily: "'Work Sans', sans-serif", animationDelay: '90ms' }}
            >
              Folio is a library of over 2,400 books — fiction, business, design — sold as instant PDF downloads.
              No subscriptions, no waiting on shipping.
            </p>
 
            <div
              className="riseIn mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '160ms' }}
            >
              <a
                href="/books"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5 sm:w-auto sm:text-base"
                style={{ backgroundColor: COLORS.gold, color: COLORS.ink, fontFamily: "'Work Sans', sans-serif" }}
              >
                Browse the library
                <ArrowRight size={17} />
              </a>
              <a
                href="#how"
                className="inline-flex w-full items-center justify-center rounded-sm px-6 py-3.5 text-sm sm:w-auto sm:text-base"
                style={{ border: `1px solid ${COLORS.line}`, color: COLORS.parchment, fontFamily: "'Work Sans', sans-serif" }}
              >
                See how it works
              </a>
            </div>
 
            <div
              className="riseIn mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6"
              style={{ borderColor: COLORS.line, animationDelay: '220ms' }}
            >
              {[
                ['2,400+', 'titles'],
                ['Instant', 'PDF delivery'],
                ['Any device', 'phone, tablet, desktop'],
              ].map(([big, small]) => (
                <div key={big} className="flex items-baseline gap-2">
                  <span style={{ fontFamily: "'Fraunces', serif", color: COLORS.gold }} className="text-xl">
                    {big}
                  </span>
                  <span style={{ color: COLORS.parchmentMuted, fontFamily: "'Work Sans', sans-serif" }} className="text-sm">
                    {small}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          <div className="riseIn" style={{ animationDelay: '130ms' }}>
            <BookStack />
            <p
              className="mt-8 text-center text-sm sm:mt-6"
              style={{ color: COLORS.parchmentMuted, fontFamily: "'Work Sans', sans-serif" }}
            >
              Prices start at Rs49. Every purchase is yours to keep, and there's no subscription.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}