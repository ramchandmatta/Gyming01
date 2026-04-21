import { useState } from 'react';
import { MO, R, N, D, T, Label, Btn, Card, Chip, Icon, Ring } from '../ds.jsx';

const TRAINERS = [
  { id: 't1', name: 'Maya Kowalski', tag: 'Running · Endurance',    rate: 85,  rating: 4.9, rev: 127, next: 'Tue 7:00a',   bio: 'NASM-CPT · 8 yrs · helped 40+ runners hit their first 5K.', top: true },
  { id: 't2', name: 'Dominic Reyes', tag: 'Strength · Powerlifting', rate: 95,  rating: 5.0, rev: 84,  next: 'Today 6:00p' },
  { id: 't3', name: 'Priya Sharma',  tag: 'Mobility · Rehab',        rate: 80,  rating: 4.8, rev: 213, next: 'Wed 12:00p' },
  { id: 't4', name: 'Jordan Chen',   tag: 'HIIT · Conditioning',     rate: 75,  rating: 4.7, rev: 96,  next: 'Thu 5:30a' },
];

function Initials({ name, size = 50, fontSize = 17, gradient = false }) {
  const letters = name.split(' ').map(n => n[0]).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, flexShrink: 0,
      background: gradient ? `linear-gradient(135deg, ${MO.accent}, ${MO.accentHi})` : MO.surface2,
      border: gradient ? 'none' : `1px solid ${MO.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: MO.display, fontSize, fontWeight: 600,
      color: gradient ? MO.accentText : MO.ink,
    }}>{letters}</div>
  );
}

function TrainersList({ onPick }) {
  const [filter, setFilter] = useState('for-you');
  const filters = ['For you', 'Running', 'Strength', 'Mobility', 'Virtual'];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
        padding: '12px 16px', background: MO.surface, border: `1px solid ${MO.line}`, borderRadius: R.pill }}>
        <Icon name="search" size={18} color={MO.ink3} />
        <T size={14} color={MO.ink3}>Search by name, specialty…</T>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
        {filters.map(f => (
          <div key={f} style={{ flexShrink: 0 }}>
            <Chip active={filter === f} onClick={() => setFilter(f)} size="sm">{f}</Chip>
          </div>
        ))}
      </div>

      {TRAINERS.filter(t => t.top).map(t => (
        <div key={t.id} onClick={() => onPick(t)} style={{
          marginBottom: 18, padding: 18, borderRadius: R.lg,
          background: `linear-gradient(145deg, ${MO.accentDim}, ${MO.surface})`,
          border: `1px solid ${MO.accent}`, cursor: 'pointer',
        }}>
          <Label color={MO.accent} style={{ marginBottom: 14 }}>★ Top match</Label>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Initials name={t.name} size={64} fontSize={24} gradient />
            <div style={{ flex: 1 }}>
              <D size={18} weight={600}>{t.name}</D>
              <T size={12} color={MO.ink3}>{t.tag}</T>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, alignItems: 'center' }}>
                <Icon name="star" size={12} color={MO.accent} />
                <T size={12} color={MO.ink}>{t.rating}</T>
                <T size={12} color={MO.ink3}>({t.rev})</T>
                <T size={12} color={MO.ink3}>·</T>
                <T size={12}>${t.rate}/hr</T>
              </div>
            </div>
          </div>
          <T size={13} color={MO.ink2} style={{ fontStyle: 'italic', marginTop: 14, paddingTop: 14, borderTop: `1px solid ${MO.line}` }}>
            "{t.bio}"
          </T>
        </div>
      ))}

      <Label style={{ marginBottom: 12 }}>Others available</Label>
      {TRAINERS.filter(t => !t.top).map(t => (
        <div key={t.id} onClick={() => onPick(t)} style={{
          padding: '14px 0', borderBottom: `1px solid ${MO.line}`,
          display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer',
        }}>
          <Initials name={t.name} />
          <div style={{ flex: 1 }}>
            <D size={15} weight={600}>{t.name}</D>
            <T size={12} color={MO.ink3}>{t.tag}</T>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <T size={11} color={MO.ink2}>★ {t.rating}</T>
              <T size={11} color={MO.ink2}>· ${t.rate}/hr</T>
              <T size={11} color={MO.accent}>· {t.next}</T>
            </div>
          </div>
          <Icon name="chevron" size={16} color={MO.ink3} />
        </div>
      ))}
    </div>
  );
}

function RecoveryList() {
  const [tab, setTab] = useState('massage');
  const massage = [
    { name: 'Deep Tissue',    dur: '60 min', price: 95,  desc: 'For tight hamstrings & calves' },
    { name: 'Sports Recovery',dur: '45 min', price: 75,  desc: 'Active release · post-run' },
    { name: 'Swedish',        dur: '60 min', price: 80,  desc: 'Gentle · full body' },
  ];
  const physio = [
    { name: 'Injury assessment',    dur: '45 min', price: 110, desc: 'Full biomechanical intake' },
    { name: 'Knee rehab',           dur: '45 min', price: 95,  desc: 'IT band & patellar focus', match: true },
    { name: 'Return-to-run plan',   dur: '60 min', price: 120, desc: 'Structured progression' },
  ];
  const list = tab === 'massage' ? massage : physio;

  return (
    <div>
      <Card raised style={{ marginBottom: 18, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Ring pct={62} size={74} stroke={5}>
            <div style={{ textAlign: 'center' }}>
              <N size={22} weight={700} color={MO.accent}>62</N>
              <T size={9} color={MO.ink3} style={{ marginTop: -2 }}>READY</T>
            </div>
          </Ring>
          <div style={{ flex: 1 }}>
            <Label>Recovery score</Label>
            <T size={13} color={MO.ink} style={{ marginTop: 6 }}>Moderate. Consider mobility over intensity today.</T>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 4, marginBottom: 14, padding: 4, background: MO.surface, borderRadius: R.pill, border: `1px solid ${MO.line}` }}>
        {[{ id: 'massage', l: 'Massage' }, { id: 'physio', l: 'Physio' }, { id: 'mobility', l: 'Mobility' }].map(x => (
          <button key={x.id} onClick={() => setTab(x.id)} style={{
            flex: 1, padding: '9px', borderRadius: R.pill,
            background: tab === x.id ? MO.bg : 'transparent',
            border: 'none', cursor: 'pointer',
            fontFamily: MO.text, fontSize: 12, fontWeight: 600,
            color: tab === x.id ? MO.ink : MO.ink3,
          }}>{x.l}</button>
        ))}
      </div>

      {list.map((s, i) => (
        <div key={i} style={{
          padding: 14, marginBottom: 8, borderRadius: R.md,
          background: s.match ? MO.accentDim : MO.surface,
          border: `1px solid ${s.match ? MO.accent : MO.line}`,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: MO.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={tab === 'massage' ? 'heart' : 'yoga'} size={18} color={MO.accent} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <D size={14} weight={600}>{s.name}</D>
              {s.match && <Label color={MO.accent} style={{ fontSize: 9 }}>★ Suggested</Label>}
            </div>
            <T size={11} color={MO.ink3}>{s.desc}</T>
            <T size={11} color={MO.ink2} style={{ marginTop: 2 }}>{s.dur} · ${s.price}</T>
          </div>
          <Icon name="chevron" size={14} color={MO.ink3} />
        </div>
      ))}

      {tab === 'mobility' && (
        <Card style={{ marginTop: 6 }}>
          <Label>10-min guided routine</Label>
          <D size={16} weight={600} style={{ marginTop: 6 }}>Post-run hip opener</D>
          <T size={12} color={MO.ink3} style={{ marginTop: 4 }}>Free · for your recovery score</T>
          <Btn variant="outline" size="sm" style={{ marginTop: 12 }}>Start routine</Btn>
        </Card>
      )}
    </div>
  );
}

export function BookTab({ onPickTrainer }) {
  const [sub, setSub] = useState('trainers');
  return (
    <div style={{ padding: '12px 20px 120px' }}>
      <div style={{ marginBottom: 18 }}>
        <Label>Book</Label>
        <D size={26} weight={600} style={{ marginTop: 4 }}>Get the right support</D>
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 18, padding: 4, background: MO.surface, borderRadius: R.pill, border: `1px solid ${MO.line}` }}>
        {[{ id: 'trainers', l: 'Trainers' }, { id: 'recovery', l: 'Recovery' }].map(x => (
          <button key={x.id} onClick={() => setSub(x.id)} style={{
            flex: 1, padding: '10px', borderRadius: R.pill,
            background: sub === x.id ? MO.bg : 'transparent',
            border: 'none', cursor: 'pointer',
            fontFamily: MO.text, fontSize: 13, fontWeight: 600,
            color: sub === x.id ? MO.ink : MO.ink3,
            transition: 'all 140ms',
          }}>{x.l}</button>
        ))}
      </div>
      {sub === 'trainers' ? <TrainersList onPick={onPickTrainer} /> : <RecoveryList />}
    </div>
  );
}

export function BookSlot({ trainer, onBack, onConfirm }) {
  const [sessionType, setSessionType] = useState('1on1');
  const [slotKey, setSlotKey] = useState('0-0');
  const [confirming, setConfirming] = useState(false);

  const sessions = [
    { id: '1on1',   label: '1-on-1',     dur: '60 min', price: trainer.rate },
    { id: 'assess', label: 'Assessment', dur: '30 min', price: Math.round(trainer.rate * 0.5) },
    { id: 'virtual',label: 'Virtual',    dur: '45 min', price: Math.round(trainer.rate * 0.7) },
  ];
  const daySlots = [
    { d: 'Tue', dn: '22', times: ['7:00a', '4:30p', '6:00p'] },
    { d: 'Wed', dn: '23', times: ['8:30a', '12:00p'] },
    { d: 'Thu', dn: '24', times: ['6:00a', '5:30p', '7:00p'] },
  ];
  const sel = sessions.find(s => s.id === sessionType);
  const [di, ti] = slotKey.split('-').map(Number);
  const selectedTime = `${daySlots[di].d} ${daySlots[di].times[ti]}`;

  if (confirming) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: MO.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: 100, height: 100, borderRadius: 50, background: MO.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop 500ms cubic-bezier(.2,.7,.3,1)' }}>
          <Icon name="check" size={48} color={MO.accentText} stroke={3} />
        </div>
        <D size={30} weight={700} style={{ marginTop: 24, textAlign: 'center' }}>Booked.</D>
        <T size={15} color={MO.ink2} style={{ marginTop: 10, textAlign: 'center' }}>{trainer.name} · {selectedTime}</T>
        <T size={13} color={MO.ink3} style={{ marginTop: 4 }}>Calendar invite sent.</T>
        <Btn variant="outline" size="md" style={{ marginTop: 32 }} onClick={onConfirm}>Back to coaches</Btn>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 20px 120px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: MO.surface, border: `1px solid ${MO.line}`, width: 36, height: 36, borderRadius: 18, color: MO.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="chevronL" size={18} />
        </button>
        <T size={14} color={MO.ink3}>Trainers</T>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24 }}>
        <Initials name={trainer.name} size={72} fontSize={26} gradient />
        <div style={{ flex: 1 }}>
          <D size={22} weight={700}>{trainer.name}</D>
          <T size={13} color={MO.ink3}>{trainer.tag}</T>
          <T size={12} style={{ marginTop: 4 }}>★ {trainer.rating} ({trainer.rev})</T>
        </div>
      </div>

      <Label style={{ marginBottom: 8 }}>Session type</Label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {sessions.map(s => (
          <button key={s.id} onClick={() => setSessionType(s.id)} style={{
            flex: 1, padding: 14,
            background: sessionType === s.id ? MO.accentDim : MO.surface,
            border: `1px solid ${sessionType === s.id ? MO.accent : MO.line}`,
            borderRadius: R.md, cursor: 'pointer', textAlign: 'left',
            transition: 'all 140ms',
          }}>
            <div style={{ fontFamily: MO.display, fontSize: 15, fontWeight: 600, color: MO.ink }}>{s.label}</div>
            <T size={11} color={MO.ink3} style={{ marginTop: 2 }}>{s.dur} · ${s.price}</T>
          </button>
        ))}
      </div>

      <Label style={{ marginBottom: 12 }}>Pick a time</Label>
      {daySlots.map((day, dIdx) => (
        <div key={dIdx} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <D size={15} weight={600}>{day.d}</D>
            <T size={12} color={MO.ink3}>Apr {day.dn}</T>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {day.times.map((t, tIdx) => {
              const k = `${dIdx}-${tIdx}`;
              const active = slotKey === k;
              return (
                <button key={k} onClick={() => setSlotKey(k)} style={{
                  padding: '10px 16px',
                  background: active ? MO.accent : MO.surface,
                  border: `1px solid ${active ? MO.accent : MO.line}`,
                  borderRadius: R.sm,
                  fontFamily: MO.display, fontSize: 14, fontWeight: 500,
                  color: active ? MO.accentText : MO.ink,
                  cursor: 'pointer', transition: 'all 140ms',
                }}>{t}</button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 30px',
        background: `linear-gradient(180deg, transparent, ${MO.bg} 30%)` }}>
        <Btn variant="primary" size="lg" stretch onClick={() => setConfirming(true)}>
          Confirm · {selectedTime} · ${sel.price}
        </Btn>
      </div>
    </div>
  );
}
