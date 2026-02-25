import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const codeLines = [
  { line: 1, content: <span className="code-comment"># REBOUND N-Body Simulation for Planetary Orbits</span> },
  { line: 2, content: <br /> },
  { line: 3, content: <><span className="code-keyword">import</span> rebound</> },
  { line: 4, content: <><span className="code-keyword">import</span> numpy <span className="code-keyword">as</span> np</> },
  { line: 5, content: <><span className="code-keyword">import</span> matplotlib.pyplot <span className="code-keyword">as</span> plt</> },
  { line: 6, content: <br /> },
  { line: 7, content: <><span className="code-keyword">def</span> <span className="code-function">setup_simulation</span>(star_mass=<span className="code-number">1.0</span>, planet_mass=<span className="code-number">0.001</span>):</> },
  { line: 8, content: <>{"    "}<span className="code-comment"># Create a new simulation</span></> },
  { line: 9, content: <>{"    "}sim = rebound.Simulation()</> },
  { line: 10, content: <>{"    "}sim.integrator = <span className="code-string">"ias15"</span>  <span className="code-comment"># High accuracy integrator</span></> },
  { line: 11, content: <>{"    "}sim.G = <span className="code-number">1.0</span>  <span className="code-comment"># Gravitational constant</span></> },
  { line: 12, content: <br /> },
  { line: 13, content: <>{"    "}<span className="code-comment"># Add star and planet</span></> },
  { line: 14, content: <>{"    "}sim.add(m=star_mass)</> },
  { line: 15, content: <>{"    "}sim.add(m=planet_mass, a=<span className="code-number">1.0</span>, e=<span className="code-number">0.1</span>)</> },
  { line: 16, content: <>{"    "}sim.move_to_com()</> },
  { line: 17, content: <br /> },
  { line: 18, content: <>{"    "}<span className="code-keyword">return</span> sim</> },
  { line: 19, content: <br /> },
  { line: 20, content: <><span className="code-keyword">def</span> <span className="code-function">run_simulation</span>(sim, duration=<span className="code-number">100</span>):</> },
  { line: 21, content: <>{"    "}times = np.linspace(<span className="code-number">0</span>, duration*<span className="code-number">2</span>*np.pi, <span className="code-number">1000</span>)</> },
  { line: 22, content: <>{"    "}positions = []</> },
  { line: 23, content: <>{"    "}energies = []</> },
  { line: 24, content: <br /> },
  { line: 25, content: <>{"    "}<span className="code-comment"># Initial energy</span></> },
  { line: 26, content: <>{"    "}E0 = sim.calculate_energy()</> },
  { line: 27, content: <br /> },
  { line: 28, content: <>{"    "}<span className="code-keyword">for</span> i, t <span className="code-keyword">in</span> <span className="code-builtin">enumerate</span>(times):</> },
  { line: 29, content: <>{"        "}sim.integrate(t)</> },
  { line: 30, content: <br /> },
  { line: 31, content: <>{"        "}<span className="code-comment"># Store planet position</span></> },
  { line: 32, content: <>{"        "}planet = sim.particles[<span className="code-number">1</span>]</> },
  { line: 33, content: <>{"        "}positions.append([planet.x, planet.y])</> },
  { line: 34, content: <br /> },
  { line: 35, content: <>{"        "}<span className="code-comment"># Calculate energy conservation</span></> },
  { line: 36, content: <>{"        "}E = sim.calculate_energy()</> },
  { line: 37, content: <>{"        "}energies.append(<span className="code-builtin">abs</span>((E - E0)/E0))</> },
  { line: 38, content: <br /> },
  { line: 39, content: <>{"    "}<span className="code-keyword">return</span> np.array(positions), np.array(energies), times</> },
];

function createStars(container: HTMLDivElement) {
  for (let i = 0; i < 250; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random();
    star.classList.add(size < 0.6 ? "star-small" : size < 0.9 ? "star-medium" : "star-large");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 10}s`;
    star.style.animationDuration = `${8 + Math.random() * 10}s`;
    container.appendChild(star);
  }

  function createShootingStar() {
    const ss = document.createElement("div");
    ss.classList.add("shooting-star");
    const duration = 0.5 + Math.random() * 1.5;
    const delay = Math.random() * 5;
    ss.style.left = `${Math.random() * 100 - 10}%`;
    ss.style.top = `${Math.random() * 100 - 10}%`;
    ss.style.animation = `shoot ${duration}s ease-in-out ${delay}s forwards`;
    container.appendChild(ss);
    setTimeout(() => ss.remove(), (delay + duration) * 1000);
  }

  for (let i = 0; i < 3; i++) createShootingStar();
  const interval = setInterval(createShootingStar, 5000);
  return () => clearInterval(interval);
}

const Rebound = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const basePath = import.meta.env.BASE_URL;
  const resultImages = [
    {
      title: "Elliptical Orbit Simulation",
      alt: "Elliptical orbit simulation plot",
      src: `${basePath}rebound/elliptical-orbit-simulation.png`,
    },
    {
      title: "Energy Conservation Test",
      alt: "Energy conservation error plot",
      src: `${basePath}rebound/energy-conservation-test.png`,
    },
  ];

  useEffect(() => {
    if (starsRef.current) {
      const cleanup = createStars(starsRef.current);
      return cleanup;
    }
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0a0e17 0%, #0b1523 50%, #0f2027 100%)" }}
    >
      <div ref={starsRef} className="fixed inset-0 z-0 pointer-events-none" />

      <main className="max-w-[1400px] mx-auto p-5 relative z-[1]">
        {/* Header */}
        <header
          className="flex flex-col md:flex-row justify-between items-center mb-16 p-9 rounded-2xl border backdrop-blur-xl relative overflow-hidden"
          style={{
            background: "rgba(16, 32, 48, 0.92)",
            borderColor: "rgba(79, 172, 254, 0.15)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3), 0 0 0 1px rgba(79,172,254,0.1)",
          }}
        >
          <div>
            <h1
              className="text-3xl md:text-5xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #4facfe, #00f2fe, #6c8eff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                animation: "gradient-shift 8s ease infinite",
              }}
            >
              REBOUND N-Body Simulation
            </h1>
            <p className="text-[#a8c7fa] text-lg font-light tracking-wide">
              Astrophysical Modeling with Python
            </p>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-12">
          <h2
            className="text-2xl md:text-3xl mb-8 pb-4 flex items-center gap-4 relative"
            style={{
              color: "#00f2fe",
              borderBottom: "2px solid rgba(79, 172, 254, 0.2)",
            }}
          >
            <i className="fas fa-rocket text-[#4facfe]" />
            Astrophysics & Computational Modeling
            <span
              className="absolute bottom-[-2px] left-0 w-24 h-0.5"
              style={{ background: "linear-gradient(90deg, #4facfe, transparent)" }}
            />
          </h2>
          <div
            className="p-9 rounded-2xl border backdrop-blur-xl relative overflow-hidden mb-12"
            style={{
              background: "rgba(16, 32, 48, 0.92)",
              borderColor: "rgba(79, 172, 254, 0.15)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #4facfe, transparent)" }}
            />
            <p className="text-[#a8c7fa] leading-relaxed text-base">
              As I started to research more into{" "}
              <strong className="text-[#4facfe] font-semibold">astrophysics</strong> I started to
              realise the importance of{" "}
              <strong className="text-[#4facfe] font-semibold">computer programming</strong> in
              order to handle and sort through data as well as presenting it in a way that could
              return understandable information. Because of this I downloaded{" "}
              <strong className="text-[#4facfe] font-semibold">REBOUND</strong> and started playing
              around with values, coming up with a{" "}
              <strong className="text-[#4facfe] font-semibold">
                simulator for 0.3 to 1 mass ratio of a star and planet to map the planet's
                elliptical orbit shown below.
              </strong>
            </p>
          </div>
        </section>

        {/* Code & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mb-12">
          {/* Code */}
          <div
            className="rounded-2xl border overflow-hidden backdrop-blur-xl"
            style={{
              background: "rgba(16, 32, 48, 0.92)",
              borderColor: "rgba(79, 172, 254, 0.15)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="p-5 flex items-center justify-between"
              style={{
                background: "rgba(0,0,0,0.35)",
                borderBottom: "1px solid rgba(79, 172, 254, 0.15)",
              }}
            >
              <h3 className="text-[#00f2fe] text-lg flex items-center gap-3 m-0">
                <i className="fas fa-code" />
                N-Body Simulation Code
              </h3>
              <span
                className="text-[#a8c7fa] text-sm px-3 py-1 rounded-full"
                style={{
                  background: "rgba(79, 172, 254, 0.1)",
                  border: "1px solid rgba(79, 172, 254, 0.15)",
                }}
              >
                Python
              </span>
            </div>
            <div
              className="p-6 font-mono text-sm leading-relaxed overflow-x-auto max-h-[600px] overflow-y-auto relative"
              style={{ background: "#0f172a" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #4facfe, transparent)" }}
              />
              {codeLines.map((cl) => (
                <div key={cl.line} className="mb-0.5 whitespace-pre-wrap relative pl-12">
                  <span className="absolute left-0 text-white/30 text-xs w-8 text-right select-none">
                    {cl.line}
                  </span>
                  {cl.content}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-9">
            {resultImages.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border overflow-hidden transition-all duration-300 backdrop-blur-xl relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                style={{
                  background: "rgba(16, 32, 48, 0.92)",
                  borderColor: "rgba(79, 172, 254, 0.15)",
                }}
              >
                <div
                  className="w-full h-[200px] flex items-center justify-center p-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,32,48,0.9))",
                  }}
                >
                  <img
                    src={r.src}
                    alt={r.alt}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div
                  className="p-5 text-center font-medium text-[#00f2fe] relative"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    borderTop: "1px solid rgba(79, 172, 254, 0.15)",
                  }}
                >
                  {r.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl font-medium transition-all duration-300 border backdrop-blur-xl no-underline text-white hover:-translate-y-1"
              style={{
                background: "rgba(16, 32, 48, 0.92)",
                borderColor: "rgba(79, 172, 254, 0.15)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <i className="fas fa-arrow-left" />
              Back to Portfolio
            </Link>
            <a
              href="https://rebound.readthedocs.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl font-medium transition-all duration-300 border backdrop-blur-xl no-underline text-white hover:-translate-y-1"
              style={{
                background: "rgba(16, 32, 48, 0.92)",
                borderColor: "rgba(79, 172, 254, 0.15)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <i className="fas fa-book" />
              REBOUND Documentation
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Rebound;
