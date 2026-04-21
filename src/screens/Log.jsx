import { useState } from 'react';
import { MO, R, N, D, T, Label, Btn, Card, Chip, Icon } from '../ds.jsx';

export default function Log({ onSave, onCancel }) {
  const [activity, setActivity] = useState('run');
  const [distance, setDistance] = useState('4.2');
  const [duration, setDuration] = useState('28:14');
  const [intensity, setIntensity] = useState(2);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const activities = [
    { id: 'run',   label: 'Run',   icon: 'run' },
    { id: 'lift',  label: 'Lift',  icon: 'dumbbell' },
    { id: 'yoga',  label: 'Yoga',  icon: 'yoga' },
    { id: 'bike',  label: 'Cycle', icon: 'bolt' },
    { id: 'other', label: 'Other', icon: 'plus' },
  ];
  const moods = ['😴', '🙂', '😤', '🔥', '💀'];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaved(true); setTimeout(onSave, 900); }, 500);
  };

  if (saved) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: 100, height: 100, borderRadius: 50, background: MO.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop 500ms cubic-bezier(.2,.7,.3,1)' }}>
          <Icon name="check" size={48} color={MO.accentText} stroke={3} />
        </div>
        <D size={32} weight={700} style={{ marginTop: 24, textAlign: 'center' }}>Streak extended.</D>
        <N size={48} weight={700} color={MO.accent} style={{ marginTop: 8 }}>18 days</N>
        <T size={15} color={MO.ink2} style={{ marginTop: 12 }}>2 away from personal best.</T>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 20px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Label>Apr 21 · 6:42 PM</Label>
          <D size={26} weight={600} style={{ marginTop: 4 }}>Log workout</D>
        </div>
        <button onClick={onCancel} style={{ background: MO.surface, border: `1px solid ${MO.line}`, width: 36, height: 36, borderRadius: 18, color: MO.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="close" size={16} />
        </button>
      </div>

      <Label style={{ marginBottom: 8 }}>Activity</Label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {activities.map(a => (
          <Chip key={a.id} active={activity === a.id} onClick={() => setActivity(a.id)}
            icon={<Icon name={a.icon} size={15} color={activity === a.id ? MO.accentText : MO.ink2} />}>
            {a.label}
          </Chip>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        <Card style={{ padding: 16 }}>
          <Label>Distance</Label>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline' }}>
            <input value={distance} onChange={e => setDistance(e.target.value)}
              style={{ fontFamily: MO.display, fontSize: 32, fontWeight: 600, background: 'transparent', border: 'none', color: MO.ink, width: 60, padding: 0, fontVariantNumeric: 'tabular-nums' }} />
            <T as="span" size={13} color={MO.ink3}>km</T>
          </div>
        </Card>
        <Card style={{ padding: 16 }}>
          <Label>Duration</Label>
          <div style={{ marginTop: 4 }}>
            <input value={duration} onChange={e => setDuration(e.target.value)}
              style={{ fontFamily: MO.display, fontSize: 32, fontWeight: 600, background: 'transparent', border: 'none', color: MO.ink, width: '100%', padding: 0, fontVariantNumeric: 'tabular-nums' }} />
          </div>
        </Card>
        <Card style={{ padding: 16 }}>
          <Label>Avg Pace</Label>
          <div style={{ marginTop: 4 }}>
            <N size={22} weight={600}>6:43</N>
            <T as="span" size={12} color={MO.ink3} style={{ marginLeft: 4 }}>/ km</T>
          </div>
        </Card>
        <Card style={{ padding: 16 }}>
          <Label>Heart rate</Label>
          <div style={{ marginTop: 4 }}>
            <N size={22} weight={600}>148</N>
            <T as="span" size={12} color={MO.ink3} style={{ marginLeft: 4 }}>bpm</T>
          </div>
        </Card>
      </div>

      <Label style={{ marginBottom: 8 }}>How did it feel?</Label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {moods.map((e, i) => (
          <button key={i} onClick={() => setIntensity(i)} style={{
            flex: 1, padding: '14px 0',
            background: i === intensity ? MO.accentDim : MO.surface,
            border: `1px solid ${i === intensity ? MO.accent : MO.line}`,
            borderRadius: R.sm, fontSize: 24, cursor: 'pointer',
            transition: 'all 140ms',
          }}>{e}</button>
        ))}
      </div>

      <Label style={{ marginBottom: 8 }}>Notes</Label>
      <textarea value={notes} onChange={e => setNotes(e.target.value)}
        placeholder="Humid. Legs heavy the first km."
        style={{
          width: '100%', minHeight: 80, padding: 14, marginBottom: 24,
          background: MO.surface, border: `1px solid ${MO.line}`, borderRadius: R.md,
          fontFamily: MO.text, fontSize: 14, color: MO.ink, resize: 'none',
          boxSizing: 'border-box',
        }} />

      <Btn variant="primary" size="lg" stretch onClick={handleSave} disabled={saving}>
        {saving ? 'Saving…' : 'Save workout'}
      </Btn>
    </div>
  );
}
