import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useAnimatedCounter(target: number, duration = 1500, delay = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const startTime = Date.now();
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

const Euler = () => {
  const solved = 101;
  const total = 971;
  const completed = 74;
  const percentage = ((solved / total) * 100).toFixed(1);

  const solvedCount = useAnimatedCounter(solved);
  const completedCount = useAnimatedCounter(completed, 1500, 1600);
  const [fillWidth, setFillWidth] = useState(0);
  const [displayPercent, setDisplayPercent] = useState("0%");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFillWidth(parseFloat(percentage));
      // Animate percentage
      let current = 0;
      const pct = parseFloat(percentage);
      const timer = setInterval(() => {
        current += 1;
        if (current >= pct) {
          current = pct;
          clearInterval(timer);
        }
        setDisplayPercent(`${current.toFixed(1)}%`);
      }, 2000 / pct);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div
      className="min-h-screen p-5"
      style={{ backgroundColor: "#f9f3e9", color: "#2c2c2c" }}
    >
      <main className="max-w-[700px] mx-auto p-5">
        {/* Header */}
        <header
          className="flex flex-col sm:flex-row justify-between items-center mb-10 p-5 rounded-xl shadow-md"
          style={{
            backgroundColor: "#ffffff",
            animation: "fadeInDown 1s ease forwards",
          }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold m-0 tracking-tight"
            style={{ color: "#bf8413" }}
          >
            Project Euler
          </h1>
        </header>

        {/* About Section */}
        <section>
          <h2
            className="text-2xl font-semibold mb-5 pb-2.5"
            style={{
              color: "#a67c00",
              borderBottom: "2px solid #e8d4b5",
              animation: "fadeInLeft 1s ease 0.8s both",
            }}
          >
            About Project Euler and my experience:
          </h2>
          <p
            className="p-6 rounded-xl shadow-md text-lg leading-relaxed mb-6"
            style={{
              backgroundColor: "#ffffff",
              animation: "fadeInUp 1s ease 1.1s both",
            }}
          >
            Project Euler has been the best website I have used to level up my{" "}
            <strong style={{ color: "#bf8413" }}>Java</strong> and{" "}
            <strong style={{ color: "#bf8413" }}>Python</strong> coding skills. It has also helped
            me improve my critical thinking, problem solving, and learn different algorithms I
            would have never discovered on my own, especially in understanding{" "}
            <strong style={{ color: "#bf8413" }}>time complexity</strong> and harder{" "}
            <strong style={{ color: "#bf8413" }}>algorithm concepts</strong>.
          </p>
        </section>

        {/* Progress */}
        <section
          className="my-10 p-6 rounded-xl shadow-md"
          style={{
            backgroundColor: "#ffffff",
            animation: "fadeIn 1s ease 1.4s both",
          }}
        >
          <div
            className="flex flex-col sm:flex-row justify-between mb-4 text-lg font-semibold"
            style={{ color: "#826428" }}
          >
            <span>Progress</span>
            <span>
              Problems Solved: <span className="font-bold" style={{ color: "#bf8413" }}>{solvedCount}</span> / {total}
            </span>
          </div>
          <div
            className="h-4 rounded-lg overflow-hidden mb-4"
            style={{ backgroundColor: "#e8d4b5" }}
          >
            <div
              className="h-full rounded-lg transition-[width] duration-[2s] ease-out"
              style={{
                background: "linear-gradient(90deg, #bf8413, #d4a347)",
                width: `${fillWidth}%`,
                boxShadow: "0 2px 8px rgba(191, 132, 19, 0.3)",
              }}
            />
          </div>
          <div className="text-center font-semibold text-lg" style={{ color: "#826428" }}>
            {displayPercent}
          </div>
          <p className="font-bold mt-4 text-lg" style={{ color: "#826428" }}>
            <strong>Number of completed problems:</strong>{" "}
            <span style={{ color: "#bf8413" }}>{completedCount}</span>
          </p>
        </section>

        {/* Links */}
        <section
          className="mt-10 flex flex-col sm:flex-row gap-5"
          style={{ animation: "fadeIn 1s ease 1.7s both" }}
        >
          <a
            href="https://projecteuler.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-4 rounded-xl shadow-md text-center font-semibold text-lg no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: "#ffffff", color: "#a67c00" }}
          >
            Visit the Project Euler Website
          </a>
          <Link
            to="/"
            className="flex-1 p-4 rounded-xl shadow-md text-center font-semibold text-lg no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: "#ffffff", color: "#a67c00" }}
          >
            Back to Portfolio Home
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Euler;
