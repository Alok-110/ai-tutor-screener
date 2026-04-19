import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  // Clear any stale candidate data when landing page loads
  localStorage.removeItem('candidateName')
  localStorage.removeItem('candidateRole')
  localStorage.removeItem('candidateEmail')
  localStorage.removeItem('candidateId')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; overflow:hidden; }
        .land { font-family:'DM Sans',sans-serif; height:100vh; display:grid; grid-template-rows:auto 1fr; background:#fff; overflow:hidden; }

        .nav { height:64px; display:flex; align-items:center; justify-content:space-between; padding:0 52px; border-bottom:1px solid #f1f5f9; background:#fff; position:relative; z-index:20; }
        .nav-logo { display:flex; align-items:center; gap:9px; }
        .nav-logo-mark { width:32px; height:32px; border-radius:8px; background:#0a0a0a; display:flex; align-items:center; justify-content:center; }
        .nav-logo-mark span { color:#fff; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:15px; }
        .nav-logo-text { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:18px; letter-spacing:-0.4px; color:#0a0a0a; }
        .nav-links { display:flex; gap:36px; }
        .nav-link { font-size:14px; font-weight:500; color:#6b7280; cursor:pointer; background:none; border:none; font-family:inherit; padding:0; transition:color .15s; }
        .nav-link:hover { color:#0a0a0a; }
        .nav-cta { font-size:14px; font-weight:600; color:#fff; padding:10px 22px; border-radius:999px; background:#0a0a0a; border:none; cursor:pointer; font-family:inherit; transition:opacity .2s; }
        .nav-cta:hover { opacity:.8; }

        .hero { display:grid; grid-template-columns:1fr 1fr; overflow:hidden; }

        /* LEFT — abstract gradient panel */
        .hero-left {
          position:relative; overflow:hidden;
          background: linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #1e40af 70%, #0369a1 100%);
          display:flex; align-items:center; justify-content:center;
        }
        .orb1 { position:absolute; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(99,102,241,0.4) 0%,transparent 70%); top:-80px; left:-80px; }
        .orb2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle,rgba(14,165,233,0.35) 0%,transparent 70%); bottom:-60px; right:-60px; }
        .orb3 { position:absolute; width:250px; height:250px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.25) 0%,transparent 70%); top:40%; left:30%; }
        .grid-lines {
          position:absolute; inset:0; z-index:1;
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .hero-left-content { position:relative; z-index:2; padding:52px; display:flex; flex-direction:column; gap:28px; }

        /* floating UI mockup cards */
        .mock-card { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:16px; backdrop-filter:blur(12px); padding:18px 20px; }

        /* RIGHT — text */
        .hero-right { display:flex; flex-direction:column; justify-content:center; padding:0 72px 0 64px; gap:28px; overflow-y:auto; }

        .badge { display:inline-flex; align-items:center; gap:8px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:999px; padding:6px 16px; width:fit-content; }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:#0ea5e9; }
        .badge-text { font-size:12px; color:#0369a1; font-weight:600; }

        .h1 { font-family:'Bricolage Grotesque',sans-serif; font-weight:900; font-size:56px; line-height:1.06; letter-spacing:-2px; color:#0a0a0a; margin:0; }
        .accent-blue { background:linear-gradient(135deg,#2563eb,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .accent-red { color:#e02020; -webkit-text-fill-color:#e02020; }

        .lede { font-size:16px; line-height:1.75; color:#6b7280; margin:0; max-width:420px; }

        .features { display:flex; flex-direction:column; gap:11px; }
        .feature { display:flex; align-items:center; gap:11px; font-size:14px; color:#374151; }
        .feature-icon { width:28px; height:28px; border-radius:7px; background:#eff6ff; border:1px solid #dbeafe; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:14px 28px; border-radius:999px; font-weight:700; font-size:15px; border:none; cursor:pointer; font-family:inherit; box-shadow:0 8px 24px -6px rgba(37,99,235,0.45); transition:transform .2s,box-shadow .2s; }
        .btn-primary:hover { transform:translateY(-1px); box-shadow:0 12px 28px -6px rgba(37,99,235,0.55); }

        .trust { display:flex; gap:18px; flex-wrap:wrap; }
        .trust-item { font-size:12.5px; color:#9ca3af; display:flex; align-items:center; gap:5px; }

        .stats { display:flex; padding-top:24px; border-top:1px solid #f1f5f9; }
        .stat { flex:1; }
        .stat + .stat { border-left:1px solid #f1f5f9; padding-left:28px; }
        .stat-num { font-family:'Bricolage Grotesque',sans-serif; font-size:30px; font-weight:900; color:#0a0a0a; letter-spacing:-0.8px; line-height:1; }
        .stat-unit { font-size:13px; color:#2563eb; margin-left:3px; font-weight:700; }
        .stat-label { font-size:12px; color:#9ca3af; margin-top:5px; }

        /* tiny admin link bottom of page */
        .admin-hint { position:fixed; bottom:16px; right:20px; font-size:11px; color:rgba(0,0,0,0.18); cursor:pointer; text-decoration:underline; text-decoration-color:rgba(0,0,0,0.1); z-index:50; }
        .admin-hint:hover { color:rgba(0,0,0,0.4); }

        @keyframes wave { 0%,100%{height:4px} 50%{height:14px} }
        .wbar { width:3px; background:rgba(255,255,255,0.5); border-radius:2px; min-height:4px; }
        .w1{animation:wave 1s .0s infinite ease-in-out}
        .w2{animation:wave 1s .1s infinite ease-in-out}
        .w3{animation:wave 1s .2s infinite ease-in-out}
        .w4{animation:wave 1s .15s infinite ease-in-out}
        .w5{animation:wave 1s .05s infinite ease-in-out}
        @keyframes blink2{0%,100%{opacity:1}50%{opacity:0.3}}
        .blink2{animation:blink2 1.2s infinite}
      `}</style>

      <div className="land">

        {/* ── NAVBAR ── */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-mark"><span>C</span></div>
            <span className="nav-logo-text">Cuemath</span>
          </div>
          <div className="nav-links">
</div>
          <button className="nav-cta" onClick={() => navigate('/setup')}>Get started</button>
        </nav>

        {/* ── HERO ── */}
        <div className="hero">

          {/* LEFT — abstract visual */}
          <div className="hero-left">
            <div className="orb1" />
            <div className="orb2" />
            <div className="orb3" />
            <div className="grid-lines" />

            <div className="hero-left-content">

              {/* Interview mockup card */}
              <div className="mock-card">
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#2563eb,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>🤖</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'#fff'}}>Aria · AI Interviewer</div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',display:'flex',alignItems:'center',gap:5}}>
                      <span className="blink2" style={{width:5,height:5,borderRadius:'50%',background:'#10b981',display:'inline-block'}} />
                      Live · Q 3 of 5
                    </div>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:11,color:'rgba(255,255,255,0.35)',fontFamily:'monospace'}}>04:22</div>
                </div>
                <div style={{background:'rgba(255,255,255,0.06)',borderRadius:'10px 10px 10px 3px',padding:'10px 13px',marginBottom:10,fontSize:12.5,color:'rgba(255,255,255,0.75)',lineHeight:1.55}}>
                  How would you handle a student who's been stuck for 10 minutes?
                </div>
                <div style={{background:'rgba(99,102,241,0.3)',borderRadius:'10px 10px 3px 10px',padding:'10px 13px',fontSize:12.5,color:'#fff',lineHeight:1.55,marginLeft:20}}>
                  I'd first acknowledge how they're feeling...
                </div>
                <div style={{display:'flex',gap:3,alignItems:'center',marginTop:14,height:20}}>
                  {['w1','w2','w3','w4','w5','w1','w2','w3'].map((c,i)=>(
                    <div key={i} className={`wbar ${c}`} />
                  ))}
                  <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:8}}>Recording…</span>
                </div>
              </div>

              {/* Score card */}
              <div className="mock-card" style={{padding:'16px 20px'}}>
                <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.35)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>Live Assessment</div>
                {[{l:'Clarity',v:4,c:'#60a5fa'},{l:'Warmth',v:5,c:'#34d399'},{l:'Fluency',v:4,c:'#fbbf24'}].map(d=>(
                  <div key={d.l} style={{marginBottom:9}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                      <span style={{fontSize:11,color:'rgba(255,255,255,0.5)'}}>{d.l}</span>
                      <span style={{fontSize:11,fontWeight:700,color:'#fff'}}>{d.v}/5</span>
                    </div>
                    <div style={{height:3,background:'rgba(255,255,255,0.08)',borderRadius:99}}>
                      <div style={{width:`${d.v/5*100}%`,height:'100%',background:d.c,borderRadius:99}} />
                    </div>
                  </div>
                ))}
                <div style={{marginTop:12,background:'rgba(16,185,129,0.12)',border:'1px solid rgba(16,185,129,0.25)',borderRadius:8,padding:'7px 12px',textAlign:'center'}}>
                  <span style={{fontSize:12,fontWeight:700,color:'#10b981'}}>✓ Strong Yes</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — text */}
          <div className="hero-right">

            <div className="badge">
              <span className="badge-dot" />
              <span className="badge-text">AI Tutor Screener · Free · No Signup</span>
            </div>

            <h1 className="h1">
              <span className="accent-blue">AI screening</span><br/>
              for top <span className="accent-red">math</span><br/>
              tutors.
            </h1>

            <p className="lede">
              Cuemath's AI voice interviewer conducts natural 8-minute screening calls and delivers a structured soft-skill assessment — the moment the call ends.
            </p>

            <div className="features">
              {[
                {icon:'https://api.iconify.design/lucide:mic.svg?color=%232563eb&width=14', text:'Natural voice conversation — no typing required'},
                {icon:'https://api.iconify.design/lucide:git-branch.svg?color=%230ea5e9&width=14', text:'AI follows up on vague answers in real time'},
                {icon:'https://api.iconify.design/lucide:bar-chart-2.svg?color=%232563eb&width=14', text:'5-dimension rubric with transcript evidence'},
              ].map((f,i)=>(
                <div className="feature" key={i}>
                  <div className="feature-icon">
                    <img src={f.icon} alt="" width={14} height={14} />
                  </div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            <div>
              <button className="btn-primary" onClick={() => navigate('/setup')}>
                Start for free
                <img src="https://api.iconify.design/lucide:arrow-right.svg?color=white&width=16" width={16} height={16} alt="" />
              </button>
            </div>

            <div className="trust">
              {['No signup required','Works on Chrome','Completely free'].map((t,i)=>(
                <span key={i} className="trust-item">
                  <span style={{color:'#d1d5db'}}>◦</span>{t}
                </span>
              ))}
            </div>

            <div className="stats">
              {[{n:'~8',unit:'min',l:'interview'},{n:'5',unit:'skills',l:'assessed'},{n:'Instant',unit:'',l:'reports'}].map((s,i)=>(
                <div key={i} className="stat" style={{paddingLeft:i>0?28:0}}>
                  <div className="stat-num">
                    {s.n}{s.unit&&<span className="stat-unit">{s.unit}</span>}
                  </div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Hidden admin link — only visible if you know where to look */}
      <span className="admin-hint" onClick={() => navigate('/admin')}>admin</span>
    </>
  )
}