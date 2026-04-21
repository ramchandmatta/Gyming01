import { useState } from 'react';
import { MO, R, N, D, T, Label, Btn, Card, Icon, Bar } from '../ds.jsx';

export function OnbGoals({ selected, onToggle, onNext, onBack }) {
  const goals = [
    { id: 'run5k',    label: 'Run 5K',       icon: 'run' },
    { id: 'muscle',   label: 'Build muscle', icon: 'dumbbell' },
    { id: 'lose',     label: 'Lose weight',  icon: 'trend' },
    { id: 'sleep',    label: 'Sleep better', icon: 'moon' },
    { id: 'mobility', label: 'More mobility',icon: 'yoga' },
    { id: 'hike',     label: 'Hike ready',   icon: 'target' },
    { id: 'stress',   label: 'Lower stress', icon: 'heart' },
    { id: 'energy',   label: 'More energy',  icon: 'bolt' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '64px 24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', color: MO.ink }}>
          <Icon name="chevronL" size={22} />
        </button>
        <Bar pct={50} height={3} color={MO.accent} />
        <Label>2 / 4</Label>
      </div>

      <div style={{ padding: '32px 28px 0' }}>
        <D size={34} weight={700}>What brings you here?</D>
        <T size={15} color={MO.ink2} style={{ marginTop: 8 }}>Pick up to 3 — we'll tune your plan.</T>
      </div>

      <div style={{ padding: '28px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1, alignContent: 'start' }}>
        {goals.map(g => {
          const active = selected.includes(g.id);
          const atMax = selected.length >= 3 && !active;
          return (
            <button key={g.id} onClick={() => !atMax && onToggle(g.id)}
              style={{
                padding: '18px 14px',
                background: active ? MO.accentDim : MO.surface,
                border: `1px solid ${active ? MO.accent : MO.line}`,
                borderRadius: R.md,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                cursor: atMax ? 'not-allowed' : 'pointer',
                opacity: atMax ? 0.35 : 1,
                transition: 'all 180ms cubic-bezier(.2,.7,.3,1)',
                textAlign: 'left',
              }}>
              <Icon name={g.icon} size={24} color={active ? MO.accent : MO.ink2} />
              <div style={{ fontFamily: MO.text, fontSize: 15, fontWeight: 500, color: MO.ink }}>{g.label}</div>
            </button>
          );
        })}
      </div>

      <div style={{ padding: '16px 24px 40px', background: `linear-gradient(180deg, transparent, ${MO.bg} 30%)` }}>
        <Btn variant="primary" size="lg" stretch disabled={selected.length === 0} onClick={onNext}>
          Continue {selected.length > 0 && `· ${selected.length}`}
        </Btn>
      </div>
    </div>
  );
}

export function OnbTarget({ distance, weeks, setDistance, setWeeks, onNext, onBack }) {
  const Dial = ({ label, value, unit, min, max, val, onChange }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <T size={14} color={MO.ink2}>{label}</T>
        <div>
          <N size={30} weight={600} color={MO.accent}>{value}</N>
          <T as="span" size={14} color={MO.ink3} style={{ marginLeft: 6 }}>{unit}</T>
        </div>
      </div>
      <input type="range" min={min} max={max} value={val} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '64px 24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', color: MO.ink }}>
          <Icon name="chevronL" size={22} />
        </button>
        <Bar pct={75} height={3} color={MO.accent} />
        <Label>3 / 4</Label>
      </div>
      <div style={{ padding: '32px 28px 24px' }}>
        <D size={34} weight={700}>Dial it in.</D>
        <T size={15} color={MO.ink2} style={{ marginTop: 8 }}>We'll build a realistic plan around this.</T>
      </div>
      <div style={{ padding: '0 24px', flex: 1 }}>
        <Dial label="Target run distance" value={distance} unit="km" min={1} max={21} val={distance} onChange={setDistance} />
        <Dial label="Timeframe" value={weeks} unit="weeks" min={4} max={24} val={weeks} onChange={setWeeks} />
        <Card raised style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Icon name="sparkle" size={20} color={MO.accent} />
            <div>
              <Label color={MO.accent}>Coach read</Label>
              <T size={14} color={MO.ink} style={{ marginTop: 6 }}>
                {weeks < 8 ? 'Ambitious.' : weeks < 14 ? 'Realistic.' : 'Comfortable pace.'}
                {' '}That's about {Math.round(distance * 0.4 + 90)} min/wk of training.
              </T>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ padding: '16px 24px 40px' }}>
        <Btn variant="primary" size="lg" stretch onClick={onNext}>Lock it in</Btn>
      </div>
    </div>
  );
}

export function OnbCommit({ onDone, onBack }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [picked, setPicked] = useState([0, 2, 4, 6]);
  const toggle = (i) => setPicked(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '64px 24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', color: MO.ink }}>
          <Icon name="chevronL" size={22} />
        </button>
        <Bar pct={100} height={3} color={MO.accent} />
        <Label>4 / 4</Label>
      </div>

      <div style={{ padding: '32px 28px 24px' }}>
        <D size={34} weight={700}>Which days are yours?</D>
        <T size={15} color={MO.ink2} style={{ marginTop: 8 }}>Pick your training days. We'll protect them.</T>
      </div>

      <div style={{ padding: '0 20px', flex: 1 }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
          {days.map((d, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              flex: 1, aspectRatio: '1',
              background: picked.includes(i) ? MO.accent : MO.surface,
              border: `1px solid ${picked.includes(i) ? MO.accent : MO.line}`,
              borderRadius: R.md,
              fontFamily: MO.display, fontSize: 18, fontWeight: 600,
              color: picked.includes(i) ? MO.accentText : MO.ink,
              cursor: 'pointer', transition: 'all 180ms',
            }}>{d}</button>
          ))}
        </div>

        <Card style={{ marginTop: 28 }}>
          <Label>Your plan</Label>
          <div style={{ marginTop: 14 }}>
            {[
              ['Goal', 'Run 5K · 12 wks'],
              ['Training days', `${picked.length}/week`],
              ['First session', 'Today · easy run'],
            ].map(([k, v], idx, arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                borderBottom: idx < arr.length - 1 ? `1px solid ${MO.line}` : 'none' }}>
                <T size={14}>{k}</T>
                <T size={14} color={idx === 2 ? MO.accent : MO.ink}>{v}</T>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ padding: '16px 24px 40px' }}>
        <Btn variant="primary" size="lg" stretch onClick={onDone}>Start your streak →</Btn>
      </div>
    </div>
  );
}
