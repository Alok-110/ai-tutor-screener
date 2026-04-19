import { useNavigate } from 'react-router-dom'

export default function Navbar({ label = '' }) {
  const navigate = useNavigate()
  const name = localStorage.getItem('candidateName')

  return (
    <nav style={{
      height:60, flexShrink:0,
      background:'rgba(238,244,255,0.95)',
      backdropFilter:'blur(12px)',
      borderBottom:'1px solid rgba(0,0,0,0.06)',
      display:'flex', alignItems:'center',
      padding:'0 48px', justifyContent:'space-between',
      position:'sticky', top:0, zIndex:50,
      fontFamily:'DM Sans,sans-serif',
    }}>
      <div style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}} onClick={() => navigate('/')}>
        <div style={{width:30,height:30,borderRadius:8,background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{color:'#fff',fontSize:13,fontWeight:900,fontFamily:"'Bricolage Grotesque',sans-serif"}}>C</span>
        </div>
        <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:16,color:'#0a0a0a',letterSpacing:'-0.3px'}}>Cuemath</span>
      </div>

      {label && <span style={{fontSize:12,color:'#9ca3af',fontWeight:500}}>{label}</span>}

      {name
        ? <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700}}>
              {name[0].toUpperCase()}
            </div>
            <span style={{fontSize:13,fontWeight:500,color:'#374151'}}>{name}</span>
          </div>
        : <div style={{width:30}} />
      }
    </nav>
  )
}