import { useNavigate } from "react-router-dom";
import hero3d from "../assets/hero-3d.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { min-height:100%; background:#ffffff; overflow-x:hidden; }
        .land { font-family:'DM Sans',sans-serif; min-height:100vh; background:#ffffff; color:#0a0a0a; overflow-x:hidden; }

        .container { max-width:1320px; margin:0 auto; padding:0 32px; }

        /* nav */
        .nav { height:80px; display:flex; align-items:center; justify-content:space-between; position:relative; z-index:30; }
        .nav-logo { display:flex; align-items:center; gap:10px; }
        .nav-logo-mark { width:32px; height:32px; border-radius:8px; background:#0a0a0a; display:flex; align-items:center; justify-content:center; }
        .nav-logo-mark span { color:#fff; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:15px; }
        .nav-logo-text { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:18px; letter-spacing:-0.4px; color:#0a0a0a; }
        .nav-links { display:flex; gap:36px; }
        .nav-link { font-size:14px; font-weight:500; color:#4b5563; cursor:pointer; transition:color .15s; background:none; border:none; font-family:inherit; padding:0; }
        .nav-link:hover { color:#0a0a0a; }
        .nav-actions { display:flex; align-items:center; gap:8px; }
        .nav-ghost { font-size:14px; font-weight:500; color:#374151; padding:9px 16px; border-radius:999px; background:transparent; border:none; cursor:pointer; font-family:inherit; transition:background .15s; }
        .nav-ghost:hover { background:rgba(10,10,10,0.05); }
        .nav-cta { font-size:14px; font-weight:600; color:#fff; padding:10px 20px; border-radius:999px; background:#0a0a0a; border:none; cursor:pointer; font-family:inherit; transition:opacity .2s; }
        .nav-cta:hover { opacity:.85; }

        /* hero */
        .hero { padding:8px 0 64px; position:relative; }
        .hero-grid {
          display:grid;
          grid-template-columns:minmax(0, 0.95fr) minmax(0, 1fr);
          gap:48px;
          align-items:center;
        }

        /* LEFT PANEL — contained rounded blue box, image overflows out of it */
        .hero-panel {
          position:relative;
          height:600px;
          border-radius:28px;
          background:linear-gradient(160deg,#dbe7ff 0%,#eef4ff 60%,#f5f8ff 100%);
          overflow:visible;
        }
        .hero-panel::before {
          content:"";
          position:absolute;
          inset:0;
          border-radius:28px;
          background:inherit;
          /* clip the panel itself but allow the image to overflow */
        }
        .hero-media {
          position:absolute;
          top:50%;
          left:50%;
          width:115%;
          max-width:none;
          height:auto;
          transform:translate(-45%, -50%);
          filter:drop-shadow(0 30px 50px rgba(37,99,235,0.22)) drop-shadow(0 12px 24px rgba(14,165,233,0.15));
          pointer-events:none;
          z-index:2;
          animation:floaty 7s ease-in-out infinite;
        }
        @keyframes floaty {
          0%,100% { transform:translate(-45%, -50%); }
          50%     { transform:translate(-45%, calc(-50% - 10px)); }
        }

        /* RIGHT CONTENT */
        .hero-content { display:flex; flex-direction:column; gap:24px; position:relative; z-index:3; max-width:560px; }

        .badge { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #e2e8f0; border-radius:999px; padding:6px 14px 6px 6px; width:fit-content; font-size:12px; font-weight:600; }
        .badge-pill { background:#2563eb; color:#fff; font-size:11px; font-weight:700; padding:3px 9px; border-radius:999px; letter-spacing:.3px; }
        .badge-text { color:#475569; font-weight:500; }

        .h1 { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:60px; line-height:1.04; letter-spacing:-2px; color:#0a0a0a; margin:0; }
        .h1 .accent-blue { background:linear-gradient(135deg,#2563eb,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .h1 .accent-red { color:#e02020; }

        .lede { font-size:16px; line-height:1.6; color:#475569; margin:0; }

        .features { display:flex; flex-direction:column; gap:12px; }
        .feature { display:flex; align-items:center; gap:12px; font-size:14.5px; color:#1f2937; }
        .feature-icon { width:30px; height:30px; border-radius:8px; background:#fff; border:1px solid #e2e8f0; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

        .ctas { display:flex; gap:12px; flex-wrap:wrap; padding-top:4px; }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:13px 24px; border-radius:999px; font-weight:600; font-size:14.5px; border:none; cursor:pointer; font-family:inherit; transition:transform .2s, box-shadow .2s; box-shadow:0 8px 24px -8px rgba(37,99,235,0.5); }
        .btn-primary:hover { transform:translateY(-1px); box-shadow:0 12px 28px -8px rgba(37,99,235,0.6); }
        .btn-secondary { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#0a0a0a; padding:13px 24px; border-radius:999px; font-weight:600; font-size:14.5px; border:1px solid #e2e8f0; cursor:pointer; font-family:inherit; transition:border-color .15s; }
        .btn-secondary:hover { border-color:#94a3b8; }

        .trust { display:flex; gap:20px; flex-wrap:wrap; }
        .trust-item { font-size:13px; color:#64748b; display:flex; align-items:center; gap:6px; }
        .trust-dot { width:4px; height:4px; border-radius:50%; background:#94a3b8; }

        .stats { display:grid; grid-template-columns:repeat(3,auto); gap:48px; padding-top:24px; margin-top:4px; border-top:1px solid #e5e7eb; }
        .stat-num { font-family:'Bricolage Grotesque',sans-serif; font-size:34px; font-weight:700; color:#0a0a0a; letter-spacing:-1px; line-height:1; }
        .stat-unit { font-size:14px; color:#2563eb; margin-left:4px; font-weight:600; }
        .stat-label { font-size:13px; color:#64748b; margin-top:6px; }

        @media (max-width: 980px) {
          .nav-links { display:none; }
          .hero-grid { grid-template-columns:1fr; gap:32px; }
          .hero-panel { height:380px; border-radius:20px; }
          .hero-media { width:105%; transform:translate(-50%, -50%); }
          @keyframes floaty {
            0%,100% { transform:translate(-50%, -50%); }
            50%     { transform:translate(-50%, calc(-50% - 8px)); }
          }
          .h1 { font-size:42px; letter-spacing:-1.5px; }
          .container { padding:0 20px; }
          .hero-content { max-width:100%; }
          .stats { gap:28px; }
        }
      `}</style>

      <div className="land">
        {/* ── NAVBAR ── */}
        <header className="container">
          <nav className="nav">
            <div className="nav-logo">
              <div className="nav-logo-mark"><span>C</span></div>
              <span className="nav-logo-text">Cuemath</span>
            </div>

            <div className="nav-links">
              {["How it works", "Features", "For Recruiters", "FAQ"].map((l) => (
                <button
                  key={l}
                  className="nav-link"
                  onClick={() => l === "For Recruiters" && navigate("/admin")}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="nav-actions">
              <button className="nav-ghost" onClick={() => navigate("/admin")}>Sign in</button>
              <button className="nav-cta" onClick={() => navigate("/setup")}>Get started</button>
            </div>
          </nav>
        </header>

        {/* ── HERO ── */}
        <section className="container hero">
          <div className="hero-grid">
            {/* Left panel — image overflows out of rounded container */}
            <div className="hero-panel">
              <img
                src={hero3d}
                alt="3D illustration of a friendly AI assistant surrounded by floating math symbols"
                className="hero-media"
              />
            </div>

            {/* Right content */}
            <div className="hero-content">
              <div className="badge">
                <span className="badge-pill">NEW</span>
                <span className="badge-text">AI tutor screener · free, no signup</span>
              </div>

              <h1 className="h1">
                <span className="accent-blue">AI screening</span> for top{" "}
                <span className="accent-red">math tutors</span>.
              </h1>

              <p className="lede">
                Cuemath’s AI voice interviewer conducts natural 8-minute screening
                calls and delivers a structured assessment the moment the call ends.
              </p>

              <div className="features">
                {[
                  {
                    icon: "https://api.iconify.design/lucide:mic.svg?color=%232563eb&width=16",
                    text: "Natural voice conversation — no typing required",
                  },
                  {
                    icon: "https://api.iconify.design/lucide:git-branch.svg?color=%230ea5e9&width=16",
                    text: "AI follows up on vague answers in real time",
                  },
                  {
                    icon: "https://api.iconify.design/lucide:bar-chart-2.svg?color=%232563eb&width=16",
                    text: "5-dimension rubric with transcript evidence",
                  },
                ].map((f, i) => (
                  <div className="feature" key={i}>
                    <div className="feature-icon">
                      <img src={f.icon} alt="" width={16} height={16} />
                    </div>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="ctas">
                <button className="btn-primary" onClick={() => navigate("/setup")}>
                  Start for free
                  <img
                    src="https://api.iconify.design/lucide:arrow-right.svg?color=%23ffffff&width=16"
                    width={16}
                    height={16}
                    alt=""
                  />
                </button>
                <button className="btn-secondary" onClick={() => navigate("/admin")}>
                  <img
                    src="https://api.iconify.design/lucide:lock.svg?color=%230a0a0a&width=15"
                    width={15}
                    height={15}
                    alt=""
                  />
                  Recruiter access
                </button>
              </div>

              <div className="trust">
                {["No signup required", "Works on Chrome", "Completely free"].map((t, i) => (
                  <span key={i} className="trust-item">
                    <span className="trust-dot" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="stats">
                {[
                  { n: "~8", unit: "min", l: "interview" },
                  { n: "5", unit: "skills", l: "assessed" },
                  { n: "Instant", unit: "", l: "reports" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="stat-num">
                      {s.n}
                      {s.unit && <span className="stat-unit">{s.unit}</span>}
                    </div>
                    <div className="stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
