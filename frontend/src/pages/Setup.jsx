import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [micTested, setMicTested] = useState(false);
  const [testing, setTesting] = useState(false);
  const [focused, setFocused] = useState("");
  const [toast, setToast] = useState(null);

  const testMic = async () => {
    setTesting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicTested(true);
    } catch {
      alert(
        "Microphone access denied. Please allow mic access in your browser settings.",
      );
    }
    setTesting(false);
  };

  const handleStart = () => {
    if (!name.trim() || !role.trim())
      return alert("Please enter your name and role.");
    if (!micTested) return alert("Please test your microphone first.");
    localStorage.setItem("candidateName", name);
    localStorage.setItem("candidateRole", role);
    if (!email.trim() || !email.includes("@"))
      return showToast("Please enter a valid email.");
    localStorage.setItem("candidateEmail", email);
    navigate("/interview");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; }
        .setup { font-family:'DM Sans',sans-serif; min-height:100vh; background:#eef4ff; display:flex; flex-direction:column; }
        .inp {
          width:100%; padding:14px 18px;
          border:1.5px solid #e2e8f0;
          border-radius:12px; font-size:15px;
          color:#0a0a0a; background:#fff;
          font-family:'DM Sans',sans-serif;
          outline:none; transition:border-color .2s, box-shadow .2s;
        }
        .inp:focus { border-color:#2563eb; box-shadow:0 0 0 4px rgba(37,99,235,0.08); }
        .inp::placeholder { color:#adb5bd; }
        select.inp { appearance:none; cursor:pointer; }
        .btn-main { background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:16px; border-radius:12px; font-weight:700; font-size:16px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; width:100%; transition:opacity .2s,transform .2s; }
        .btn-main:hover { opacity:.92; transform:translateY(-1px); }
        .btn-main:disabled { opacity:.5; cursor:not-allowed; transform:none; }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        .ring { animation:pulse-ring 1.5s ease-out infinite; }
      `}</style>

      <div className="setup">
        {/* Navbar */}
        <nav
          style={{
            height: 60,
            background: "rgba(238,244,255,0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            padding: "0 52px",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 14,
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
          <span style={{ fontSize: 13, color: "#9ca3af" }}>
            Tutor Screening · Setup
          </span>
        </nav>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            padding: "48px 48px",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* LEFT — info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* GMeet-style mic visual */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#1e293b",
                borderRadius: 24,
                padding: "48px 0",
                gap: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background blur circles */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  left: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(37,99,235,0.15)",
                  filter: "blur(40px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(14,165,233,0.1)",
                  filter: "blur(40px)",
                }}
              />

              {/* Mic orb — gmeet style */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                }}
              >
                {micTested && (
                  <>
                    <div
                      className="ring"
                      style={{
                        position: "absolute",
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        border: "2px solid rgba(37,99,235,0.5)",
                      }}
                    />
                    <div
                      className="ring"
                      style={{
                        position: "absolute",
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        border: "2px solid rgba(37,99,235,0.3)",
                        animationDelay: "0.5s",
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: micTested
                      ? "linear-gradient(135deg,#2563eb,#0ea5e9)"
                      : "rgba(255,255,255,0.08)",
                    border: micTested
                      ? "none"
                      : "2px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .4s",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <img
                    src={`https://api.iconify.design/lucide:mic.svg?color=white&width=32`}
                    width={32}
                    height={32}
                    alt="mic"
                  />
                </div>
              </div>

              <div
                style={{ textAlign: "center", zIndex: 2, position: "relative" }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {micTested ? "Microphone ready ✓" : "Microphone check"}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  {micTested
                    ? "You're all set to start"
                    : "Click test mic below before starting"}
                </div>
              </div>

              {/* Fake audio bar visualization */}
              {micTested && (
                <div
                  style={{
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-end",
                    height: 28,
                    zIndex: 2,
                  }}
                >
                  {[
                    8, 14, 20, 12, 18, 10, 22, 16, 10, 14, 8, 12, 20, 16, 10,
                  ].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: h,
                        background: "rgba(255,255,255,0.4)",
                        borderRadius: 2,
                        animation: `wave${i % 3} 1s ${i * 0.08}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Wave keyframes inline */}
              <style>{`
                @keyframes wave0{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.8)}}
                @keyframes wave1{0%,100%{transform:scaleY(1)}50%{transform:scaleY(2.2)}}
                @keyframes wave2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.5)}}
              `}</style>
            </div>

            {/* What to expect */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "28px 28px",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                What to expect
              </div>
              {[
                {
                  icon: "🎙️",
                  title: "Voice conversation",
                  desc: "5 questions, ~8 minutes total",
                },
                {
                  icon: "🤖",
                  title: "AI interviewer",
                  desc: "Natural, adaptive, no scripts",
                },
                {
                  icon: "📊",
                  title: "Instant report",
                  desc: "Ready the moment you finish",
                },
                {
                  icon: "🌐",
                  title: "Chrome only",
                  desc: "Web Speech API required",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: i < 3 ? 16 : 0,
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0a0a0a",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{ fontSize: 13, color: "#9ca3af", marginTop: 1 }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-1px",
                  margin: "0 0 10px",
                }}
              >
                Let's get you{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  set up
                </span>
              </h1>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6 }}>
                Fill in your details and test your mic — then you're ready to
                begin.
              </p>
            </div>

            {/* Name */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Full name
              </label>
              <input
                className="inp"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
              />
            </div>

            {/* Role */}
            <div style={{ marginBottom: 16, position: "relative" }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Applying for
              </label>
              <select
                className="inp"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a role</option>
                <option value="Math Tutor">Math Tutor</option>
                <option value="Senior Math Tutor">Senior Math Tutor</option>
                <option value="Lead Tutor">Lead Tutor</option>
              </select>
              <div
                style={{
                  position: "absolute",
                  right: 16,
                  top: "42px",
                  pointerEvents: "none",
                }}
              >
                <img
                  src="https://api.iconify.design/lucide:chevron-down.svg?color=%236b7280&width=16"
                  width={16}
                  height={16}
                  alt=""
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Email address
                <span
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    fontWeight: 400,
                    marginLeft: 6,
                  }}
                >
                  We'll send your results here
                </span>
              </label>
              <input
                className="inp"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError?.("");
                }}
                placeholder="e.g. priya@gmail.com"
              />
            </div>

            {/* Mic test */}
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Microphone check
              </label>
              {micTested ? (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: 12,
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 18 }}>✅</span>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#15803d",
                      }}
                    >
                      Microphone is working!
                    </div>
                    <div style={{ fontSize: 12, color: "#16a34a" }}>
                      You're ready to start the interview
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={testMic}
                  disabled={testing}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: "1.5px dashed #93c5fd",
                    borderRadius: 12,
                    background: "rgba(219,234,254,0.3)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    color: "#2563eb",
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: "DM Sans,sans-serif",
                    transition: "all .2s",
                  }}
                >
                  <img
                    src="https://api.iconify.design/lucide:mic.svg?color=%232563eb&width=16"
                    width={16}
                    height={16}
                    alt=""
                  />
                  {testing ? "Checking your mic..." : "Test microphone"}
                </button>
              )}
            </div>

            {/* Start button */}
            <button
              className="btn-main"
              onClick={handleStart}
              disabled={!name.trim() || !role || !micTested}
            >
              Start Interview →
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#9ca3af",
                marginTop: 8,
              }}
            >
              By continuing you agree this interview will be recorded and
              assessed by AI.
            </p>
          </div>
        </div>
      </div>
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            background: toast.type === "success" ? "#0a0a0a" : "#dc2626",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 999,
            whiteSpace: "nowrap",
            animation: "slideUp .25s ease",
          }}
        >
          <span>{toast.type === "success" ? "✓" : "⚠"}</span>
          {toast.msg}
        </div>
      )}
      <style>{`@keyframes slideUp { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }`}</style>
    </>
  );
}
