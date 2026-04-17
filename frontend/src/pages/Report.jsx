import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

const DIMENSION_META = {
  clarity: {
    label: 'Clarity',
    icon: '◈',
    desc: 'Clear, structured communication',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.2)',
  },
  warmth: {
    label: 'Warmth',
    icon: '❋',
    desc: 'Empathy & student connection',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.08)',
    border: 'rgba(244,114,182,0.2)',
  },
  simplicity: {
    label: 'Simplicity',
    icon: '◉',
    desc: 'Ability to simplify concepts',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
  },
  fluency: {
    label: 'Fluency',
    icon: '◇',
    desc: 'English language fluency',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
  },
  engagement: {
    label: 'Engagement',
    icon: '✦',
    desc: 'Energy & student motivation',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.2)',
  },
}

const RECOMMENDATION_CONFIG = {
  'Strong Yes': {
    label: 'Strong Yes',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    tagline: 'Highly Recommended',
    icon: '★',
  },
  Yes: {
    label: 'Yes',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.3)',
    tagline: 'Recommended',
    icon: '✓',
  },
  No: {
    label: 'No',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
    tagline: 'Not Recommended',
    icon: '✕',
  },
}

function ScoreArc({ score, color }) {
  const max = 5
  const radius = 36
  const stroke = 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / max) * circumference

  return (
    <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx="44" cy="44" r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={stroke}
      />
      <circle
        cx="44" cy="44" r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  )
}

function DimensionCard({ dim, score, quote, index }) {
  const meta = DIMENSION_META[dim]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 100)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div style={{
      background: meta.bg,
      border: `1px solid ${meta.border}`,
      borderRadius: '16px',
      padding: '20px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ color: meta.color, fontSize: '16px' }}>{meta.icon}</span>
            <span style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: '600', letterSpacing: '0.02em' }}>
              {meta.label}
            </span>
          </div>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '11px', margin: 0, letterSpacing: '0.03em' }}>
            {meta.desc}
          </p>
        </div>
        <div style={{ position: 'relative', width: '88px', height: '88px', flexShrink: 0 }}>
          <ScoreArc score={score} color={meta.color} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: meta.color, fontSize: '22px', fontWeight: '700', lineHeight: 1 }}>{score}</span>
            <span style={{ color: 'rgba(148,163,184,0.6)', fontSize: '10px', letterSpacing: '0.05em' }}>/5</span>
          </div>
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          height: '3px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${(score / 5) * 100}%`,
            background: meta.color,
            borderRadius: '2px',
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} style={{
              fontSize: '10px',
              color: n <= score ? meta.color : 'rgba(100,116,139,0.4)',
            }}>●</span>
          ))}
        </div>
      </div>

      {quote && (
        <blockquote style={{
          margin: 0,
          padding: '10px 12px',
          background: 'rgba(0,0,0,0.2)',
          borderLeft: `2px solid ${meta.color}`,
          borderRadius: '0 8px 8px 0',
        }}>
          <p style={{
            color: 'rgba(203,213,225,0.75)',
            fontSize: '12px',
            lineHeight: '1.6',
            margin: 0,
            fontStyle: 'italic',
          }}>
            "{quote}"
          </p>
        </blockquote>
      )}
    </div>
  )
}

function OverallScore({ assessment }) {
  const dims = ['clarity', 'warmth', 'simplicity', 'fluency', 'engagement']
  const avg = (dims.reduce((s, d) => s + (assessment[d] || 0), 0) / dims.length).toFixed(1)
  return parseFloat(avg)
}

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/api/admin/candidates/${id}`)
        setCandidate(res.data)
        setTimeout(() => setHeaderVisible(true), 50)
      } catch (e) {
        setError('Could not load report.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0f1e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
      }}>
        <div style={{
          width: '40px', height: '40px',
          border: '2px solid rgba(96,165,250,0.2)',
          borderTopColor: '#60a5fa',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: '13px' }}>Loading assessment…</p>
      </div>
    )
  }

  if (error || !candidate) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0a0f1e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontSize: '15px' }}>{error || 'Report not found'}</p>
          <button onClick={() => navigate('/admin')} style={{
            marginTop: '16px', padding: '10px 20px',
            background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.3)',
            borderRadius: '10px', color: '#60a5fa', cursor: 'pointer', fontSize: '13px',
          }}>
            ← Back to Admin
          </button>
        </div>
      </div>
    )
  }

  const { assessment, name, role, createdAt } = candidate
  const recConfig = RECOMMENDATION_CONFIG[assessment?.recommendation] || RECOMMENDATION_CONFIG['Yes']
  const overall = OverallScore({ assessment })
  const dims = ['clarity', 'warmth', 'simplicity', 'fluency', 'engagement']

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080d1a',
      color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Ambient glow top */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: `radial-gradient(ellipse at center, ${recConfig.color}12 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 10,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(8,13,26,0.85)',
        backdropFilter: 'blur(12px)',
        padding: '0 24px',
        height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              background: 'transparent', border: 'none', color: 'rgba(148,163,184,0.7)',
              cursor: 'pointer', fontSize: '13px', padding: '6px 0', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ← Admin
          </button>
          <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '12px' }}>|</span>
          <span style={{ color: 'rgba(148,163,184,0.5)', fontSize: '13px' }}>Assessment Report</span>
        </div>
        <span style={{
          fontSize: '11px', color: 'rgba(100,116,139,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Cuemath
        </span>
      </nav>

      <div style={{
        maxWidth: '780px', margin: '0 auto', padding: '32px 20px 60px',
        position: 'relative', zIndex: 1,
      }}>

        {/* Header Card */}
        <div style={{
          background: 'rgba(15,22,41,0.8)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '28px 28px 24px',
          marginBottom: '20px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>

            {/* Candidate info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(167,139,250,0.2))',
                border: '1px solid rgba(96,165,250,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', fontWeight: '700', color: '#60a5fa', flexShrink: 0,
              }}>
                {name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                  {name}
                </h1>
                <p style={{ fontSize: '13px', color: 'rgba(148,163,184,0.7)', margin: '0 0 6px' }}>{role}</p>
                <p style={{ fontSize: '11px', color: 'rgba(100,116,139,0.5)', margin: 0 }}>
                  {new Date(createdAt).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Verdict badge */}
            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px',
                background: recConfig.bg,
                border: `1px solid ${recConfig.border}`,
                borderRadius: '12px',
                marginBottom: '8px',
              }}>
                <span style={{ color: recConfig.color, fontSize: '16px' }}>{recConfig.icon}</span>
                <div>
                  <div style={{ color: recConfig.color, fontSize: '15px', fontWeight: '700', lineHeight: 1 }}>
                    {recConfig.label}
                  </div>
                  <div style={{ color: `${recConfig.color}99`, fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
                    {recConfig.tagline}
                  </div>
                </div>
              </div>

              {/* Overall score pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(100,116,139,0.5)' }}>Overall score</span>
                <span style={{
                  fontSize: '13px', fontWeight: '700',
                  color: overall >= 4 ? '#10b981' : overall >= 3 ? '#fbbf24' : '#f87171',
                }}>
                  {overall} / 5
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          {assessment?.summary && (
            <div style={{
              marginTop: '20px',
              padding: '14px 16px',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '10px',
              borderLeft: '3px solid rgba(96,165,250,0.3)',
            }}>
              <p style={{
                fontSize: '13px', lineHeight: '1.7',
                color: 'rgba(203,213,225,0.8)',
                margin: 0,
              }}>
                {assessment.summary}
              </p>
            </div>
          )}
        </div>

        {/* Overall score bar */}
        <div style={{
          background: 'rgba(15,22,41,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '20px',
          opacity: headerVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'rgba(100,116,139,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Score breakdown
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(100,116,139,0.4)' }}>out of 5</span>
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '48px' }}>
            {dims.map(dim => {
              const meta = DIMENSION_META[dim]
              const score = assessment?.[dim] || 0
              return (
                <div key={dim} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '100%',
                    height: `${(score / 5) * 36}px`,
                    background: meta.color,
                    borderRadius: '3px 3px 0 0',
                    opacity: 0.75,
                    transition: 'height 1s cubic-bezier(0.4,0,0.2,1)',
                    minHeight: '4px',
                  }} />
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
            {dims.map(dim => (
              <div key={dim} style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: 'rgba(100,116,139,0.5)', letterSpacing: '0.03em' }}>
                  {DIMENSION_META[dim].label.slice(0, 3).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section heading */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: '16px',
          opacity: headerVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}>
          <span style={{ fontSize: '11px', color: 'rgba(100,116,139,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Dimension scores
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.04)' }} />
        </div>

        {/* Dimension grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '14px',
          marginBottom: '24px',
        }}>
          {dims.map((dim, i) => (
            <DimensionCard
              key={dim}
              dim={dim}
              score={assessment?.[dim] || 0}
              quote={assessment?.quotes?.[dim]}
              index={i}
            />
          ))}
        </div>

        {/* Bottom action */}
        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'flex-end',
          paddingTop: '8px',
          opacity: headerVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.6s',
        }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: 'rgba(148,163,184,0.7)',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            ← All Candidates
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding: '10px 20px',
              background: 'rgba(96,165,250,0.1)',
              border: '1px solid rgba(96,165,250,0.25)',
              borderRadius: '10px',
              color: '#60a5fa',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}
