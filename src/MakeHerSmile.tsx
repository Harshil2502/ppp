import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MakeHerSmile() {
  const [message, setMessage] = useState(
    "I’m truly sorry for hurting you. You deserve better from me, and I want to fix things. 💖"
  );
  const [sent, setSent] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const audioRef = useRef(null);

  // slideshow messages
  const slides = [
    "You mean the world to me — I’m so sorry.",
    "I know I hurt you. I’m listening, and I want to understand.",
    "Your feelings matter more than being right. I’m sorry.",
    "Please let me show I can do better, every day.",
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  function sendMessage() {
    setSent(true);
    setShowHearts(true);

    // try to play music gently if available and allowed
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.28;
      audioRef.current.play().catch(() => {});
    }

    // auto-hide after a while
    setTimeout(() => setShowHearts(false), 4800);
    setTimeout(() => setSent(false), 3600);
  }

  function quickSincere() {
    setMessage(
      "I know I hurt you and I am deeply sorry. Your feelings matter. Can we talk when you're ready?"
    );
  }

  function reset() {
    setSent(false);
    setShowHearts(false);
    setMessage(
      "I’m truly sorry for hurting you. You deserve better from me, and I want to fix things. 💖"
    );
  }

  return (
    <div className="max-w-3xl w-full rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md p-8 ring-2 ring-pink-200">
      <audio ref={audioRef} src="/src/assets/soft-melody.mp3" loop />

      <header className="flex items-center gap-4">
        <div className="w-16 h-16 bg-pinky rounded-full flex items-center justify-center text-3xl">
          💗
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-pinky-dark">
            Hey Babu — I’m truly sorry, and I want to make things right
          </h1>
          <p className="text-sm text-pinky-dark mt-1">
            A small page that comes from the heart 💕
          </p>
        </div>
      </header>

      <main className="mt-6 grid gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="p-4 rounded-xl bg-gradient-to-r from-pinky-light to-white shadow-inner"
        >
          <label className="block text-sm text-pinky-dark font-medium mb-2">
            Write a message (customize it):
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-pinky p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pinky-dark"
          />

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={sendMessage}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pinky-dark text-white font-semibold shadow hover:scale-[1.01] active:scale-95 transition"
              aria-label="Send message"
            >
              <span>Send to her</span>
              <span aria-hidden>💌</span>
            </button>

            <button
              onClick={() =>
                setMessage(
                  "You mean everything to me — I’m so sorry and I’ll make it right."
                )
              }
              className="px-3 py-2 rounded-lg border border-pinky text-pinky-dark text-sm"
            >
              Quick gentle
            </button>

            <button
              onClick={quickSincere}
              className="px-3 py-2 rounded-lg border border-pinky text-pinky-dark text-sm"
            >
              Quick sincere
            </button>

            <button
              onClick={reset}
              className="ml-auto text-sm text-pinky-dark underline"
            >
              Reset
            </button>
          </div>
        </motion.div>

        <div className="p-4 rounded-xl bg-pinky-light border border-pinky">
          <h2 className="text-lg font-medium text-pinky-dark">Preview</h2>
          <motion.div
            initial={{ scale: 0.995 }}
            animate={{ scale: sent ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            className="mt-3 p-4 rounded-lg bg-white shadow-sm"
          >
            <p className="text-pinky-dark whitespace-pre-wrap">{message}</p>

            {sent ? (
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-full bg-pinky-light px-3 py-1 text-pinky-dark text-sm">
                  Sent ✓
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-pinky-dark">
                Click "Send to her" when you're ready — it will show a sweet
                animation and play a gentle melody if allowed.
              </p>
            )}
          </motion.div>
        </div>

        {/* --- TWO SIDE CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-pinky-light to-white border border-pinky">
            <h3 className="font-semibold text-pinky-dark">Little activities</h3>
            <ul className="mt-2 text-sm text-pinky-dark space-y-2">
              <li>🍪 Bake or buy her favourite treat and mention it here.</li>
              <li>💌 Leave a handwritten note with a tiny surprise.</li>
              <li>🎶 Send a song that holds meaning for both of you.</li>
              <li>🤝 Offer a calm conversation — listen first.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white border border-pinky">
            <h3 className="font-semibold text-pinky-dark">Short poem</h3>
            <p className="mt-2 text-pinky-dark italic">
              “I’m sorry for the moments I forgot to show — the little things,
              the gentle glow. You matter more than words can say — can we start
              fresh, today?”
            </p>
          </div>
        </div>

        {/* --- SLIDESHOW + HEARTS --- */}
        <div className="relative h-48 flex items-center justify-center">
          <div className="absolute left-6 top-6 w-44 h-28 rounded-xl bg-white/60 backdrop-blur-sm p-3 border border-pinky shadow">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-pinky-dark"
              >
                {slides[slideIndex]}
              </motion.div>
            </AnimatePresence>

            <div className="mt-2 flex gap-1">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded ${
                    i === slideIndex ? "bg-pinky-dark" : "bg-pinky-light"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {showHearts && <HeartBurst />}

          <div className="text-center">
            <p className="text-sm text-pinky-dark">
              Want to tweak fonts or animations? Just ask me.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-6 text-center text-xs text-pinky-dark">
        Made with love • Little gestures matter 💕
      </footer>
    </div>
  );
}

// HeartBurst component
function HeartBurst() {
  const hearts = new Array(12).fill(0).map((_, i) => ({
    id: i,
    x: Math.cos((i / 12) * Math.PI * 2) * (50 + Math.random() * 40),
    y: Math.sin((i / 12) * Math.PI * 2) * (50 + Math.random() * 40),
    rot: Math.floor(Math.random() * 60 - 30),
    size: 10 + Math.floor(Math.random() * 18),
    delay: i * 40,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        className="w-56 h-56"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>

        {hearts.map((h) => (
          <motion.g
            key={h.id}
            initial={{
              opacity: 0,
              scale: 0.2,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.2, 1, 0.8],
              x: [0, h.x],
              y: [0, h.y],
              rotate: h.rot,
            }}
            transition={{
              delay: h.delay / 1000,
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            <path
              d="M10 30 C 10 15, 40 10, 50 30 C 60 10, 90 15, 90 30 C 90 55, 50 80, 50 80 C 50 80, 10 55, 10 30 Z"
              transform={`translate(${100 - h.size / 2},${
                100 - h.size / 2
              }) scale(${h.size / 40})`}
              fill="#FF79B0"
              stroke="#FF4C8B"
              strokeWidth="0.5"
              filter="url(#f1)"
              className="heart"
            />
          </motion.g>
        ))}

        <motion.path
          d="M50 30 C 50 15, 80 10, 90 30 C 100 10, 130 15, 130 30 C 130 55, 90 80, 90 80 C 90 80, 50 55, 50 30 Z"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.06, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.6 }}
          transform="translate(-20,-10)"
          fill="#FF7FAE"
          stroke="#FF4C8B"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
