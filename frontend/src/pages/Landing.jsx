import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
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
        .land { font-family:'DM Sans',sans-serif; height:100vh; display:grid; grid-template-rows:64px 1fr; background:#fff; overflow:hidden; }
        .nav { display:flex; align-items:center; justify-content:space-between; padding:0 52px; border-bottom:1px solid #f1f5f9; background:#fff; z-index:20; }
        .nav-logo { display:flex; align-items:center; gap:9px; }
        .nav-logo-mark { width:32px; height:32px; border-radius:8px; background:#0a0a0a; display:flex; align-items:center; justify-content:center; }
        .nav-logo-mark span { color:#fff; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:15px; }
        .nav-logo-text { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:18px; letter-spacing:-0.4px; color:#0a0a0a; }
        .nav-cta { font-size:14px; font-weight:600; color:#fff; padding:10px 22px; border-radius:999px; background:#0a0a0a; border:none; cursor:pointer; font-family:inherit; transition:opacity .2s; }
        .nav-cta:hover { opacity:.8; }
        .hero { display:grid; grid-template-columns:1fr 1fr; overflow:hidden; }
        .hero-left {
          position:relative; overflow:hidden;
          background:linear-gradient(160deg,#0f172a 0%,#1e3a8a 50%,#0369a1 100%);
          display:flex; flex-direction:column; justify-content:center;
          padding:52px 52px;
        }
        .grid-lines { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px); background-size:36px 36px; }
        .orb1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(99,102,241,0.3) 0%,transparent 65%); top:-150px; right:-100px; pointer-events:none; }
        .orb2 { position:absolute; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(14,165,233,0.2) 0%,transparent 65%); bottom:-120px; left:-80px; pointer-events:none; }

        /* process steps — clean, no images */
        .step { display:flex; align-items:flex-start; gap:16px; position:relative; z-index:2; }
        .step-num { width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:rgba(255,255,255,0.5); flex-shrink:0; font-family:'Bricolage Grotesque',sans-serif; }
        .step-num.active { background:linear-gradient(135deg,#2563eb,#0ea5e9); border:none; color:#fff; }
        .step-line { position:absolute; left:17px; top:36px; width:1px; height:28px; background:rgba(255,255,255,0.08); }

        .hero-right { display:flex; flex-direction:column; justify-content:center; padding:0 56px; gap:24px; overflow-y:auto; }
        .badge { display:inline-flex; align-items:center; gap:8px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:999px; padding:6px 16px; width:fit-content; }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:#0ea5e9; flex-shrink:0; }
        .badge-text { font-size:12px; color:#0369a1; font-weight:600; }
        .h1 { font-family:'Bricolage Grotesque',sans-serif; font-weight:900; font-size:52px; line-height:1.06; letter-spacing:-1.8px; color:#0a0a0a; margin:0; }
        .accent-blue { background:linear-gradient(135deg,#2563eb,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .accent-red { color:#e02020; -webkit-text-fill-color:#e02020; }
        .lede { font-size:15.5px; line-height:1.75; color:#6b7280; margin:0; }
        .features { display:flex; flex-direction:column; gap:10px; }
        .feature { display:flex; align-items:center; gap:10px; font-size:14px; color:#374151; }
        .feature-icon { width:26px; height:26px; border-radius:7px; background:#eff6ff; border:1px solid #dbeafe; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#2563eb,#0ea5e9); color:#fff; padding:14px 28px; border-radius:999px; font-weight:700; font-size:15px; border:none; cursor:pointer; font-family:inherit; box-shadow:0 8px 24px -6px rgba(37,99,235,0.45); transition:transform .2s,box-shadow .2s; }
        .btn-primary:hover { transform:translateY(-1px); box-shadow:0 12px 28px -6px rgba(37,99,235,0.55); }
        .trust { display:flex; gap:16px; flex-wrap:wrap; }
        .trust-item { font-size:12px; color:#9ca3af; display:flex; align-items:center; gap:5px; }
        .stats { display:flex; padding-top:20px; border-top:1px solid #f1f5f9; }
        .stat { flex:1; }
        .stat+.stat { border-left:1px solid #f1f5f9; padding-left:24px; }
        .stat-num { font-family:'Bricolage Grotesque',sans-serif; font-size:28px; font-weight:900; color:#0a0a0a; letter-spacing:-0.8px; line-height:1; }
        .stat-unit { font-size:12px; color:#2563eb; margin-left:3px; font-weight:700; }
        .stat-label { font-size:11px; color:#9ca3af; margin-top:4px; }
        .admin-hint { position:fixed; bottom:16px; right:20px; font-size:11px; color:rgba(0,0,0,0.15); cursor:pointer; text-decoration:underline; text-decoration-color:rgba(0,0,0,0.1); z-index:50; }
        .admin-hint:hover { color:rgba(0,0,0,0.35); }
        @keyframes blink2{0%,100%{opacity:1}50%{opacity:0.3}}
        .blink2{animation:blink2 1.2s infinite}
      `}</style>

      <div className="land">
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-mark"><span>C</span></div>
            <span className="nav-logo-text">Cuemath</span>
          </div>
          <button className="nav-cta" onClick={() => navigate('/setup')}>Get started</button>
        </nav>

        <div className="hero">

          {/* LEFT — process walkthrough, no images */}
          <div className="hero-left">
            <div className="grid-lines" />
            <div className="orb1" />
            <div className="orb2" />

            {/* Header */}
            <div style={{position:'relative',zIndex:2,marginBottom:36}}>
              <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:8}}>How it works</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:28,fontWeight:800,color:'#fff',letterSpacing:'-0.5px',lineHeight:1.2}}>
                From link to report<br/>
                <span style={{color:'rgba(255,255,255,0.4)'}}>in under 10 minutes.</span>
              </div>
            </div>

            {/* Steps */}
            <div style={{display:'flex',flexDirection:'column',gap:0,position:'relative',zIndex:2}}>
              {[
                {n:'01', title:'Candidate opens the link', desc:'Enters name, email, tests mic. No account needed.', active:true},
                {n:'02', title:'AI interviews them', desc:'5 questions, natural voice conversation, adaptive follow-ups.', active:false},
                {n:'03', title:'Assessment generated', desc:'Scores, summary, and evidence quotes — instantly.', active:false},
                {n:'04', title:'Recruiter reviews report', desc:'Dashboard with charts, transcript, and final decision.', active:false},
              ].map((s,i) => (
                <div key={i} style={{position:'relative',marginBottom:i<3?8:0}}>
                  {i < 3 && <div className="step-line" />}
                  <div className="step">
                    <div className={`step-num${s.active?' active':''}`}>{s.n}</div>
                    <div style={{paddingTop:6}}>
                      <div style={{fontSize:14,fontWeight:600,color:s.active?'#fff':'rgba(255,255,255,0.7)',marginBottom:3}}>{s.title}</div>
                      <div style={{fontSize:12,color:'rgba(255,255,255,0.38)',lineHeight:1.5}}>{s.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stat bar */}
            <div style={{position:'relative',zIndex:2,marginTop:36,display:'flex',gap:0,borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:24}}>
              {[
                {n:'~8',unit:'min',l:'avg interview'},
                {n:'5',unit:'dims',l:'soft skills scored'},
                {n:'100%',unit:'',l:'voice-based'},
              ].map((s,i) => (
                <div key={i} style={{flex:1,paddingRight:i<2?20:0,borderRight:i<2?'1px solid rgba(255,255,255,0.08)':'none',paddingLeft:i>0?20:0}}>
                  <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:900,color:'#fff',lineHeight:1}}>
                    {s.n}<span style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginLeft:3}}>{s.unit}</span>
                  </div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.3)',marginTop:4}}>{s.l}</div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — text content */}
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
              ].map((f,i) => (
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
              {['No signup required','Chrome only','Completely free'].map((t,i) => (
                <span key={i} className="trust-item">
                  <span style={{color:'#d1d5db'}}>◦</span>{t}
                </span>
              ))}
            </div>

            <div className="stats">
              {[{n:'~8',unit:'min',l:'interview'},{n:'5',unit:'skills',l:'assessed'},{n:'Instant',unit:'',l:'reports'}].map((s,i) => (
                <div key={i} className="stat" style={{paddingLeft:i>0?24:0}}>
                  <div className="stat-num">{s.n}{s.unit&&<span className="stat-unit">{s.unit}</span>}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <span className="admin-hint" onClick={() => navigate('/admin')}>admin</span>
    </>
  )
}