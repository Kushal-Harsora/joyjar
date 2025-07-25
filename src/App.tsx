import ReactLenis, { type LenisRef } from 'lenis/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { motion } from 'motion/react'

import './index.css'

gsap.registerPlugin(ScrollTrigger);

const App = () => {

  const lenisRef = React.useRef<LenisRef | null>(null);
  const mask = React.useRef<HTMLElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const scrollSpan = React.useRef<HTMLSpanElement | null>(null);
  const textReveal1 = React.useRef<HTMLSpanElement | null>(null);
  const textReveal2 = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    let rafId: number;

    function update(time: number) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time);
        lenisRef.current.lenis.on('scroll', ScrollTrigger.update)
      }
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  React.useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: `+=${window.innerHeight * 1.75}`,
        scrub: true,
        pin: true
      }
    });

    tl.fromTo(mask.current,
      { scale: 1, opacity: 1, filter: 'blur(0px)' },
      { scale: 2.5, opacity: 0.5, filter: 'blur(50px)' }
    );

    return () => {
      tl.kill()
    }
  });

  React.useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: `+=${window.innerHeight * 2}`,
        scrub: true,
        pin: true
      }
    });

    return () => {
      tl.kill()
    }
  });

  React.useEffect(() => {
    if (!videoRef.current) return

    gsap.fromTo(videoRef.current, { filter: 'grayscale(100%)' }, {
      filter: 'grayscale(0%)',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=200',
        scrub: true,
      }
    })
  }, [])

  React.useEffect(() => {
    gsap.to(scrollSpan.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        scrub: true,
        start: 'top top',
        end: '+=50'
      }
    })
  });

  React.useEffect(() => {
    if (!scrollSpan.current) return;

    const span = scrollSpan.current;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      gsap.to(span, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: 'power3.out'
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  React.useEffect(() => {
    if (!textReveal1.current || !textReveal2.current) return;

    gsap.fromTo(
      textReveal1.current,
      { y: 200, opacity: 0, ease: 'power1.out' },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=400',
          scrub: true,
          markers: true
        }
      }
    );

    gsap.fromTo(
      textReveal2.current,
      { y: 200, opacity: 0, ease: 'power1.out' },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: document.body,
          start: 'top+=400 top',
          end: '+=400',
          scrub: true,
          markers: true
        }
      }
    );
  });

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <main className=' h-[300vh] w-screen flex items-start justify-center'>
        <span ref={scrollSpan} className='w-fit max-lg:hidden absolute top-0 left-0 flex flex-row bg-white rounded-4xl px-4 py-2 z-50'>Scroll <ArrowDown /></span>
        <section
          style={{ clipPath: 'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)' }}
          className=' absolute top-0 left-0 h-screen w-screen flex flex-col items-start justify-start bg-white z-30'
          ref={mask}
        >
          <div className=' p-4 w-screen h-fit text-center flex flex-row justify-evenly items-center z-50'>
            <motion.span
              whileHover={{
                scaleX: 1.5,
                scaleY: 1.05,
                originX: 0.5,
                originY: 0.5,
                transition: { duration: 0.3, ease: 'easeInOut', stiffness: 200, type: 'spring' }
              }}
              className=' w-fit h-fit nav-head text-7xl max-md:text-5xl'>
              JoyJar
            </motion.span>
            <button
              className=' absolute right-[5vw] top-0 translate-y-[75%] max-md:translate-y-[50%] bg-black text-white py-2 px-4 rounded-4xl cursor-pointer'
              onClick={() => alert("Hello")}
            >
              Login
            </button>
          </div>
          <div className=' absolute top-[85vh] left-0 w-screen h-fit flex items-center justify-center '>
            <ArrowDown />
          </div>
        </section>
        <div className=' absolute top-0 left-0 h-screen w-screen text-9xl max-md:text-6xl text-wrap font-bold bg-transparent flex flex-col items-center justify-center gap-10 max-lg:gap-4 max-md:gap-2 text-white z-20'>
          <span className=' w-fit h-fit opacity-0' ref={textReveal1}>
            Capture Joy
          </span>
          <span ref={textReveal2}>
            Keep it Close.
          </span>
        </div>

        <section>

          <video ref={videoRef} className='w-screen h-screen object-cover z-10' muted autoPlay loop playsInline preload="auto">
            <source src="/joy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </section>

      </main>
    </ReactLenis>
  )
}

export default App