import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const STATUS_OPTIONS = ["Pending Review", "Shortlisted", "Rejected", "Maybe"];

const statusStyle = {
  Shortlisted: {
    bg: "#f0fdf4",
    text: "#15803d",
    border: "#bbf7d0",
    dot: "#10b981",
  },
  Rejected: {
    bg: "#fef2f2",
    text: "#dc2626",
    border: "#fecaca",
    dot: "#ef4444",
  },
  Maybe: { bg: "#fffbeb", text: "#b45309", border: "#fde68a", dot: "#f59e0b" },
  "Pending Review": {
    bg: "#f8fafc",
    text: "#6b7280",
    border: "#e2e8f0",
    dot: "#9ca3af",
  },
};

const aiRecColor = {
  "Strong Yes": { text: "#15803d", bg: "#f0fdf4" },
  Yes: { text: "#1d4ed8", bg: "#eff6ff" },
  No: { text: "#dc2626", bg: "#fef2f2" },
};

export default function Admin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(
    sessionStorage.getItem("admin_authed") === "true",
  );
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const handleLogin = () => {
    if (pw === "cuemath2024") {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true);
      setPwError("");
    } else {
      setPwError("Incorrect password.");
    }
  };

  useEffect(() => {
    if (!authed) return;
    fetchCandidates();
  }, [authed]);

  const fetchCandidates = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/candidates`,
    );
    setCandidates(res.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/candidates/${id}`,
    );
    setCandidates((prev) => prev.filter((c) => c._id !== id));
    setDeleteId(null);
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/candidates/${id}/status`,
        { adminStatus: status },
      );
      console.log("Frontend response:", res.data);
      setCandidates((prev) =>
        prev.map((c) => (c._id === id ? { ...c, adminStatus: status } : c)),
      );
    } catch (err) {
      console.error("Frontend error:", err);
    }
    setUpdatingId(null);
  };

  const avgScore = (a) => {
    if (!a) return null;
    return (
      (a.clarity + a.warmth + a.simplicity + a.fluency + a.engagement) /
      5
    ).toFixed(1);
  };

  const filtered = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" || (c.adminStatus || "Pending Review") === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: candidates.length,
    shortlisted: candidates.filter((c) => c.adminStatus === "Shortlisted")
      .length,
    pending: candidates.filter(
      (c) => !c.adminStatus || c.adminStatus === "Pending Review",
    ).length,
    avgScore: candidates.length
      ? (
          candidates.reduce(
            (s, c) => s + (parseFloat(avgScore(c.assessment)) || 0),
            0,
          ) / candidates.filter((c) => c.assessment).length
        ).toFixed(1)
      : "—",
  };

  // ── PASSWORD GATE ──
  if (!authed)
    return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; }
        body { font-family:'DM Sans',sans-serif; background:#eef4ff; display:flex; align-items:center; justify-content:center; }
      `}</style>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#eef4ff",
            fontFamily: "DM Sans,sans-serif",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "48px 44px",
              width: 400,
              boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <span style={{ fontSize: 22 }}>🔐</span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#0a0a0a",
                  marginBottom: 6,
                }}
              >
                Recruiter Access
              </h2>
              <p style={{ fontSize: 14, color: "#9ca3af" }}>
                Enter your admin password to continue
              </p>
            </div>
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setPwError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Password"
              style={{
                width: "100%",
                padding: "13px 16px",
                border: `1.5px solid ${pwError ? "#fca5a5" : "#e2e8f0"}`,
                borderRadius: 12,
                fontSize: 14,
                outline: "none",
                marginBottom: 10,
                fontFamily: "DM Sans,sans-serif",
                background: pwError ? "#fef2f2" : "#fff",
                transition: "all .2s",
              }}
            />
            {pwError && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  padding: "9px 13px",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 14 }}>⚠️</span>
                <span
                  style={{ fontSize: 13, color: "#dc2626", fontWeight: 500 }}
                >
                  {pwError}
                </span>
              </div>
            )}
            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
                color: "#fff",
                padding: "13px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                fontFamily: "DM Sans,sans-serif",
                marginBottom: 14,
              }}
            >
              Enter Dashboard →
            </button>
            <div style={{ textAlign: "center" }}>
              <span
                onClick={() => navigate("/")}
                style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}
              >
                ← Back to home
              </span>
            </div>
          </div>
        </div>
      </>
    );

  // ── MAIN DASHBOARD ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; }
        .adm { font-family:'DM Sans',sans-serif; min-height:100vh; background:#f8fafc; }
        .card { background:#fff; border-radius:16px; border:1px solid rgba(0,0,0,0.06); }
        .filter-btn { padding:7px 16px; border-radius:999px; font-size:13px; font-weight:600; border:1.5px solid #e2e8f0; background:#fff; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .15s; color:#6b7280; }
        .filter-btn.active { background:#0f172a; color:#fff; border-color:#0f172a; }
        .filter-btn:hover:not(.active) { border-color:#9ca3af; color:#374151; }
        .row-hover:hover { background:#f8fafc !important; }
        .del-btn { width:32px; height:32px; border-radius:8px; border:1px solid #fecaca; background:#fef2f2; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s; flex-shrink:0; }
        .del-btn:hover { background:#fee2e2; border-color:#fca5a5; }
        .status-select { font-size:12px; font-weight:700; border-radius:8px; padding:7px 28px 7px 12px; border:1.5px solid; cursor:pointer; font-family:'DM Sans',sans-serif; outline:none; appearance:none; transition:all .15s; box-shadow:0 1px 3px rgba(0,0,0,0.08); background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 8px center; }
        .status-select:hover { box-shadow:0 2px 8px rgba(0,0,0,0.12); transform:translateY(-1px); }
        .status-select:active { transform:translateY(0); }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:4px; }
      `}</style>

      <div className="adm">
        {/* ── NAVBAR ── */}
        <nav
          style={{
            height: 60,
            background: "#fff",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            padding: "0 36px",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              }}
            >
              Cuemath
            </span>
            <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 2 }}>
              · Recruiter Dashboard
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "7px 14px",
                cursor: "pointer",
                fontSize: 13,
                color: "#374151",
                fontFamily: "DM Sans,sans-serif",
                fontWeight: 500,
              }}
            >
              ← Candidate View
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_authed");
                setAuthed(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                padding: "7px 14px",
                cursor: "pointer",
                fontSize: 13,
                color: "#dc2626",
                fontFamily: "DM Sans,sans-serif",
                fontWeight: 600,
              }}
            >
              Sign out
            </button>
          </div>
        </nav>

        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "32px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* ── STAT CARDS ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 16,
            }}
          >
            {[
              {
                label: "Total Interviews",
                value: stats.total,
                bg: "#eff6ff",
                hover: "#dbeafe",
                text: "#1d4ed8",
              },
              {
                label: "Shortlisted",
                value: stats.shortlisted,
                bg: "#f0fdf4",
                hover: "#dcfce7",
                text: "#15803d",
              },
              {
                label: "Pending Review",
                value: stats.pending,
                bg: "#fffbeb",
                hover: "#fef3c7",
                text: "#b45309",
              },
              {
                label: "Avg Score",
                value: stats.avgScore,
                bg: "#f5f3ff",
                hover: "#ede9fe",
                text: "#7c3aed",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: s.bg,
                  borderRadius: 16,
                  padding: "24px 28px",
                  border: "1px solid rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  cursor: "default",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = s.hover)
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = s.bg)}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: s.text,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontSize: 36,
                    fontWeight: 900,
                    color: s.text,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── TABLE SECTION ── */}
          <div className="card" style={{ overflow: "hidden" }}>
            {/* Table header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#0a0a0a",
                  }}
                >
                  All Candidates
                </h2>
                <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
                  {filtered.length} of {candidates.length} interviews
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                {/* Search */}
                <div style={{ position: "relative" }}>
                  <img
                    src="https://api.iconify.design/lucide:search.svg?color=%239ca3af&width=14"
                    width={14}
                    height={14}
                    alt=""
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search candidates…"
                    style={{
                      padding: "9px 14px 9px 34px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 10,
                      fontSize: 13,
                      fontFamily: "DM Sans,sans-serif",
                      outline: "none",
                      color: "#374151",
                      width: 220,
                    }}
                  />
                </div>
                {/* Filter pills */}
                <div style={{ display: "flex", gap: 6 }}>
                  {["All", ...STATUS_OPTIONS].map((f) => (
                    <button
                      key={f}
                      className={`filter-btn${filter === f ? " active" : ""}`}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div
                style={{
                  padding: "60px",
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: 14,
                }}
              >
                Loading candidates…
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  No candidates found
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>
                  Try adjusting your search or filter
                </div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {[
                      "Candidate",
                      "Role",
                      "AI Suggestion",
                      "Avg Score",
                      "Admin Decision",
                      "Date",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "11px 20px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#9ca3af",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          borderBottom: "1px solid #f1f5f9",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => {
                    const score = avgScore(c.assessment);
                    const adminStatus = c.adminStatus || "Pending Review";
                    const ss = statusStyle[adminStatus];
                    const aiRec = c.assessment?.recommendation;
                    const aiC = aiRec ? aiRecColor[aiRec] : null;

                    return (
                      <tr
                        key={c._id}
                        className="row-hover"
                        style={{
                          borderBottom:
                            i < filtered.length - 1
                              ? "1px solid #f8fafc"
                              : "none",
                          transition: "background .15s",
                        }}
                      >
                        {/* Candidate */}
                        <td style={{ padding: "16px 20px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg,#2563eb,#0ea5e9)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {c.name[0].toUpperCase()}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#0a0a0a",
                                }}
                              >
                                {c.name}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontSize: 13, color: "#6b7280" }}>
                            {c.role}
                          </span>
                        </td>

                        {/* AI Suggestion — clearly labeled as AI, not final */}
                        <td style={{ padding: "16px 20px" }}>
                          {aiRec && aiC ? (
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                background: aiC.bg,
                                borderRadius: 6,
                                padding: "4px 10px",
                              }}
                            >
                              <span style={{ fontSize: 11 }}>🤖</span>
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: aiC.text,
                                }}
                              >
                                {aiRec}
                              </span>
                            </div>
                          ) : (
                            <span style={{ fontSize: 12, color: "#d1d5db" }}>
                              —
                            </span>
                          )}
                        </td>

                        {/* Score */}
                        <td style={{ padding: "16px 20px" }}>
                          {score ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "'Bricolage Grotesque',sans-serif",
                                  fontSize: 18,
                                  fontWeight: 800,
                                  color: "#0a0a0a",
                                }}
                              >
                                {score}
                              </span>
                              <span style={{ fontSize: 12, color: "#9ca3af" }}>
                                /5
                              </span>
                            </div>
                          ) : (
                            <span style={{ fontSize: 12, color: "#d1d5db" }}>
                              —
                            </span>
                          )}
                        </td>

                        {/* Admin Decision — dropdown */}
                        <td style={{ padding: "16px 20px" }}>
                          <select
                            className="status-select"
                            value={adminStatus}
                            disabled={updatingId === c._id}
                            onChange={(e) =>
                              handleStatusUpdate(c._id, e.target.value)
                            }
                            style={{
                              background: ss.bg,
                              color: ss.text,
                              borderColor: ss.border,
                              opacity: updatingId === c._id ? 0.5 : 1,
                            }}
                          >
                            {STATUS_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Date */}
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontSize: 12, color: "#9ca3af" }}>
                            {new Date(c.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "16px 20px" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() => navigate(`/report/${c._id}`)}
                              style={{
                                padding: "7px 14px",
                                background: "#eff6ff",
                                border: "1px solid #bfdbfe",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#2563eb",
                                fontFamily: "DM Sans,sans-serif",
                                whiteSpace: "nowrap",
                              }}
                            >
                              View Report
                            </button>
                            <button
                              className="del-btn"
                              onClick={() => setDeleteId(c._id)}
                              title="Delete"
                            >
                              <img
                                src="https://api.iconify.design/lucide:trash-2.svg?color=%23ef4444&width=14"
                                width={14}
                                height={14}
                                alt="delete"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ── DELETE CONFIRM MODAL ── */}
        {deleteId && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "36px 40px",
                width: 380,
                boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "#fef2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: 22,
                }}
              >
                🗑️
              </div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0a0a0a",
                  marginBottom: 8,
                }}
              >
                Delete Interview?
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                This will permanently delete the candidate's interview,
                transcript, and assessment. This cannot be undone.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setDeleteId(null)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#374151",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    borderRadius: 10,
                    background: "#ef4444",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
