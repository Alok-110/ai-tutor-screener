import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


const EMOJIS = [
  { emoji: '😤', label: 'Rough' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Great' },
  { emoji: '🤩', label: 'Loved it' },
]

export default function Done() {
  const navigate = useNavigate()
  const name = localStorage.getItem('candidateName') || 'Candidate'
  const candidateId = localStorage.getItem('candidateId')
  const [selected, setSelected] = useState(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; }
        .done { font-family:'DM Sans',sans-serif; min-height:100vh; background:#eef4ff; color:#0a0a0a; }
        .btn-blue { background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:13px 28px; border-radius:10px; font-weight:700; font-size:14px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; transition:opacity .2s; white-space:nowrap; }
        .btn-blue:hover { opacity:.9; }
        .btn-ghost { background:#fff; color:#374151; padding:13px 28px; border-radius:10px; font-weight:600; font-size:14px; border:1.5px solid #e2e8f0; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; white-space:nowrap; }
        .btn-ghost:hover { border-color:#9ca3af; }
        .emoji-btn { width:60px; height:68px; border-radius:14px; border:2px solid transparent; background:#fff; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; transition:all .2s; font-family:'DM Sans',sans-serif; }
        .emoji-btn:hover { border-color:#bfdbfe; transform:translateY(-2px); }
        .emoji-btn.active { border-color:#2563eb; background:#eff6ff; transform:translateY(-2px); }
        .step-dot { width:10px; height:10px; border-radius:50%; background:#2563eb; flex-shrink:0; margin-top:5px; }
        @keyframes confetti-fall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(80px) rotate(360deg);opacity:0} }
        .conf { position:absolute; width:8px; height:8px; border-radius:2px; animation:confetti-fall 2s ease-in infinite; }
      `}</style>

      <div className="done">

        {/* Navbar */}
        <Navbar label="Interview Complete" />

        <div style={{maxWidth:1000,margin:'0 auto',padding:'48px 40px',display:'flex',flexDirection:'column',gap:28}}>

          {/* ── HERO SECTION ── */}
          <div style={{background:'linear-gradient(135deg,#0f172a,#1e3a8a)',borderRadius:24,padding:'48px 52px',display:'grid',gridTemplateColumns:'1fr auto',gap:40,alignItems:'center',position:'relative',overflow:'hidden'}}>

            {/* Confetti dots */}
            {[
              {l:'10%',c:'#fbbf24',d:'0s'},{l:'20%',c:'#ef4444',d:'0.3s'},
              {l:'40%',c:'#10b981',d:'0.6s'},{l:'60%',c:'#a78bfa',d:'0.2s'},
              {l:'75%',c:'#fbbf24',d:'0.8s'},{l:'88%',c:'#0ea5e9',d:'0.4s'},
            ].map((c,i) => (
              <div key={i} className="conf" style={{left:c.l,top:'-10px',background:c.c,animationDelay:c.d,animationDuration:`${1.8+i*0.3}s`}} />
            ))}

            <div style={{position:'relative',zIndex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.5)',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:12}}>Interview Complete</div>
              <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:42,fontWeight:900,color:'#fff',letterSpacing:'-1px',lineHeight:1.1,marginBottom:16}}>
                Well done, {name.split(' ')[0]}! 🎉
              </h1>
              <p style={{fontSize:15,color:'rgba(255,255,255,0.6)',lineHeight:1.7,maxWidth:480}}>
                Your interview has been recorded and your assessment is ready. The Cuemath team will review your report and reach out within <span style={{color:'#fff',fontWeight:600}}>2–3 business days</span>.
              </p>
            </div>

            {/* Right — report CTA */}
            <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column',alignItems:'center',gap:14,textAlign:'center',minWidth:200,position:'relative',zIndex:1}}>
              <div style={{width:52,height:52,borderRadius:16,background:'rgba(37,99,235,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>📊</div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:'#fff',marginBottom:4}}>Your Report</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>Generated instantly</div>
              </div>
              <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
  <span style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>📧 Recruiter will review & reach out</span>
</div>
            </div>
          </div>

          {/* ── TWO COLUMN ROW ── */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

            {/* What happens next */}
            <div style={{background:'#fff',borderRadius:20,padding:'28px',border:'1px solid rgba(0,0,0,0.06)'}}>
              <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:20}}>What happens next</div>
              <div style={{display:'flex',flexDirection:'column',gap:0}}>
                {[
                  {n:'01', title:'Report reviewed', desc:'Our team reviews your AI assessment report and scores.', done:true},
                  {n:'02', title:'Email from Cuemath', desc:'You\'ll hear from us at your registered email within 2–3 days.', done:false},
                  {n:'03', title:'Live round (if shortlisted)', desc:'Shortlisted candidates are invited for a live interview round.', done:false},
                  {n:'04', title:'Onboarding', desc:'Selected tutors begin Cuemath\'s onboarding program.', done:false},
                ].map((s,i) => (
                  <div key={i} style={{display:'flex',gap:14,paddingBottom:i<3?20:0,marginBottom:i<3?20:0,borderBottom:i<3?'1px dashed #f1f5f9':'none'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>
                      <div style={{width:28,height:28,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,background:s.done?'#2563eb':'#f1f5f9',color:s.done?'#fff':'#9ca3af'}}>
                        {s.done ? '✓' : s.n}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:s.done?'#0a0a0a':'#6b7280',marginBottom:3}}>{s.title}</div>
                      <div style={{fontSize:12,color:'#9ca3af',lineHeight:1.5}}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Stats */}
              <div style={{background:'#fff',borderRadius:20,padding:'24px 28px',border:'1px solid rgba(0,0,0,0.06)'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:16}}>Your session</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {[
                    {icon:'🎙️', label:'Questions', value:'5 of 5'},
                    {icon:'⚡', label:'Report', value:'Ready'},
                    {icon:'🌐', label:'Mode', value:'Voice AI'},
                    {icon:'✅', label:'Status', value:'Complete'},
                  ].map((s,i) => (
                    <div key={i} style={{background:'#f8fafc',borderRadius:12,padding:'12px 14px',display:'flex',alignItems:'center',gap:10}}>
                      <span style={{fontSize:18}}>{s.icon}</span>
                      <div>
                        <div style={{fontSize:11,color:'#9ca3af'}}>{s.label}</div>
                        <div style={{fontSize:13,fontWeight:700,color:'#0a0a0a'}}>{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div style={{background:'#fff',borderRadius:20,padding:'24px 28px',border:'1px solid rgba(0,0,0,0.06)',flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:16}}>From our tutors</div>
                {[
                  {name:'Anjali M.', role:'Senior Tutor · Bangalore', text:'"The AI interview felt surprisingly natural. Got my offer within 3 days!"'},
                  {name:'Rahul K.', role:'Math Tutor · Delhi', text:'"Much smoother than a traditional phone screen. Very fair process."'},
                ].map((t,i) => (
                  <div key={i} style={{marginBottom:i<1?16:0,paddingBottom:i<1?16:0,borderBottom:i<1?'1px solid #f1f5f9':'none'}}>
                    <p style={{fontSize:13,color:'#374151',lineHeight:1.6,marginBottom:8,fontStyle:'italic'}}>{t.text}</p>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{t.name[0]}</div>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:'#0a0a0a'}}>{t.name}</div>
                        <div style={{fontSize:11,color:'#9ca3af'}}>{t.role}</div>
                      </div>
                      <div style={{marginLeft:'auto',display:'flex',gap:2}}>
                        {[1,2,3,4,5].map(s => <span key={s} style={{color:'#fbbf24',fontSize:11}}>★</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── FEEDBACK SECTION ── */}
          <div style={{background:'#fff',borderRadius:20,padding:'32px 36px',border:'1px solid rgba(0,0,0,0.06)'}}>
            {!submitted ? (
              <>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
                  <div>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:800,color:'#0a0a0a',marginBottom:4}}>How was your experience?</div>
                    <div style={{fontSize:13,color:'#9ca3af'}}>Your feedback helps us improve the screening process.</div>
                  </div>
                  <span style={{fontSize:28}}>💬</span>
                </div>

                {/* Emoji rating */}
                <div style={{display:'flex',gap:12,marginBottom:24}}>
                  {EMOJIS.map((e,i) => (
                    <button
                      key={i}
                      className={`emoji-btn${selected===i?' active':''}`}
                      onClick={() => setSelected(i)}
                    >
                      <span style={{fontSize:26}}>{e.emoji}</span>
                      <span style={{fontSize:10,color:selected===i?'#2563eb':'#9ca3af',fontWeight:600}}>{e.label}</span>
                    </button>
                  ))}
                </div>

                {/* Text feedback */}
                <textarea
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Anything else you'd like to share? (optional)"
                  rows={3}
                  style={{width:'100%',padding:'14px 16px',border:'1.5px solid #e2e8f0',borderRadius:12,fontSize:14,fontFamily:'DM Sans,sans-serif',color:'#374151',outline:'none',resize:'none',marginBottom:16,transition:'border-color .2s'}}
                  
                />

                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <button
                    className="btn-blue"
                    onClick={handleSubmit}
                    disabled={selected===null}
                    style={{opacity:selected===null?0.5:1,cursor:selected===null?'not-allowed':'pointer'}}
                  >
                    Submit Feedback
                  </button>
                  <button className="btn-ghost" onClick={() => navigate('/')}>Back to Home</button>
                </div>
              </>
            ) : (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,padding:'20px 0',textAlign:'center'}}>
                <span style={{fontSize:48}}>🙏</span>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:800,color:'#0a0a0a'}}>Thanks for the feedback!</div>
                <p style={{fontSize:14,color:'#6b7280',maxWidth:360}}>You rated your experience <strong>{EMOJIS[selected].emoji} {EMOJIS[selected].label}</strong>. We'll use this to keep improving Cuemath's screening process.</p>
                <button className="btn-ghost" style={{marginTop:8}} onClick={() => navigate('/')}>Back to Home</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}