import { MO, R, N, D, T, Label, Btn, Card, Icon, Bar } from '../ds.jsx';

export default function Dashboard({ streak, weekDone, onLog, onBook }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div style={{ padding: '12px 20px 120px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Label>Mon · Apr 21</Label>
          <D size={26} weight={600} style={{ marginTop: 4 }}>Morning, Sam.</D>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: MO.surface2, border: `1px solid ${MO.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MO.display, fontWeight: 600 }}>S</div>
      </div>

      {/* STREAK HERO */}
      <div style={{
        position: 'relative', borderRadius: R.xl, padding: 22, marginBottom: 14,
        background: `linear-gradient(160deg, ${MO.surface2} 0%, ${MO.surface} 100%)`,
        border: `1px solid ${MO.line}`, overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${MO.accentDim} 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <svg width="52" height="64" viewBox="0 0 52 64" style={{ filter: `drop-shadow(0 0 18px ${MO.accentDim})` }}>
              <path d="M26 4C22 14 14 18 14 32a12 12 0 0024 0c0-7-4-9-6-14 0 4-2 6-4 6-3 0-1-6-1-10 0-4-1-8-1-10z"
                fill={MO.accent} opacity="0.16" />
              <path d="M26 4C22 14 14 18 14 32a12 12 0 0024 0c0-7-4-9-6-14 0 4-2 6-4 6-3 0-1-6-1-10 0-4-1-8-1-10z"
                stroke={MO.accent} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
              <path d="M26 24c-4 6-6 10-4 14 2 4 5 4 8 0 2-3 0-8-4-14z" fill={MO.accent} opacity="0.6" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <N size={52} weight={700} color={MO.accent}>{streak}</N>
            <T size={13} color={MO.ink3} style={{ marginTop: -4 }}>day streak · personal best</T>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Label>Next</Label>
            <N size={18} weight={600}>{streak + 3}</N>
          </div>
        </div>

        {/* week dots */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'space-between' }}>
          {days.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: '100%', aspectRatio: '1', maxWidth: 30, borderRadius: 8,
                background: weekDone[i] ? MO.accent : 'transparent',
                border: `1px solid ${weekDone[i] ? MO.accent : MO.lineStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {weekDone[i] ? <Icon name="check" size={14} color={MO.accentText} stroke={2.4} /> : null}
              </div>
              <Label style={{ fontSize: 9 }}>{d}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* TODAY'S PLAN */}
      <Card raised style={{ marginBottom: 14, padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: MO.accentDim,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="run" size={22} color={MO.accent} />
        </div>
        <div style={{ flex: 1 }}>
          <T size={12} color={MO.ink3}>TODAY · ZONE 2</T>
          <div style={{ fontFamily: MO.display, fontSize: 17, fontWeight: 600, marginTop: 2 }}>Easy run · 30 min</div>
        </div>
        <Btn variant="primary" size="sm" onClick={onLog}>Start</Btn>
      </Card>

      {/* GOAL PROGRESS */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <Label>5K Goal · 12 weeks</Label>
          <T size={11} color={MO.accent}>+0.4 km this wk</T>
        </div>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
            <div>
              <N size={38} weight={700}>3.8</N>
              <T as="span" size={14} color={MO.ink3} style={{ marginLeft: 6 }}>/ 5.0 km</T>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Label>Pace</Label>
              <N size={18} weight={600}>6:43</N>
              <T size={11} color={MO.ink3}>min/km</T>
            </div>
          </div>
          <Bar pct={76} />
          <svg width="100%" height="44" viewBox="0 0 300 44" style={{ marginTop: 14 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="sp" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={MO.accent} stopOpacity="0.3" />
                <stop offset="100%" stopColor={MO.accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 32 L30 30 L60 28 L90 24 L120 26 L150 20 L180 18 L210 14 L240 12 L270 10 L300 6 L300 44 L0 44 Z" fill="url(#sp)" />
            <path d="M0 32 L30 30 L60 28 L90 24 L120 26 L150 20 L180 18 L210 14 L240 12 L270 10 L300 6" stroke={MO.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
            {[0,30,60,90,120,150,180,210,240,270,300].map((x, i) => (
              <circle key={i} cx={x} cy={[32,30,28,24,26,20,18,14,12,10,6][i]} r="2.5" fill={MO.bg} stroke={MO.accent} strokeWidth="1.5" />
            ))}
          </svg>
        </Card>
      </div>

      {/* COACH INSIGHT */}
      <Card onClick={onBook} style={{ borderColor: MO.accent, borderStyle: 'dashed', background: MO.accentDim }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="sparkle" size={18} color={MO.accent} />
          <div style={{ flex: 1 }}>
            <Label color={MO.accent}>Coach insight</Label>
            <T size={14} color={MO.ink} style={{ marginTop: 4 }}>
              Your pace drops 18% after km 2. Try a form check with Maya this week?
            </T>
          </div>
          <Icon name="chevron" size={16} color={MO.ink3} />
        </div>
      </Card>
    </div>
  );
}
