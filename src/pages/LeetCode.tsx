import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const problemData = {
  easy: { solved: 94, total: 915 },
  medium: { solved: 28, total: 1956 },
  hard: { solved: 3, total: 887 },
};

const totalSolved = problemData.easy.solved + problemData.medium.solved + problemData.hard.solved;
const totalProblems = problemData.easy.total + problemData.medium.total + problemData.hard.total;
const completionRate = ((totalSolved / totalProblems) * 100).toFixed(1);

function useAnimatedCounter(target: number, delay = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setValue(Math.floor(easeOutQuart(progress) * target));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return value;
}

const difficulties = [
  {
    key: "easy" as const,
    label: "Easy",
    badgeClass: "from-[#00b8a3] to-[#00d4b4] text-white",
    borderClass: "border-t-[#00b8a3]",
    fillClass: "from-[#00b8a3] via-[#00d4b4] to-[#00b8a3]",
    data: problemData.easy,
    delay: 600,
  },
  {
    key: "medium" as const,
    label: "Medium",
    badgeClass: "from-[#ffc01e] to-[#ffd54a] text-black",
    borderClass: "border-t-[#ffc01e]",
    fillClass: "from-[#ffc01e] via-[#ffd54a] to-[#ffc01e]",
    data: problemData.medium,
    delay: 800,
  },
  {
    key: "hard" as const,
    label: "Hard",
    badgeClass: "from-[#ff375f] to-[#ff6b82] text-white",
    borderClass: "border-t-[#ff375f]",
    fillClass: "from-[#ff375f] via-[#ff6b82] to-[#ff375f]",
    data: problemData.hard,
    delay: 1000,
  },
];

const DifficultyCard = ({
  d,
}: {
  d: (typeof difficulties)[0];
}) => {
  const count = useAnimatedCounter(d.data.solved, d.delay);
  const [fillWidth, setFillWidth] = useState(0);
  const percent = ((d.data.solved / d.data.total) * 100).toFixed(2);

  useEffect(() => {
    const t = setTimeout(() => setFillWidth(parseFloat(percent)), d.delay + 500);
    return () => clearTimeout(t);
  }, [percent, d.delay]);

  return (
    <div
      className={`rounded-xl p-6 border-t-4 ${d.borderClass} transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer relative overflow-hidden`}
      style={{
        background: "linear-gradient(145deg, #272727, #2a2a2a)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        animation: `scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${d.delay / 1000}s both`,
      }}
    >
      <div className="flex justify-between items-center mb-5">
        <span
          className={`px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2.5 bg-gradient-to-r ${d.badgeClass}`}
        >
          <i className="fas fa-check-circle" />
          {d.label}
        </span>
        <div className="font-semibold text-xl text-white">
          {count}/{d.data.total}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-3 text-sm text-[#b0b0b0]">
          <span>Progress</span>
          <span>{fillWidth > 0 ? `${percent}%` : "0%"}</span>
        </div>
        <div
          className="h-3.5 rounded-lg overflow-hidden relative"
          style={{
            background: "rgba(0,0,0,0.3)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className={`h-full rounded-lg relative overflow-hidden bg-gradient-to-r ${d.fillClass} bg-[length:200%_100%]`}
            style={{
              width: `${fillWidth}%`,
              transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: "shimmer 3s infinite linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const LeetCode = () => {
  const totalCount = useAnimatedCounter(totalSolved, 1200);

  return (
    <div
      className="min-h-screen p-5 overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #121212 100%)" }}
    >
      <main
        className="max-w-[800px] mx-auto p-8 rounded-xl relative overflow-hidden"
        style={{
          background: "#1e1e1e",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          animation: "slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-[1]"
          style={{ background: "linear-gradient(90deg, #ffa116, #ffb74d)" }}
        />

        {/* Header */}
        <header
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-5"
          style={{ animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both" }}
        >
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-1 inline-block relative"
              style={{
                background: "linear-gradient(135deg, #ffa116 0%, #ffb74d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LeetCode Portfolio
            </h1>
            <p
              className="text-[#b0b0b0] text-lg"
              style={{ animation: "fadeIn 0.6s ease 0.5s both" }}
            >
              Tracking my problem-solving journey
            </p>
          </div>
        </header>

        {/* Experience */}
        <section
          className="mb-10"
          style={{ animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both" }}
        >
          <h2
            className="text-xl font-semibold mb-6 pb-3 flex items-center gap-3"
            style={{
              borderBottom: "2px solid transparent",
              borderImage: "linear-gradient(90deg, transparent, #ffa116, transparent) 1",
            }}
          >
            <i className="fas fa-code text-[#ffa116]" />
            My LeetCode Journey
          </h2>
          <div
            className="p-7 rounded-xl border-l-4 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #272727, #2a2a2a)",
              borderLeftColor: "#ffa116",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              animation: "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both",
            }}
          >
            <p className="text-[#b0b0b0] leading-relaxed">
              LeetCode has been something I have used alongside Project Euler in order to improve
              other areas of my coding skills such as hashmaps, nodes and binary trees as well as
              seeing other peoples solutions and thought processes. This has allowed me to better
              understand more difficult concepts for my level as well as risks of space and time
              complexity when dealing with larger data sets.
            </p>
          </div>
        </section>

        {/* Progress */}
        <section
          className="mb-10"
          style={{ animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both" }}
        >
          <h2
            className="text-xl font-semibold mb-6 pb-3 flex items-center gap-3"
            style={{
              borderBottom: "2px solid transparent",
              borderImage: "linear-gradient(90deg, transparent, #ffa116, transparent) 1",
            }}
          >
            <i className="fas fa-chart-line text-[#ffa116]" />
            Progress Overview
          </h2>

          <div className="grid gap-6">
            {difficulties.map((d) => (
              <DifficultyCard key={d.key} d={d} />
            ))}
          </div>

          {/* Stats */}
          <div
            className="rounded-xl p-8 text-center mt-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #272727, #2a2a2a)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              animation: "scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s both",
            }}
          >
            <h3 className="mb-6 text-[#b0b0b0] text-lg relative z-[1]">Overall Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-[1]">
              <div className="p-5 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ffa116, #ffb74d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {totalCount}
                </div>
                <div className="text-sm text-[#b0b0b0]">Total Problems Solved</div>
              </div>
              <div className="p-5 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ffa116, #ffb74d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {totalProblems}
                </div>
                <div className="text-sm text-[#b0b0b0]">Available Problems</div>
              </div>
              <div className="p-5 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ffa116, #ffb74d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {completionRate}%
                </div>
                <div className="text-sm text-[#b0b0b0]">Overall Completion</div>
              </div>
            </div>
          </div>
        </section>

        {/* Links */}
        <section
          className="flex flex-col sm:flex-row justify-center gap-5 mt-10"
          style={{ animation: "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.4s both" }}
        >
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-medium transition-all duration-300 no-underline hover:-translate-y-1 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #ffa116, #ffb74d)",
              color: "#000",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            }}
          >
            <i className="fas fa-external-link-alt" />
            Visit LeetCode
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-medium transition-all duration-300 no-underline text-white hover:-translate-y-1 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #272727, #2a2a2a)",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            }}
          >
            <i className="fas fa-arrow-left" />
            Back to Portfolio
          </Link>
        </section>
      </main>
    </div>
  );
};

export default LeetCode;
