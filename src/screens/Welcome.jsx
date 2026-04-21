import { MO, D, T, Label, Btn } from '../ds.jsx';

export default function Welcome({ onNext, onLogin }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column', padding: '80px 28px 40px' }}>
      <div style={{ position: 'absolute', top: -100, right: -80, width: 360, height: 360, borderRadius: '50%',
        background: `radial-gradient(circle, ${MO.accentDim} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ marginTop: 20 }}>
        <Label>Momentum · est. 2026</Label>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
        <D size={58} weight={700} style={{ letterSpacing: -2 }}>
          Small wins,<br />
          <span style={{ color: MO.accent }}>stacked</span> daily.
        </D>
        <T size={17} color={MO.ink2} style={{ marginTop: 20, maxWidth: 300 }}>
          Track goals, log workouts, book coaches — the streak keeps you honest.
        </T>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 30 }}>
        <Btn variant="primary" size="lg" stretch onClick={onNext}>
          Start 14-day free trial
        </Btn>
        <Btn variant="ghost" size="md" stretch onClick={onLogin}>I have an account</Btn>
      </div>
    </div>
  );
}
