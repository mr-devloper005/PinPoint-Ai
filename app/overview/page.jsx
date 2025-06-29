
'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getCurrentUserThunk } from '@/slices/auth/authSlice';


function useCountUp(end, duration = 1.5) {


  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (end - start) / (duration * 60)
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(id);
        setValue(end);
      } else {
        setValue(Number(start.toFixed(1)));
      }
    }, 2000 / 60);
    return () => clearInterval(id);
  }, [end, duration]);
  return value;
}

export default function Overview() {




  const router = useRouter()
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(getCurrentUserThunk())
    .unwrap()
    .then(() => {
     router.push("/chat");
    })  .catch((err) => {
      console.log("🔥 Thunk failed in overview", err);
    })
   
}, []);


  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -200]);

  const stats = [
    { end: 99, suffix: '%', label: 'Accuracy' },
    { end: 1, suffix: 'ms', label: 'Latency' },
    { end: 5, suffix: '+', label: 'Models' },
    { end: 100, suffix: '+', label: 'Users' },
  ];
  const counts = stats.map(s => useCountUp(s.end));

  const features = [
    { icon: '🤖', title: 'AI Brain Sync', desc: 'Real-time model fine-tuning.' },
    { icon: '⚡', title: 'Instant Inference', desc: 'Sub-millisecond responses.' },
    { icon: '🔒', title: 'Trust Security', desc: 'End-to-end encrypted.' },
    { icon: '🔄', title: 'Auto-Scale', desc: 'Infinite concurrency, zero toil.' },
  ];

 
  const fullText = 'Pinpoint AI ';
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let idx = 0;
    function tick() {
      if (idx <= fullText.length) {
        setTyped(fullText.slice(0, idx));
        idx += 1;
        setTimeout(tick, 100);
      }
    }
    tick();
  }, []);


  return (
    <main className="bg-[#08080A] text-gray-200 overflow-x-hidden">
   
      <section className="relative h-screen flex items-center justify-center px-6">
     
        <motion.div style={{ y: y2 }} className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover opacity-20 mix-blend-screen" />
        <motion.div style={{ y: y1 }} className="absolute inset-0 bg-gradient-to-br from-[#0d0d0f] via-transparent to-[#08080a]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="relative z-10 text-center max-w-5xl"
        >
          <h1 className="text-5xl flex justify-center gap-3 md:text-7xl lg:text-7xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-xl">
          {typed}
            <span className="animate-pulse">|</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-lg md:text-2xl text-gray-300"
          >
            "Your Personal AI Workspace — Smart, Fast, and Tailored Just for You."
          </motion.p>
          <motion.a 
            href="#goto-ai"
            
            whileHover={{ scale: 1.05 }}
            className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full font-semibold text-white shadow-2xl"
          >
            Get Started
          </motion.a>
        </motion.div>
      </section>

      <section id="features" className="py-20 px-6 md:px-16 bg-[#0b0b0d]">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {features.map((f, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="p-6 bg-[#1a1a1f] rounded-2xl border border-[#2b2b33] hover:shadow-lg hover:bg-[#22222a] transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id='goto-ai' className="py-24 px-6 md:px-16 bg-[#08080A] flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'backOut' }}
          className="flex-1 flex justify-center"
        >
          <div className="w-64 h-64 bg-gradient-to-tr from-[#2e2e3a] to-[#1f1f27] rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl opacity-80">🧠</span>
          </div>
        </motion.div>
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-400">
            Using Gemini Brain
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Witness the core of Pinpoint AI: A neural engine capable of on-the-fly learning,
            contextual reasoning, and lightning-fast adaptation.
          </p>
        </motion.div>
      </section>

    
      <section className="py-16 px-6 md:px-16 bg-[#0b0b0d] text-center">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {stats.map((s, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="text-4xl md:text-5xl font-bold text-purple-500 block">
                {Number.isInteger(counts[i]) ? counts[i] : counts[i].toFixed(1)}{s.suffix}

              </span>
              <span className="text-gray-400">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

  
      <section className="py-20 px-6 text-center bg-gradient-to-tr from-[#08080a] to-[#111115]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            Ready to Shape Tomorrow?
          </h2>
          <motion.a 
            href="/register"
            whileHover={{ scale: 1.1 }}
            className="inline-block mt-4 px-10 py-4 bg-gradient-to-r from-teal-400 to-purple-600 rounded-full text-black font-semibold shadow-xl"
          >
            Start Your AI Journey

          </motion.a>
        </motion.div>
      </section>

    
      <footer className="py-10 bg-[#08080A] text-center text-gray-500 text-sm">
        &copy; 2025 Pinpoint AI Solutions. Crafted for the future.
        Made By Yash Nihalani.
      </footer>
    </main>
  );
}

