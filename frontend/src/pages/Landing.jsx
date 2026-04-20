import { useNavigate } from "react-router-dom";

const IllustrationSVG = () => (
  <svg
    viewBox="0 0 520 580"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", display: "block" }}
  >
    {/* Background blobs */}
    <ellipse cx="260" cy="290" rx="200" ry="220" fill="#EEF4FF" />
    <ellipse cx="380" cy="160" rx="80" ry="80" fill="#DBEAFE" />
    <ellipse cx="120" cy="420" rx="70" ry="70" fill="#EDE9FE" />
    <ellipse cx="420" cy="400" rx="55" ry="55" fill="#FEF3C7" />

    {/* Desk */}
    <rect x="100" y="360" width="320" height="18" rx="9" fill="#C7D2FE" />
    <rect x="200" y="378" width="12" height="60" rx="6" fill="#A5B4FC" />
    <rect x="308" y="378" width="12" height="60" rx="6" fill="#A5B4FC" />

    {/* Laptop base */}
    <rect x="140" y="290" width="240" height="4" rx="2" fill="#818CF8" />
    <rect x="150" y="210" width="220" height="80" rx="12" fill="#1E40AF" />
    <rect x="160" y="218" width="200" height="64" rx="8" fill="#1E3A8A" />
    {/* Screen content */}
    <rect
      x="172"
      y="226"
      width="80"
      height="8"
      rx="4"
      fill="rgba(255,255,255,0.15)"
    />
    <rect
      x="172"
      y="240"
      width="120"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.08)"
    />
    <rect
      x="172"
      y="252"
      width="100"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.08)"
    />
    {/* Waveform on screen */}
    <rect x="172" y="265" width="4" height="12" rx="2" fill="#60A5FA" />
    <rect x="180" y="261" width="4" height="20" rx="2" fill="#60A5FA" />
    <rect x="188" y="258" width="4" height="26" rx="2" fill="#60A5FA" />
    <rect x="196" y="262" width="4" height="18" rx="2" fill="#60A5FA" />
    <rect x="204" y="265" width="4" height="12" rx="2" fill="#60A5FA" />
    <rect x="212" y="259" width="4" height="24" rx="2" fill="#60A5FA" />
    <rect x="220" y="263" width="4" height="16" rx="2" fill="#60A5FA" />
    <rect x="228" y="267" width="4" height="8" rx="2" fill="#60A5FA" />

    {/* Person body */}
    <ellipse cx="260" cy="185" rx="32" ry="32" fill="#FDE68A" />
    {/* Hair */}
    <ellipse cx="260" cy="162" rx="32" ry="18" fill="#1E293B" />
    {/* Headphones */}
    <path
      d="M228 185 Q228 155 260 155 Q292 155 292 185"
      fill="none"
      stroke="#4F46E5"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <rect x="222" y="183" width="12" height="18" rx="6" fill="#4F46E5" />
    <rect x="286" y="183" width="12" height="18" rx="6" fill="#4F46E5" />
    {/* Face */}
    <ellipse cx="253" cy="187" rx="3" ry="4" fill="#1E293B" />
    <ellipse cx="267" cy="187" rx="3" ry="4" fill="#1E293B" />
    <path
      d="M253 197 Q260 203 267 197"
      fill="none"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Shoulders */}
    <ellipse cx="260" cy="240" rx="44" ry="28" fill="#6366F1" />
    <rect x="216" y="228" width="88" height="40" rx="20" fill="#6366F1" />

    {/* Chat bubble left - AI */}
    <rect x="30" y="130" width="150" height="52" rx="14" fill="#fff" />
    <rect
      x="30"
      y="130"
      width="150"
      height="52"
      rx="14"
      fill="none"
      stroke="#E0E7FF"
      strokeWidth="1.5"
    />
    <polygon points="44,182 30,196 58,182" fill="#fff" />
    <rect x="44" y="144" width="90" height="7" rx="3.5" fill="#C7D2FE" />
    <rect x="44" y="157" width="70" height="7" rx="3.5" fill="#EDE9FE" />
    {/* AI badge */}
    <rect x="44" y="136" width="28" height="14" rx="7" fill="#4F46E5" />
    <text
      x="58"
      y="146"
      textAnchor="middle"
      fill="#fff"
      fontSize="8"
      fontWeight="700"
      fontFamily="sans-serif"
    >
      AI
    </text>

    {/* Chat bubble right - User */}
    <rect x="340" y="230" width="140" height="48" rx="14" fill="#4F46E5" />
    <polygon points="466,278 480,292 452,278" fill="#4F46E5" />
    <rect
      x="354"
      y="244"
      width="80"
      height="7"
      rx="3.5"
      fill="rgba(255,255,255,0.4)"
    />
    <rect
      x="354"
      y="257"
      width="60"
      height="7"
      rx="3.5"
      fill="rgba(255,255,255,0.25)"
    />

    {/* Floating score badge */}
    <rect x="360" y="130" width="120" height="72" rx="14" fill="#fff" />
    <rect
      x="360"
      y="130"
      width="120"
      height="72"
      rx="14"
      fill="none"
      stroke="#E0E7FF"
      strokeWidth="1.5"
    />
    <text
      x="375"
      y="148"
      fill="#6366F1"
      fontSize="8"
      fontWeight="700"
      fontFamily="sans-serif"
    >
      SCORE
    </text>
    {/* bars */}
    <rect x="375" y="155" width="80" height="5" rx="2.5" fill="#EEF2FF" />
    <rect x="375" y="155" width="64" height="5" rx="2.5" fill="#6366F1" />
    <rect x="375" y="165" width="80" height="5" rx="2.5" fill="#EEF2FF" />
    <rect x="375" y="165" width="80" height="5" rx="2.5" fill="#10B981" />
    <rect x="375" y="175" width="80" height="5" rx="2.5" fill="#EEF2FF" />
    <rect x="375" y="175" width="56" height="5" rx="2.5" fill="#F59E0B" />
    <rect x="375" y="188" width="88" height="6" rx="3" fill="#D1FAE5" />
    <text
      x="419"
      y="194"
      textAnchor="middle"
      fill="#065F46"
      fontSize="7"
      fontWeight="700"
      fontFamily="sans-serif"
    >
      Strong Yes ✓
    </text>

    {/* Floating mic icon */}
    <circle cx="76" cy="300" r="24" fill="#FEF3C7" />
    <rect x="70" y="286" width="12" height="20" rx="6" fill="#F59E0B" />
    <path
      d="M64 302 Q64 314 76 314 Q88 314 88 302"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="74" y="314" width="4" height="8" rx="2" fill="#F59E0B" />

    {/* Sparkles */}
    <circle cx="450" cy="100" r="5" fill="#FCD34D" />
    <circle cx="80" cy="100" r="4" fill="#A78BFA" />
    <circle cx="470" cy="320" r="6" fill="#6EE7B7" />
    <circle cx="50" cy="360" r="4" fill="#FCA5A5" />
  </svg>
);

export default function Landing() {
  const navigate = useNavigate();
  localStorage.removeItem("candidateName");
  localStorage.removeItem("candidateRole");
  localStorage.removeItem("candidateEmail");
  localStorage.removeItem("candidateId");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; overflow:hidden; }
        .land { font-family:'DM Sans',sans-serif; height:100vh; display:grid; grid-template-rows:64px 1fr; background:#fff; overflow:hidden; }
        .nav { display:flex; align-items:center; justify-content:space-between; padding:0 52px; border-bottom:1px solid #f1f5f9; }
        .nav-logo { display:flex; align-items:center; gap:9px; }
        .nav-logo-mark { width:32px; height:32px; border-radius:8px; background:#0a0a0a; display:flex; align-items:center; justify-content:center; }
        .nav-logo-mark span { color:#fff; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:15px; }
        .nav-logo-text { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:18px; letter-spacing:-0.4px; color:#0a0a0a; }
        .nav-cta { font-size:14px; font-weight:600; color:#fff; padding:10px 22px; border-radius:999px; background:#0a0a0a; border:none; cursor:pointer; font-family:inherit; transition:opacity .2s; }
        .nav-cta:hover { opacity:.8; }
        .hero { display:grid; grid-template-columns:1fr 1fr; overflow:hidden; }
        .hero-left { background:#F8F7FF; display:flex; align-items:center; justify-content:center; padding:40px; overflow:hidden; }
        .hero-right { display:flex; flex-direction:column; justify-content:center; padding:0 64px; gap:28px; }
        .badge { display:inline-flex; align-items:center; gap:8px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:999px; padding:6px 16px; width:fit-content; }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:#0ea5e9; flex-shrink:0; }
        .badge-text { font-size:12px; color:#0369a1; font-weight:600; }
        .h1 { font-family:'Bricolage Grotesque',sans-serif; font-weight:900; font-size:58px; line-height:1.05; letter-spacing:-2px; color:#0a0a0a; margin:0; }
        .accent-blue { background:linear-gradient(135deg,#2563eb,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .accent-red { color:#e02020; -webkit-text-fill-color:#e02020; }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:16px 36px; border-radius:999px; font-weight:700; font-size:16px; border:none; cursor:pointer; font-family:inherit; box-shadow:0 8px 24px -6px rgba(37,99,235,0.45); transition:transform .2s,box-shadow .2s; }
        .btn-primary:hover { transform:translateY(-1px); box-shadow:0 12px 28px -6px rgba(37,99,235,0.55); }
        .stats { display:flex; padding-top:24px; border-top:1px solid #f1f5f9; }
        .stat { flex:1; }
        .stat+.stat { border-left:1px solid #f1f5f9; padding-left:28px; }
        .stat-num { font-family:'Bricolage Grotesque',sans-serif; font-size:30px; font-weight:900; color:#0a0a0a; letter-spacing:-0.8px; line-height:1; }
        .stat-unit { font-size:13px; color:#2563eb; margin-left:3px; font-weight:700; }
        .stat-label { font-size:11px; color:#9ca3af; margin-top:5px; }
        .admin-hint { position:fixed; bottom:16px; right:20px; font-size:11px; color:rgba(0,0,0,0.15); cursor:pointer; text-decoration:underline; text-decoration-color:rgba(0,0,0,0.1); z-index:50; }
        .admin-hint:hover { color:rgba(0,0,0,0.35); }
      `}</style>

      <div className="land">
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-mark">
              <span>C</span>
            </div>
            <span className="nav-logo-text">Cuemath</span>
          </div>
          <button className="nav-cta" onClick={() => navigate("/setup")}>
            Get started
          </button>
        </nav>

        <div className="hero">
          {/* LEFT — flat illustration */}
          <div className="hero-left">
            <IllustrationSVG />
          </div>

          {/* RIGHT — text + animated path */}
          <div
            className="hero-right"
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* Subtle animated path background */}
            <svg
              viewBox="0 0 500 600"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.18,
                pointerEvents: "none",
              }}
            >
              <defs>
                <style>{`
        @keyframes draw {
          from { stroke-dashoffset: 1200; }
          to   { stroke-dashoffset: 0; }
        }
        .path-line {
          fill: none;
          stroke: #2563eb;
          stroke-width: 1.5;
          stroke-dasharray: 6 8;
          stroke-dashoffset: 1200;
          stroke-linecap: round;
          animation: draw 3s ease-out forwards;
        }
      `}</style>
              </defs>

              {/* The winding path */}
              <path
                id="flightPath"
                className="path-line"
                d="M 420 560
         C 460 480, 80 440, 120 360
         C 160 280, 440 260, 400 180
         C 360 100, 100 80, 140 30"
              />

              {/* Paper plane traveling along path */}
              <g>
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  rotate="auto"
                  begin="0.5s"
                >
                  <mpath href="#flightPath" />
                </animateMotion>
                {/* Paper plane shape */}
                <g transform="scale(0.9)">
                  <path
                    d="M0 0 L-12 5 L-10 0 L-12 -5 Z"
                    fill="#2563eb"
                    opacity="0.7"
                  />
                  <path
                    d="M-10 0 L-12 5 L-6 2 Z"
                    fill="#1d4ed8"
                    opacity="0.5"
                  />
                </g>
              </g>
            </svg>

            {/* Content on top */}
            <div className="badge">
              <span className="badge-dot" />
              <span className="badge-text">
                AI Tutor Screener · Free · No Signup
              </span>
            </div>

            <h1 className="h1">
              <span className="accent-blue">AI screening</span>
              <br />
              for top <span className="accent-red">math</span>
              <br />
              tutors.
            </h1>

            <p
              style={{
                fontSize: 16,
                color: "#6b7280",
                lineHeight: 1.75,
                maxWidth: 400,
                margin: 0,
              }}
            >
              Cuemath's AI voice interviewer conducts natural 8-minute screening
              calls and delivers a structured soft-skill assessment — the moment
              the call ends.
            </p>

            <div>
              <button
                className="btn-primary"
                onClick={() => navigate("/setup")}
              >
                Start for free
                <img
                  src="https://api.iconify.design/lucide:arrow-right.svg?color=white&width=16"
                  width={16}
                  height={16}
                  alt=""
                />
              </button>
            </div>

            <div className="stats">
              {[
                { n: "~8", unit: "min", l: "interview" },
                { n: "5", unit: "skills", l: "assessed" },
                { n: "Instant", unit: "", l: "reports" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="stat"
                  style={{ paddingLeft: i > 0 ? 28 : 0 }}
                >
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
      </div>

      <span className="admin-hint" onClick={() => navigate("/admin")}>
        admin
      </span>
    </>
  );
}
