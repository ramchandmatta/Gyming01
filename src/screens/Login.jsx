import { useState } from 'react';
import { MO, R, D, T, Label, Btn, Icon } from '../ds.jsx';

export default function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: MO.surface, border: `1px solid ${MO.lineStrong}`,
    borderRadius: R.md, color: MO.ink,
    fontFamily: MO.text, fontSize: 15,
    boxSizing: 'border-box',
    transition: 'border-color 160ms',
  };

  const SocialBtn = ({ icon, label, onClick }) => (
    <button onClick={onClick} style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '13px 16px', borderRadius: R.md,
      background: MO.surface, border: `1px solid ${MO.lineStrong}`,
      color: MO.ink, fontFamily: MO.text, fontSize: 14, fontWeight: 500,
      cursor: 'pointer', transition: 'border-color 160ms',
    }}>
      <Icon name={icon} size={18} color={MO.ink2} />
      {label}
    </button>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column' }}>
      {/* ambient glow */}
      <div style={{ position: 'absolute', top: -80, left: -60, width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, ${MO.accentDim} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ padding: '64px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', color: MO.ink }}>
          <Icon name="chevronL" size={22} />
        </button>
      </div>

      <div style={{ padding: '28px 28px 0', flex: 1, overflowY: 'auto' }} className="mo-scroll">
        <Label style={{ marginBottom: 8 }}>Welcome back</Label>
        <D size={36} weight={700} style={{ marginBottom: 6 }}>Sign in</D>
        <T size={15} color={MO.ink3} style={{ marginBottom: 32 }}>
          Good to have you back.
        </T>

        {/* Social login */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <SocialBtn icon="google" label="Google" onClick={onLogin} />
          <SocialBtn icon="linkedin" label="LinkedIn" onClick={onLogin} />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: MO.line }} />
          <T size={12} color={MO.ink4}>or continue with email</T>
          <div style={{ flex: 1, height: 1, background: MO.line }} />
        </div>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <Label style={{ marginBottom: 8 }}>Email</Label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Label>Password</Label>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: MO.mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.2, color: MO.accent }}>
              Forgot?
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: 48 }}
            />
            <button onClick={() => setShowPw(v => !v)} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: MO.ink3,
              display: 'flex', alignItems: 'center',
            }}>
              <Icon name={showPw ? 'eye-off' : 'eye'} size={18} />
            </button>
          </div>
        </div>

        <Btn variant="primary" size="lg" stretch onClick={onLogin}>
          Sign in
        </Btn>

        <T size={13} color={MO.ink4} style={{ textAlign: 'center', marginTop: 20 }}>
          Don't have an account?{' '}
          <span style={{ color: MO.accent, cursor: 'pointer' }} onClick={onBack}>Start free trial</span>
        </T>
      </div>
    </div>
  );
}
