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

  const imageContiner = React.useRef<HTMLElement | null>(null);

  const img1 = React.useRef<HTMLDivElement | null>(null);
  const img2 = React.useRef<HTMLDivElement | null>(null);
  const img3 = React.useRef<HTMLDivElement | null>(null);
  const img4 = React.useRef<HTMLDivElement | null>(null);
  const img5 = React.useRef<HTMLDivElement | null>(null);

  const reviews = [
    {
      name: 'Rahul Sharma',
      review:
        'JoyJar makes it so easy to relive the best moments of my life. It\'s like carrying a digital time capsule.',
      image: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
    {
      name: 'Liam Chen',
      review:
        'I love how beautifully memories are stored. It is private, elegant, and makes me smile every time I open it.',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      name: 'Alice Doe',
      review:
        'Perfect for sharing special moments with family. We\'ve turned it into our little joy vault.',
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };


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
        }
      }
    );
  });


  React.useEffect(() => {
    if (
      !imageContiner.current ||
      !img1.current ||
      !img2.current ||
      !img3.current ||
      !img4.current ||
      !img5.current
    )
      return;

    ScrollTrigger.matchMedia({

      "(min-width: 451px)": () => {
        animateImages({
          x1: -window.innerWidth * 0.35,
          y1: window.innerHeight * 0.35,
          x2: -window.innerWidth * 0.2,
          y2: window.innerHeight * 0.2,
          x4: window.innerWidth * 0.2,
          y4: window.innerHeight * 0.2,
          x5: window.innerWidth * 0.35,
          y5: window.innerHeight * 0.35
        });
      },

      "(max-width: 450px)": () => {
        animateImages({
          x1: -window.innerWidth * 0.25,
          y1: window.innerHeight * 0.225,
          x2: -window.innerWidth * 0.15,
          y2: window.innerHeight * 0.125,
          x4: window.innerWidth * 0.15,
          y4: window.innerHeight * 0.125,
          x5: window.innerWidth * 0.25,
          y5: window.innerHeight * 0.225
        });
      }
    });

    function animateImages({
      x1, y1, x2, y2, x4, y4, x5, y5
    }: {
      x1: number, y1: number,
      x2: number, y2: number,
      x4: number, y4: number,
      x5: number, y5: number
    }) {
      const common = {
        trigger: document.body,
        start: window.innerWidth > 450 ? `top+=${window.innerHeight * 3.25} top` : `top+=${window.innerHeight * 3.75} top`,
        end: '+=600',
        scrub: true,
        pinSpacing: false,
      };

      gsap.fromTo(img1.current, {
        x: 0, y: 0, rotationZ: 0
      }, {
        x: x1, y: y1, rotationZ: -25, opacity: 1, scrollTrigger: { ...common }
      });

      gsap.fromTo(img2.current, {
        x: 0, y: 0, rotationZ: 0
      }, {
        x: x2, y: y2, rotationZ: -12.5, opacity: 1, scrollTrigger: { ...common }
      });

      gsap.fromTo(img3.current, {
        scale: 1
      }, {
        scale: 1.25, opacity: 1, scrollTrigger: { ...common }
      });

      gsap.fromTo(img4.current, {
        x: 0, y: 0, rotationZ: 0
      }, {
        x: x4, y: y4, rotationZ: 12.5, opacity: 1, scrollTrigger: { ...common }
      });

      gsap.fromTo(img5.current, {
        x: 0, y: 0, rotationZ: 0
      }, {
        x: x5, y: y5, rotationZ: 25, opacity: 1, scrollTrigger: { ...common }
      });
    }
  });


  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>

      <main className=' h-fit w-screen flex flex-col items-start justify-center overflow-x-hidden'>

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
          </div>
          <div className=' absolute top-[85vh] left-0 w-screen h-fit flex items-center justify-center animate-bounce'>
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
          <video ref={videoRef} className='w-screen max-w-screen h-screen max-h-screen object-cover z-10 overflow-x-hidden' muted autoPlay loop playsInline preload="metadata">
            <source src={`${import.meta.env.BASE_URL}joy.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className="h-fit w-screen flex flex-col items-center justify-center gap-4 py-24 z-50">
          <div className=' w-4/5 h-[70vh] max-md:h-screen flex flex-row max-md:flex-col items-center justify-center max-md:gap-6 py-32 max-md:py-12 border-t-[2px] border-b-[2px] border-black'>
            <div className=' w-full flex flex-col items-center justify-center gap-4'>
              <h3 className='w-full h-full text-9xl font-bold text-center'>
                1M+
              </h3>
              <p className=' w-full text-center text-3xl'>
                Happy customers that are using JoyJar.
              </p>
              <button className='w-4/5 h-[7.5vh] cursor-pointer text-3xl border border-black bg-black hover:bg-white hover:duration-150 text-white hover:text-black'>
                Join Now
              </button>
            </div>
            <div className=' h-full max-md:h-[2.5px] w-[7.5px] max-md:w-full bg-black'></div>
            <div className=' w-full flex flex-col items-center justify-center gap-4'>
              <h3 className='w-full h-full text-9xl font-bold text-center'>
                10M+
              </h3>
              <p className=' w-full text-center text-3xl'>
                Joyful Memories sealed in the jar.
              </p>
              <button className='w-4/5 h-[7.5vh] cursor-pointer text-3xl border border-black bg-black hover:bg-white hover:duration-150 text-white hover:text-black'>
                Jar it
              </button>
            </div>
          </div>
        </section>

        <section ref={imageContiner} className='relative h-screen w-screen flex items-center justify-center'>
          <div ref={img1} className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30em] max-md:h-[10em] w-[25em] max-md:w-[7.5em] z-20'>
            <img src={`${import.meta.env.BASE_URL}img1.jpg`} className='w-full h-full object-cover rounded-4xl' />
          </div>
          <div ref={img2} className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30em] max-md:h-[10em] w-[25em] max-md:w-[7.5em] z-30'>
            <img src={`${import.meta.env.BASE_URL}img2.jpg`} className='w-full h-full object-cover rounded-4xl' />
          </div>
          <div ref={img4} className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30em] max-md:h-[10em] w-[25em] max-md:w-[7.5em] z-30'>
            <img src={`${import.meta.env.BASE_URL}img4.jpg`} className='w-full h-full object-cover rounded-4xl' />
          </div>
          <div ref={img5} className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30em] max-md:h-[10em] w-[25em] max-md:w-[7.5em] z-20'>
            <img src={`${import.meta.env.BASE_URL}img5.jpg`} className='w-full h-full object-cover rounded-4xl' />
          </div>
          <div ref={img3} className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30em] max-md:h-[10em] w-[25em] max-md:w-[7.5em] z-50'>
            <img src={`${import.meta.env.BASE_URL}img3.jpg`} className='w-full h-full object-cover rounded-4xl' />
          </div>

          <div className="absolute top-0 left-0 w-screen h-fit text-center">
            <h2 className="text-6xl max-md:text-3xl font-bold relative z-10 inline-block">
              Curated Memories
            </h2>
            <img
              src={`${import.meta.env.BASE_URL}brush-stroke.svg`}
              alt=""
              className="absolute top-1/2 left-1/2 w-full max-w-none -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            />
          </div>

        </section>

        <section className='w-screen h-fit min-h-screen flex flex-col items-center justify-center px-6 py-12 mt-12 text-center gap-8'>
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.25 }}
            className='text-7xl max-md:text-4xl font-bold'
          >
            How JoyJar Works?
          </motion.h2>

          <div className="flex flex-col gap-10 max-w-2xl">
            {[
              {
                title: "1. Capture the Moment 📸",
                text: "Snap a photo, write a note, or record a voice message — anything that brings you joy. Upload your memory to JoyJar in just a few taps."
              },
              {
                title: "2. Store It Safely 📦",
                text: "Every memory is sealed inside your personal jar — securely stored, beautifully organized, and accessible from any device."
              },
              {
                title: "3. Revisit Anytime 🔄️",
                text: "Whenever you need a moment of happiness, open your jar and relive your favorite memories — one joyful moment at a time."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: index * 0.2 }}
                className="bg-white/80 shadow-md backdrop-blur-md rounded-xl p-6 text-left"
              >
                <h3 className="text-2xl font-semibold text-black mb-2">{step.title}</h3>
                <p className="text-lg text-black leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="w-full bg-white py-20 px-6 flex flex-col items-center justify-center text-center gap-12">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl max-md:text-3xl font-bold text-gray-900"
          >
            What Our Customers Say
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
          >
            {reviews.map((user, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center gap-4"
                variants={cardVariants}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="text-black text-base italic">“{user.review}”</p>
                <h4 className="text-lg font-semibold text-black">{user.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </section>


        <section
          className=' h-fit w-screen flex flex-row items-center justify-center gap-6 footer heading text-xl pt-32 pb-12 bg-[#ffd5ba]'
          style={{ clipPath: 'ellipse(64% 49% at 41% 81%)' }}
        >
          <h3>
            Get in Touch
          </h3>
          <motion.button
            whileHover={{
              scaleX: 1.25,
              scaleY: 1.15,
              backgroundColor: "#60a5fa",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer bg-blue-300 py-2 px-6 rounded-3xl text-lg font-semibold text-black shadow-md"
            onClick={() => {
              window.location.href = "mailto:kushalharsora2003@gmail.com?subject=Freelance Collaboration Inquiry&body=Hi Kushal,%0D%0A%0D%0AI came across your work, and I am interested in discussing a potential freelance opportunity with you. Please let me know your availability to connect.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]"
            }}
          >
            Email Me!
          </motion.button>
        </section>

        <section className=' h-fit w-screen py-2 flex items-baseline justify-center bg-[#ffd5ba] heading border-t-[1px] border-black'>
          © {new Date().getFullYear()} JoyJar. Developed by
          <a
            href="https://github.com/Kushal-Harsora/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            &nbsp;Kushal Harsora
          </a>
          .
        </section>

      </main>
    </ReactLenis>
  )
}

export default App