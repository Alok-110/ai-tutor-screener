require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendReport = async ({
  candidateEmail,
  candidateName,
  assessment,
  role,
  customMsg,
}) => {
  const dims = ["clarity", "warmth", "simplicity", "fluency", "engagement"];
  const labels = {
    clarity: "Communication Clarity",
    warmth: "Warmth & Patience",
    simplicity: "Ability to Simplify",
    fluency: "English Fluency",
    engagement: "Candidate Engagement",
  };
  const avg = (
    dims.reduce((s, k) => s + (assessment[k] || 0), 0) / dims.length
  ).toFixed(1);

  const recColor = { "Strong Yes": "#15803d", Yes: "#1d4ed8", No: "#dc2626" };
  const barColor = ["#2563eb", "#10b981", "#f59e0b", "#a78bfa", "#ef4444"];

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#f8fafc; color:#0a0a0a; }
  .wrap { max-width:680px; margin:0 auto; background:#fff; }
  .header { background:linear-gradient(135deg,#0f172a,#1e3a8a); padding:40px 48px; }
  .header h1 { font-size:28px; font-weight:800; color:#fff; margin-bottom:6px; }
  .header p { font-size:14px; color:rgba(255,255,255,0.5); }
  .badge { display:inline-block; padding:8px 20px; border-radius:999px; font-size:14px; font-weight:700; margin-top:16px; background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2); }
  .score-big { float:right; text-align:center; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.15); border-radius:50%; width:80px; height:80px; display:flex; flex-direction:column; align-items:center; justify-content:center; margin-top:-8px; }
  .section { padding:32px 48px; border-bottom:1px solid #f1f5f9; }
  .section-title { font-size:11px; font-weight:700; color:#9ca3af; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:20px; }
  .dim-row { margin-bottom:14px; }
  .dim-label { display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; }
  .dim-name { color:#374151; font-weight:500; }
  .dim-score { color:#0a0a0a; font-weight:700; }
  .bar-bg { height:6px; background:#f1f5f9; border-radius:99px; }
  .bar-fill { height:6px; border-radius:99px; }
  .summary { font-size:14px; color:#374151; line-height:1.75; }
  .quote-block { border-left:3px solid #2563eb; padding-left:14px; margin-bottom:14px; }
  .quote-label { font-size:10px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; }
  .quote-text { font-size:13px; color:#374151; font-style:italic; line-height:1.6; }
  .footer { padding:28px 48px; background:#f8fafc; text-align:center; }
  .footer p { font-size:12px; color:#9ca3af; line-height:1.7; }
  .rec-badge { display:inline-block; padding:6px 16px; border-radius:6px; font-size:13px; font-weight:700; }
</style>
</head>
<body>
<div class="wrap">

  <div class="header">
    <div style="overflow:hidden">
      <div class="score-big">
        <span style="font-size:24px;font-weight:900;color:#fff;line-height:1">${avg}</span>
        <span style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:2px">/5.0</span>
      </div>
      <h1>${candidateName}</h1>
      <p>${role}</p>
      <div class="badge">
        🤖 AI Suggestion: 
        <span style="color:${recColor[assessment.recommendation] || "#fff"}">${assessment.recommendation}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Score Breakdown</div>
    ${dims
      .map(
        (k, i) => `
      <div class="dim-row">
        <div class="dim-label">
          <span class="dim-name">${labels[k]}</span>
          <span class="dim-score">${assessment[k]}/5</span>
        </div>
        <div class="bar-bg">
          <div class="bar-fill" style="width:${(assessment[k] / 5) * 100}%;background:${barColor[i]}"></div>
        </div>
      </div>
    `,
      )
      .join("")}
  </div>

  <div class="section">
    <div class="section-title">AI Summary</div>
    <p class="summary">${assessment.summary}</p>
  </div>

  ${
    assessment.quotes
      ? `
  <div class="section">
    <div class="section-title">Evidence Quotes</div>
    ${Object.entries(assessment.quotes)
      .map(
        ([k, q], i) => `
      <div class="quote-block" style="border-left-color:${barColor[i]}">
        <div class="quote-label">${labels[k] || k}</div>
        <div class="quote-text">"${q}"</div>
      </div>
    `,
      )
      .join("")}
  </div>`
      : ""
  }
  ${customMsg ? `
  <div class="section">
    <div class="section-title">Recruiter Note</div>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px 20px;font-size:14px;color:#1e40af;line-height:1.7;font-style:italic;">"${customMsg}"</div>
  </div>` : ''}

  <div class="footer">
    <p><strong>Cuemath Tutor Screening — Admin Copy</strong><br/>

  <div class="footer">
    <p><strong>Cuemath Tutor Screening — Admin Copy</strong><br/>
This report was sent to you as the recruiting admin.<br/>
Candidate: ${candidateName} · ${candidateEmail}<br/>
AI suggestion is advisory only — final decision is yours.</p>
  </div>

</div>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: "Cuemath Screener <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: `[Cuemath Screener] Report for ${candidateName} — ${assessment.recommendation}`,
    html,
  });

  if (error) throw new Error(error.message);
  return data;
};

module.exports = { sendReport };
