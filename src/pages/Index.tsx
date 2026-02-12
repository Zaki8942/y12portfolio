import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    to: "/rebound",
    className: "rebound",
    icon: "fa-regular fa-circle-dot",
    accentColor: "hsl(217, 91%, 60%)",
    borderColor: "border-t-blue-500",
    title: "REBOUND Astrophysics",
    description:
      "N-body simulations and planetary orbit modeling using REBOUND. Exploring mass ratios and elliptical orbits through computational astrophysics.",
  },
  {
    to: "/euler",
    className: "euler",
    icon: "fas fa-infinity",
    accentColor: "hsl(25, 95%, 53%)",
    borderColor: "border-t-orange-500",
    title: "Project Euler",
    description:
      "Mathematical and computational problem solving. Developing algorithms for efficient solutions to challenging mathematical problems.",
  },
  {
    to: "/leetcode",
    className: "leetcode",
    icon: "fas fa-code",
    accentColor: "hsl(160, 84%, 39%)",
    borderColor: "border-t-emerald-500",
    title: "LeetCode",
    description:
      "Algorithmic problem solving and data structure challenges. Improving coding skills through systematic practice and analysis.",
  },
];

const skills = [
  {
    icon: "fas fa-laptop-code",
    title: "Problem Solving & Programming",
    description: (
      <>
        Developed through <strong className="text-blue-400 font-semibold">Project Euler</strong> and{" "}
        <strong className="text-blue-400 font-semibold">LeetCode</strong> challenges, with focused
        research on algorithms for computational efficiency. Proficient in Python and Java with
        emphasis on clean, optimized code.
      </>
    ),
  },
  {
    icon: "fas fa-atom",
    title: "Astrophysics & Quantum Mechanics",
    description: (
      <>
        Wrote research papers and completed MOOCS on exoplanets, black holes, and galaxies. EPQ
        project on{" "}
        <strong className="text-blue-400 font-semibold">
          The Viability of Energy Production from Black Holes
        </strong>
        . Hands-on experience with REBOUND simulations for orbital mechanics.
      </>
    ),
  },
  {
    icon: "fas fa-medal",
    title: "Jiu-Jitsu & Personal Development",
    description: (
      <>
        Started <strong className="text-blue-400 font-semibold">10 years ago</strong> allowing me to
        achieve an Orange-White belt teaching me patience, dedication and the value of hardwork.
        Through this I have participated and won many Competitions proving to myself that the
        hardwork I put in will be rewarded eventually.
      </>
    ),
  },
];

function createParticles(container: HTMLDivElement) {
  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f97316"];
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 60 + 20;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = `${15 + Math.random() * 15}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.opacity = `${Math.random() * 0.1 + 0.05}`;
    container.appendChild(particle);
  }
}

const Index = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (particlesRef.current) {
      createParticles(particlesRef.current);
    }
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden p-5"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Particles */}
      <div ref={particlesRef} className="fixed inset-0 z-0 pointer-events-none" />

      <main className="max-w-[1200px] mx-auto relative z-[1]">
        {/* Header */}
        <header
          className="text-center mb-16 px-8 py-10 rounded-2xl backdrop-blur-lg border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          style={{
            background: "rgba(30, 41, 59, 0.9)",
            animation: "fadeInUp 0.8s ease",
          }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-2"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% auto",
              animation: "gradient-shift 6s ease infinite",
            }}
          >
            Zaki's Portfolio
          </h1>
          <p className="text-lg text-slate-400 mb-8">Year 12 Student</p>
          <p className="text-lg text-slate-300 max-w-[800px] mx-auto leading-relaxed mb-6">
            Welcome to my portfolio! I love <strong className="text-white">Astrophysics</strong>,{" "}
            <strong className="text-white">Coding</strong> (Java, Python), and{" "}
            <strong className="text-white">Mathematics</strong>. This portfolio will show you my
            projects and skills developed through my projects.
          </p>
          <p className="text-blue-400 italic text-lg">Enjoy exploring my work!</p>
        </header>

        {/* Projects Section */}
        <section style={{ animation: "fadeInUp 0.8s ease 0.2s both" }}>
          <h2 className="text-3xl text-center mb-12 text-blue-400 relative pb-4">
            My Projects
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-sm"
              style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
            />
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            style={{ animation: "fadeInUp 0.8s ease 0.4s both" }}
          >
            {projects.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={`group rounded-2xl p-10 text-center no-underline flex flex-col items-center border border-white/10 ${p.borderColor} border-t-4 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/30`}
                style={{
                  background: "linear-gradient(135deg, rgba(30,41,59,0.9), #1e293b)",
                }}
              >
                <div
                  className="text-5xl mb-5 h-20 flex items-center justify-center transition-all duration-300"
                  style={{
                    color: p.accentColor,
                    filter: "drop-shadow(0 0 5px currentColor)",
                  }}
                >
                  <i className={p.icon} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section style={{ animation: "fadeInUp 0.8s ease 0.4s both" }}>
          <h2 className="text-3xl text-center mb-12 text-blue-400 relative pb-4">
            My Skills & Expertise
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-sm"
              style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
            />
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ animation: "fadeInUp 0.8s ease 0.6s both" }}
          >
            {skills.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-9 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:border-blue-500/20 relative overflow-hidden"
                style={{ background: "rgba(30, 41, 59, 0.9)" }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
                />
                <h3 className="text-lg font-semibold mb-5 text-blue-400 flex items-center gap-3">
                  <i className={s.icon} />
                  {s.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-10 mt-16 text-slate-400 text-sm border-t border-white/10">
          <p>© 2025 Zaki's Portfolio. All projects are self-directed learning initiatives.</p>
          <p className="mt-2 opacity-70">
            Built with passion for Astrophysics and Computer Science
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
