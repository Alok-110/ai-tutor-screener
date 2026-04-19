import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; overflow:hidden; }
        .land { font-family:'DM Sans',sans-serif; height:100vh; display:flex; flex-direction:column; background:#eef4ff; }
        .nav-link { font-size:14px; font-weight:500; color:#374151; cursor:pointer; transition:color .15s; }
        .nav-link:hover { color:#0a0a0a; }
        .nav-icon-btn { width:38px; height:38px; border-radius:50%; border:1.5px solid #d1d5db; background:rgba(255,255,255,0.7); display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .nav-icon-btn:hover { border-color:#6b7280; }
        .btn-main { background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:14px 32px; border-radius:999px; font-weight:700; font-size:15px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; display:inline-flex; align-items:center; gap:8px; transition:opacity .2s,transform .2s; white-space:nowrap; }
        .btn-main:hover { opacity:.9; transform:translateY(-1px); }
        .btn-outline { background:rgba(255,255,255,0.8); color:#111; padding:14px 32px; border-radius:999px; font-weight:600; font-size:15px; border:1.5px solid #d1d5db; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; white-space:nowrap; }
        .btn-outline:hover { border-color:#6b7280; }
      `}</style>

      <div className="land">
        {/* ── NAVBAR — no border, blends into page ── */}
        <nav
          style={{
            height: 64,
            flexShrink: 0,
            background: "transparent",
            display: "flex",
            alignItems: "center",
            padding: "0 52px",
            justifyContent: "space-between",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 900,
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                }}
              >
                C
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "#0a0a0a",
                letterSpacing: "-0.4px",
              }}
            >
              Cuemath
            </span>
          </div>

          <div style={{ display: "flex", gap: 40 }}>
            {["How it works", "Features", "For Recruiters", "FAQ"].map((l) => (
              <span
                key={l}
                className="nav-link"
                onClick={() => l === "For Recruiters" && navigate("/admin")}
              >
                {l}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div className="nav-icon-btn" onClick={() => navigate("/admin")}>
              <img
                src="https://api.iconify.design/lucide:log-in.svg?color=%23374151&width=16"
                width={16}
                height={16}
                alt=""
              />
            </div>
            <div className="nav-icon-btn" onClick={() => navigate("/setup")}>
              <img
                src="https://api.iconify.design/lucide:user.svg?color=%23374151&width=16"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
        </nav>

        {/* ── HERO — two halves, full height ── */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "50% 50%",
            height: "100vh",
          }}
        >
          {/* LEFT HALF — pure background image, covers completely */}
          <div
            style={{
              backgroundImage: "url(/hero.png)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              height: "100%",
            }}
          />

          {/* RIGHT HALF — text content */}
          {/* RIGHT HALF — text content */}
          <div
            style={{
              height: "100%",
              background: "#eef4ff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 60px",
              gap: 24,
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.18)",
                borderRadius: 999,
                padding: "7px 16px",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#2563eb",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 12, color: "#1d4ed8", fontWeight: 600 }}>
                AI Tutor Screener · Free · No Signup
              </span>
            </div>

            {/* Headline — bigger to fill space */}
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 900,
                lineHeight: 1.06,
                letterSpacing: "-2px",
                margin: 0,
              }}
            >
              <span
                style={{
                  fontSize: 74,
                  display: "block",
                  background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI screening
              </span>
              <span
                style={{ fontSize: 74, display: "block", color: "#0a0a0a" }}
              >
                for top
              </span>
              <span style={{ fontSize: 74, display: "block" }}>
                <span style={{ color: "#e02020" }}>math</span>
                <span style={{ color: "#0a0a0a" }}> tutors.</span>
              </span>
            </h1>

            {/* Sub */}
            <p
              style={{
                fontSize: 17,
                color: "#6b7280",
                lineHeight: 1.75,
                maxWidth: "100%",
                margin: 0,
              }}
            >
              Cuemath's{" "}
              <span style={{ color: "#2563eb", fontWeight: 600 }}>
                AI voice interviewer
              </span>{" "}
              conducts natural 8-minute screening calls and delivers a{" "}
              <span style={{ color: "#e02020", fontWeight: 600 }}>
                structured assessment
              </span>{" "}
              — the moment the call ends.
            </p>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  icon: "https://api.iconify.design/lucide:mic.svg?color=%232563eb&width=15",
                  text: "Natural voice conversation — no typing required",
                },
                {
                  icon: "https://api.iconify.design/lucide:git-branch.svg?color=%230ea5e9&width=15",
                  text: "AI follows up on vague answers in real time",
                },
                {
                  icon: "https://api.iconify.design/lucide:bar-chart-2.svg?color=%232563eb&width=15",
                  text: "5-dimension rubric with transcript evidence",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 15,
                    color: "#4b5563",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img src={f.icon} alt="" width={15} height={15} />
                  </div>
                  {f.text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-main" onClick={() => navigate("/setup")}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                  }}
                >
                  →
                </span>
                Start for free
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate("/admin")}
              >
                🔒 Recruiter access
              </button>
            </div>

            {/* Trust */}
            <div style={{ display: "flex", gap: 24 }}>
              {["No signup required", "Works on Chrome", "Completely free"].map(
                (t, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 13,
                      color: "#9ca3af",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span style={{ color: "#d1d5db" }}>◦</span>
                    {t}
                  </span>
                ),
              )}
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                paddingTop: 24,
                borderTop: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {[
                { n: "~8", unit: "min", l: "interview" },
                { n: "5", unit: "skills", l: "assessed" },
                { n: "Instant", unit: "", l: "reports" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    paddingRight: i < 2 ? 28 : 0,
                    borderRight: i < 2 ? "1px solid #e5e7eb" : "none",
                    paddingLeft: i > 0 ? 28 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bricolage Grotesque',sans-serif",
                      fontSize: 32,
                      fontWeight: 800,
                      color: "#0a0a0a",
                      letterSpacing: "-0.8px",
                    }}
                  >
                    {s.n}
                    {s.unit && (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#2563eb",
                          marginLeft: 4,
                          fontWeight: 700,
                        }}
                      >
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
