import { useState } from 'react';
import { MO, R, N, D, T, Label, Btn, Card, Icon } from '../ds.jsx';

export default function Coach({ onOpenRecovery, onOpenTrainers }) {
  const [water, setWater] = useState(5);
  const [dismissed, setDismissed] = useState([]);

  const nudges = [
    { id: 'n1', kind: 'streak',  icon: 'flame',   title: 'Protect the streak',
      body: "You're 17 days in. Tomorrow is a training day — a 20-min walk counts.", cta: 'Got it' },
    { id: 'n2', kind: 'insight', icon: 'trend',   title: 'Your pattern',
      body: 'Workouts before 9am finish 94% of the time. After 5pm, 41%. Morning plan?', cta: 'Move tomorrow to 7am' },
    { id: 'n3', kind: 'recovery',icon: 'heart',   title: 'Knee feeling tight?',
      body: "You logged 'heavy' 3 runs ago. Priya has a knee-rehab slot Wed 12pm.", cta: 'View', action: onOpenRecovery },
    { id: 'n4', kind: 'trainer', icon: 'sparkle', title: 'Pace plateau',
      body: "You've held 6:43/km for 3 weeks. A form session with Maya could unlock Zone 3.", cta: 'See Maya', action: onOpenTrainers },
  ];

  const visible = nudges.filter(n => !dismissed.includes(n.id));

  return (
    <div style={{ padding: '16px 20px 120px' }}>
      <div style={{ marginBottom: 20 }}>
        <Label>Your coach</Label>
        <D size={26} weight={600} style={{ marginTop: 4 }}>What matters today</D>
      </div>

      {/* Nutrition */}
      <Card raised style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <Label>Nutrition</Label>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <N size={26} weight={700}>1,847</N>
              <T as="span" size={12} color={MO.ink3}>/ 2,200 kcal</T>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Label>Protein</Label>
            <N size={18} weight={600} color={MO.accent}>112g</N>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          <div style={{ flex: 42, height: 6, background: MO.accent, borderRadius: 3 }} />
          <div style={{ flex: 30, height: 6, background: '#c7a262', borderRadius: 3 }} />
          <div style={{ flex: 28, height: 6, background: '#7ba8c5', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <T size={11} color={MO.ink3}>P 42%</T>
          <T size={11} color={MO.ink3}>C 30%</T>
          <T size={11} color={MO.ink3}>F 28%</T>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: `1px solid ${MO.line}` }}>
          <T size={13} color={MO.ink2}>Water · {water} / 8 glasses</T>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} onClick={() => setWater(i + 1)} style={{
                width: 16, height: 20, borderRadius: 4, cursor: 'pointer',
                background: i < water ? '#7ba8c5' : 'transparent',
                border: `1px solid ${i < water ? '#7ba8c5' : MO.lineStrong}`,
                transition: 'all 140ms',
              }} />
            ))}
          </div>
        </div>
      </Card>

      <Label style={{ marginBottom: 12 }}>Smart nudges · {visible.length} new</Label>

      {visible.map(n => (
        <div key={n.id} style={{
          padding: 16, marginBottom: 10, borderRadius: R.md,
          background: MO.surface, border: `1px solid ${MO.line}`,
          display: 'flex', gap: 14,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: MO.accentDim,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={n.icon} size={17} color={MO.accent} />
          </div>
          <div style={{ flex: 1 }}>
            <D size={14} weight={600}>{n.title}</D>
            <T size={13} color={MO.ink2} style={{ marginTop: 4 }}>{n.body}</T>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Btn variant="outline" size="sm"
                onClick={() => { n.action ? n.action() : setDismissed(d => [...d, n.id]); }}>
                {n.cta}
              </Btn>
              <Btn variant="ghost" size="sm" onClick={() => setDismissed(d => [...d, n.id])}>Dismiss</Btn>
            </div>
          </div>
        </div>
      ))}

      {visible.length === 0 && (
        <Card style={{ textAlign: 'center', padding: 36 }}>
          <Icon name="check" size={32} color={MO.accent} stroke={2} />
          <D size={17} weight={600} style={{ marginTop: 10 }}>All clear.</D>
          <T size={13} color={MO.ink3} style={{ marginTop: 4 }}>New nudges arrive tomorrow morning.</T>
        </Card>
      )}
    </div>
  );
}
