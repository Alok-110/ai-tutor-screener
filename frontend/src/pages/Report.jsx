import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'

const DIM_LABELS = {
  clarity:    'Clarity',
  warmth:     'Warmth',
  simplicity: 'Simplicity',
  fluency:    'Fluency',
  engagement: 'Engagement',
}

const COLORS = ['#2563eb','#10b981','#f59e0b','#a78bfa','#ef4444']

const recColor = {
  'Strong Yes': { bg:'#f0fdf4', text:'#15803d', border:'#bbf7d0', dot:'#10b981' },
  'Yes':        { bg:'#eff6ff', text:'#1d4ed8', border:'#bfdbfe', dot:'#2563eb' },
  'No':         { bg:'#fef2f2', text:'#dc2626', border:'#fecaca', dot:'#ef4444' },
}

const scoreColor = v => v >= 4 ? '#10b981' : v >= 3 ? '#f59e0b' : '#ef4444'

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)
  const authed = sessionStorage.getItem('admin_authed') === 'true'

  useEffect(() => {
    if (!authed) { navigate('/admin'); return }
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/candidates/${id}`)
      .then(r => { setCandidate(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (!authed) return null

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,sans-serif'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:14}}>
        <div style={{width:40,height:40,borderRadius:'50%',border:'3px solid #e2e8f0',borderTopColor:'#2563eb',animation:'spin 0.8s linear infinite'}} />
        <span style={{fontSize:14,color:'#9ca3af'}}>Loading report…</span>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (!candidate) return (
    <div style={{minHeight:'100vh',background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <span style={{color:'#9ca3af'}}>Candidate not found.</span>
    </div>
  )

  const a = candidate.assessment
  const dims = Object.keys(DIM_LABELS)
  const avg = (dims.reduce((s,k) => s + (a?.[k]||0), 0) / dims.length).toFixed(1)

  const radarData = dims.map(k => ({
    dim: DIM_LABELS[k], value: a?.[k] || 0, fullMark: 5
  }))

  const barData = dims.map((k,i) => ({
    name: DIM_LABELS[k], value: a?.[k] || 0, color: COLORS[i]
  }))

  const rc = recColor[a?.recommendation] || recColor['Yes']

  const CustomBarTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{background:'#0f172a',borderRadius:10,padding:'10px 14px',border:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{fontSize:13,fontWeight:700,color:'#fff'}}>{payload[0].payload.name}</div>
        <div style={{fontSize:13,color:'#94a3b8',marginTop:2}}>{payload[0].value} / 5</div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; }
        .rpt { font-family:'DM Sans',sans-serif; min-height:100vh; background:#f8fafc; color:#0a0a0a; }
        .card { background:#fff; border-radius:20px; border:1px solid rgba(0,0,0,0.06); padding:28px; }
        .label { font-size:11px; font-weight:700; color:#9ca3af; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:16px; }
      `}</style>

      <div className="rpt">

        {/* ── NAVBAR ── */}
        <nav style={{height:58,background:'#fff',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',padding:'0 40px',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button onClick={() => navigate('/admin')} style={{display:'flex',alignItems:'center',gap:6,background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:8,padding:'7px 14px',cursor:'pointer',fontSize:13,color:'#374151',fontFamily:'DM Sans,sans-serif',fontWeight:500}}>
              ← Back to Dashboard
            </button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:28,height:28,borderRadius:7,background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:'#fff',fontSize:12,fontWeight:900,fontFamily:"'Bricolage Grotesque',sans-serif"}}>C</span>
            </div>
            <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:16,color:'#0a0a0a'}}>Cuemath</span>
            <span style={{fontSize:12,color:'#9ca3af'}}>· Assessment Report</span>
          </div>
          <span style={{fontSize:12,color:'#9ca3af'}}>{new Date(candidate.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
        </nav>

        <div style={{maxWidth:1200,margin:'0 auto',padding:'36px 40px',display:'flex',flexDirection:'column',gap:24}}>

          {/* ── HERO HEADER ── */}
          <div style={{background:'linear-gradient(135deg,#0f172a,#1e3a8a)',borderRadius:24,padding:'36px 40px',display:'grid',gridTemplateColumns:'1fr auto',gap:32,alignItems:'center'}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>Assessment Report</div>
              <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:38,fontWeight:900,color:'#fff',letterSpacing:'-0.8px',marginBottom:8}}>{candidate.name}</h1>
              <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
                <span style={{fontSize:14,color:'rgba(255,255,255,0.5)'}}>{candidate.role}</span>
                <span style={{color:'rgba(255,255,255,0.15)'}}>·</span>
                <span style={{fontSize:14,color:'rgba(255,255,255,0.5)'}}>
                  {candidate.transcript?.length || 0} messages exchanged
                </span>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
              {/* Big score circle */}
              <div style={{width:100,height:100,borderRadius:'50%',border:'3px solid rgba(255,255,255,0.1)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.05)'}}>
                <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:30,fontWeight:900,color:'#fff',lineHeight:1}}>{avg}</span>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginTop:2}}>/ 5.0</span>
              </div>
              {/* Recommendation badge */}
              <div style={{background:rc.bg,border:`1px solid ${rc.border}`,borderRadius:999,padding:'8px 20px',display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:7,height:7,borderRadius:'50%',background:rc.dot,display:'inline-block'}} />
                <span style={{fontSize:14,fontWeight:700,color:rc.text}}>{a?.recommendation || 'Pending'}</span>
              </div>
            </div>
          </div>

          {/* ── ROW 1: Radar + Bar ── */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

            {/* Radar */}
            <div className="card">
              <div className="label">Skill Radar</div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} margin={{top:10,right:30,bottom:10,left:30}}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="dim" tick={{fontSize:12,fill:'#6b7280',fontFamily:'DM Sans'}} />
                  <Radar name="Score" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} dot={{fill:'#2563eb',r:4}} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar */}
            <div className="card">
              <div className="label">Score Breakdown</div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData} margin={{top:10,right:10,bottom:10,left:-10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize:11,fill:'#9ca3af',fontFamily:'DM Sans'}} axisLine={false} tickLine={false} />
                  <YAxis domain={[0,5]} ticks={[0,1,2,3,4,5]} tick={{fontSize:11,fill:'#9ca3af'}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomBarTooltip />} cursor={{fill:'rgba(0,0,0,0.02)'}} />
                  <Bar dataKey="value" radius={[8,8,0,0]} maxBarSize={48}>
                    {barData.map((d,i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── ROW 2: Score cards + Summary ── */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

            {/* Score cards */}
            <div className="card">
              <div className="label">Dimension Scores</div>
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {dims.map((k,i) => (
                  <div key={k}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:8,height:8,borderRadius:'50%',background:COLORS[i]}} />
                        <span style={{fontSize:14,fontWeight:500,color:'#374151'}}>{DIM_LABELS[k]}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:13,fontWeight:700,color:scoreColor(a?.[k]||0)}}>{a?.[k]||0}/5</span>
                        <div style={{display:'flex',gap:2}}>
                          {[1,2,3,4,5].map(n => (
                            <div key={n} style={{width:12,height:12,borderRadius:3,background:n<=(a?.[k]||0)?COLORS[i]:'#f1f5f9'}} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{height:6,background:'#f1f5f9',borderRadius:99}}>
                      <div style={{width:`${((a?.[k]||0)/5)*100}%`,height:'100%',background:COLORS[i],borderRadius:99,transition:'width .6s ease'}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary + Quotes */}
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div className="card" style={{flex:1}}>
                <div className="label">AI Summary</div>
                <p style={{fontSize:14,color:'#374151',lineHeight:1.75}}>{a?.summary || 'No summary available.'}</p>
              </div>

              {a?.quotes && (
                <div className="card">
                  <div className="label">Evidence Quotes</div>
                  <div style={{display:'flex',flexDirection:'column',gap:12}}>
                    {Object.entries(a.quotes).map(([key,quote],i) => (
                      <div key={key} style={{borderLeft:`3px solid ${COLORS[i]}`,paddingLeft:14}}>
                        <div style={{fontSize:10,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>{DIM_LABELS[key]||key}</div>
                        <p style={{fontSize:13,color:'#374151',fontStyle:'italic',lineHeight:1.55}}>"{quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── FULL TRANSCRIPT ── */}
          <div className="card">
            <div className="label">Full Interview Transcript</div>
            <div style={{display:'flex',flexDirection:'column',gap:14,maxHeight:420,overflowY:'auto',paddingRight:8}}>
              {candidate.transcript?.map((t,i) => (
                <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                  <div style={{
                    width:32,height:32,borderRadius:'50%',flexShrink:0,
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,
                    background:t.speaker==='ai'?'linear-gradient(135deg,#2563eb,#0ea5e9)':'linear-gradient(135deg,#10b981,#059669)',
                    color:'#fff',
                  }}>
                    {t.speaker==='ai'?'🤖':candidate.name[0]}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:700,color:t.speaker==='ai'?'#2563eb':'#10b981',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>
                      {t.speaker==='ai'?'Aria (AI)':candidate.name}
                    </div>
                    <div style={{fontSize:14,color:'#374151',lineHeight:1.65,background:t.speaker==='ai'?'#f8fafc':'#f0fdf4',padding:'12px 16px',borderRadius:t.speaker==='ai'?'4px 14px 14px 14px':'14px 4px 14px 14px'}}>
                      {t.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}