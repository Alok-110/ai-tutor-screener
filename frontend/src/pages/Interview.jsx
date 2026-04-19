import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import { startSession, sendMessage, endSession } from "../services/api";

export default function Interview() {
  const sendingRef = useRef(false);
  const endedRef = useRef(false);
  const navigate = useNavigate();
  const [candidateId, setCandidateId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const totalQuestions = 5;
  const bottomRef = useRef(null);
  const timerRef = useRef(null);
  const pendingTranscript = useRef("");

  const { listening, startListening, stopListening } = useSpeechRecognition({
    onFinalTranscript: (text) => {
      pendingTranscript.current = text;
    },
  });
  const { speak, cancel } = useSpeechSynthesis();

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  useEffect(() => {
    const init = async () => {
      const name = localStorage.getItem("candidateName");
      const role = localStorage.getItem("candidateRole");
      if (!name || !role) return navigate("/");
      const email = localStorage.getItem("candidateEmail") || "";
      const res = await startSession(name, role, email);
      setCandidateId(res.data.candidateId);
      addMessage("ai", res.data.message);
      speakAI(res.data.message);
    };
    init();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (speaker, text) => {
    setMessages((prev) => [...prev, { speaker, text }]);
  };

  const speakAI = (text, onEnd) => {
    setStatus("ai-speaking");
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.name.includes("Female") ||
        v.name.includes("Samantha") ||
        v.name.includes("Google UK English Female"),
    );
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = femaleVoice || voices[0];
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      setStatus("listening");
      onEnd?.();
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (sendingRef.current) return;
    if (endedRef.current) return;
    const text = pendingTranscript.current;
    if (!text.trim()) return;
    sendingRef.current = true;
    pendingTranscript.current = "";
    setStatus("processing");
    addMessage("candidate", text);
    setQuestionIndex((q) => Math.min(q + 1, totalQuestions));
    try {
      const res = await sendMessage(candidateId, text);
      addMessage("ai", res.data.message);
      if (res.data.isComplete) {
        speakAI(res.data.message, async () => {
          if (endedRef.current) return;
          endedRef.current = true;
          setStatus("ending");
          await endSession(candidateId);
          navigate("/done");
        });
      } else {
        speakAI(res.data.message);
      }
    } finally {
      sendingRef.current = false;
    }
  };

  const name = localStorage.getItem("candidateName") || "Candidate";

  const statusConfig = {
    connecting: { label: "Connecting…", color: "#9ca3af" },
    "ai-speaking": { label: "AI is speaking…", color: "#2563eb" },
    listening: { label: "Your turn to speak", color: "#10b981" },
    processing: { label: "Processing…", color: "#f59e0b" },
    ending: { label: "Wrapping up…", color: "#9ca3af" },
  };

  const sc = statusConfig[status] || statusConfig.connecting;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; overflow:hidden; }
        .iv { font-family:'DM Sans',sans-serif; height:100vh; display:flex; flex-direction:column; background:#eef4ff; }
        .bubble-ai { background:#fff; border:1px solid rgba(0,0,0,0.07); border-radius:18px 18px 18px 4px; padding:13px 16px; font-size:14px; color:#1e293b; line-height:1.6; max-width:85%; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
        .bubble-user { background:linear-gradient(135deg,#2563eb,#0ea5e9); border-radius:18px 18px 4px 18px; padding:13px 16px; font-size:14px; color:#fff; line-height:1.6; max-width:85%; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .blink { animation:blink 1s infinite; }
        @keyframes wave { 0%,100%{height:4px} 50%{height:16px} }
        .bar { width:3px; background:#fff; border-radius:2px; min-height:4px; }
        .b1{animation:wave 0.9s 0.0s infinite ease-in-out}
        .b2{animation:wave 0.9s 0.1s infinite ease-in-out}
        .b3{animation:wave 0.9s 0.2s infinite ease-in-out}
        .b4{animation:wave 0.9s 0.15s infinite ease-in-out}
        .b5{animation:wave 0.9s 0.05s infinite ease-in-out}
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        .mic-ring { animation:pulse-ring 1.2s ease-out infinite; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }
      `}</style>

      <div className="iv">
        {/* ── NAVBAR ── */}
        <nav
          style={{
            height: 58,
            background: "rgba(238,244,255,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            justifyContent: "space-between",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
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
                  fontSize: 13,
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
                fontSize: 16,
                color: "#0a0a0a",
              }}
            >
              Cuemath
            </span>
            <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>
              · Screening Interview
            </span>
          </div>

          {/* Progress pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#9ca3af", marginRight: 4 }}>
              Progress
            </span>
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i < questionIndex
                      ? "#2563eb"
                      : i === questionIndex
                        ? "rgba(37,99,235,0.3)"
                        : "#e2e8f0",
                  transition: "all .4s",
                }}
              />
            ))}
            <span
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginLeft: 4,
                fontWeight: 600,
              }}
            >
              {Math.min(questionIndex + 1, 5)}/5
            </span>
          </div>

          {/* Timer + candidate */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 999,
                padding: "6px 14px",
              }}
            >
              <img
                src="https://api.iconify.design/lucide:clock.svg?color=%236b7280&width=13"
                width={13}
                height={13}
                alt=""
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: "monospace",
                }}
              >
                {formatTime(elapsed)}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {name[0].toUpperCase()}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
                {name}
              </span>
            </div>
          </div>
        </nav>

        {/* ── MAIN BODY ── */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            overflow: "hidden",
          }}
        >
          {/* ── LEFT SIDEBAR ── */}
          <div
            style={{
              borderRight: "1px solid rgba(0,0,0,0.06)",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px",
              gap: 20,
              overflowY: "auto",
            }}
          >
            {/* AI Tutor card */}
            <div
              style={{
                background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
                borderRadius: 20,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                textAlign: "center",
              }}
            >
              {/* AI Avatar */}
              <div style={{ position: "relative" }}>
                {status === "ai-speaking" && (
                  <div
                    className="mic-ring"
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: "50%",
                      border: "2px solid rgba(37,99,235,0.5)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background:
                      status === "ai-speaking" ? "#10b981" : "#9ca3af",
                    border: "2px solid #1e3a8a",
                    zIndex: 2,
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Aria
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    marginTop: 2,
                  }}
                >
                  Cuemath AI Interviewer
                </div>
              </div>
              {/* Speaking indicator */}
              {status === "ai-speaking" ? (
                <div
                  style={{
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  {["b1", "b2", "b3", "b4", "b5"].map((c) => (
                    <div key={c} className={`bar ${c}`} />
                  ))}
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      marginLeft: 6,
                    }}
                  >
                    Speaking…
                  </span>
                </div>
              ) : (
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                  {status === "listening"
                    ? "Waiting for your response"
                    : status === "processing"
                      ? "Processing…"
                      : "Initialising…"}
                </div>
              )}
            </div>

            {/* Status card */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Session Status
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  { label: "Status", value: sc.label, color: sc.color },
                  {
                    label: "Question",
                    value: `${Math.min(questionIndex + 1, 5)} of ${totalQuestions}`,
                    color: "#374151",
                  },
                  {
                    label: "Duration",
                    value: formatTime(elapsed),
                    color: "#374151",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: row.color,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 14,
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1d4ed8",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                💡 Tips
              </div>
              {[
                "Speak clearly and at a natural pace",
                "Give specific examples when you can",
                "Take a breath before answering",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: i < 2 ? 10 : 0,
                    fontSize: 12,
                    color: "#3b82f6",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: 1 }}>·</span>
                  {t}
                </div>
              ))}
            </div>

            {/* Question tracker */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Questions
              </div>
              {[
                "Introduction",
                "Teaching approach",
                "Handling difficulty",
                "Checking understanding",
                "Experience",
              ].map((q, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: i < 4 ? 10 : 0,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      background:
                        i < questionIndex
                          ? "#2563eb"
                          : i === questionIndex
                            ? "#eff6ff"
                            : "#f1f5f9",
                      color:
                        i < questionIndex
                          ? "#fff"
                          : i === questionIndex
                            ? "#2563eb"
                            : "#9ca3af",
                      border:
                        i === questionIndex ? "1.5px solid #2563eb" : "none",
                    }}
                  >
                    {i < questionIndex ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color:
                        i < questionIndex
                          ? "#9ca3af"
                          : i === questionIndex
                            ? "#1e293b"
                            : "#9ca3af",
                      fontWeight: i === questionIndex ? 600 : 400,
                      textDecoration:
                        i < questionIndex ? "line-through" : "none",
                    }}
                  >
                    {q}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CHAT AREA ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {messages.length === 0 && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    opacity: 0.4,
                  }}
                >
                  <span style={{ fontSize: 32 }}>🎙️</span>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>
                    Starting your interview…
                  </span>
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-end",
                    flexDirection:
                      m.speaker === "candidate" ? "row-reverse" : "row",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      background:
                        m.speaker === "ai"
                          ? "linear-gradient(135deg,#2563eb,#0ea5e9)"
                          : "linear-gradient(135deg,#10b981,#059669)",
                    }}
                  >
                    {m.speaker === "ai" ? "🤖" : name[0].toUpperCase()}
                  </div>
                  <div
                    className={m.speaker === "ai" ? "bubble-ai" : "bubble-user"}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {status === "processing" && (
                <div
                  style={{ display: "flex", gap: 10, alignItems: "flex-end" }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    🤖
                  </div>
                  <div
                    className="bubble-ai"
                    style={{
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                      padding: "14px 18px",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="blink"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#9ca3af",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── MIC CONTROLS ── */}
            <div
              style={{
                background: "#fff",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                padding: "20px 40px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexShrink: 0,
              }}
            >
              {/* Status badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 999,
                  padding: "8px 16px",
                  minWidth: 180,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: sc.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}
                >
                  {sc.label}
                </span>
              </div>

              {/* Mic button */}
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {listening && (
                    <div
                      style={{
                        position: "absolute",
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        border: "2px solid rgba(239,68,68,0.3)",
                        animation: "pulse-ring 1.2s ease-out infinite",
                      }}
                    />
                  )}
                  <button
                    onClick={() => {
                      if (listening) {
                        stopListening();
                        setTimeout(() => handleSend(), 600);
                      } else {
                        if (status === "listening") startListening();
                      }
                    }}
                    disabled={status !== "listening"}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "none",
                      cursor:
                        status === "listening" ? "pointer" : "not-allowed",
                      background: listening
                        ? "#ef4444"
                        : status === "listening"
                          ? "linear-gradient(135deg,#2563eb,#0ea5e9)"
                          : "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .2s",
                      transform: listening ? "scale(1.05)" : "scale(1)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={
                        listening
                          ? "https://api.iconify.design/lucide:mic-off.svg?color=white&width=22"
                          : "https://api.iconify.design/lucide:mic.svg?color=white&width=22"
                      }
                      width={22}
                      height={22}
                      alt="mic"
                    />
                  </button>
                </div>
              </div>

              {/* Waveform when recording */}
              <div
                style={{
                  minWidth: 180,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {listening ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        height: 28,
                      }}
                    >
                      {["b1", "b2", "b3", "b4", "b5", "b1", "b2"].map(
                        (c, i) => (
                          <div
                            key={i}
                            className={`b${(i % 5) + 1}`}
                            style={{
                              width: 3,
                              background: "#ef4444",
                              borderRadius: 2,
                              minHeight: 4,
                            }}
                          />
                        ),
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#ef4444",
                        fontWeight: 600,
                      }}
                    >
                      Recording…
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    {status === "listening" ? "Press mic to speak" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
