import { useState, useEffect } from 'react';
import { MO, Screen, TabBar } from './ds.jsx';
import Welcome from './screens/Welcome.jsx';
import Login from './screens/Login.jsx';
import { OnbGoals, OnbTarget, OnbCommit } from './screens/Onboarding.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Log from './screens/Log.jsx';
import { BookTab, BookSlot } from './screens/Book.jsx';
import Coach from './screens/Coach.jsx';

const load = () => { try { return JSON.parse(localStorage.getItem('mo_state') || '{}'); } catch { return {}; } };

export default function App() {
  const initial = load();
  const [route, setRoute] = useState(initial.route || 'welcome');
  const [tab, setTab] = useState(initial.tab || 'home');
  const [goals, setGoals] = useState(initial.goals || ['run5k']);
  const [distance, setDistance] = useState(initial.distance || 5);
  const [weeks, setWeeks] = useState(initial.weeks || 12);
  const [streak, setStreak] = useState(initial.streak ?? 17);
  const [weekDone, setWeekDone] = useState(initial.weekDone || [true, true, false, true, false, false, false]);
  const [pickedTrainer, setPickedTrainer] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem('mo_state', JSON.stringify({ route, tab, goals, distance, weeks, streak, weekDone }));
  }, [route, tab, goals, distance, weeks, streak, weekDone]);

  const go = (r) => {
    setTransitioning(true);
    setTimeout(() => { setRoute(r); setTransitioning(false); }, 160);
  };

  const renderRoute = () => {
    if (route === 'welcome')    return <Welcome onNext={() => go('onb-goals')} onLogin={() => go('login')} />;
    if (route === 'login')      return <Login onBack={() => go('welcome')} onLogin={() => { setTab('home'); go('app'); }} />;
    if (route === 'onb-goals')  return <OnbGoals selected={goals} onToggle={(id) => setGoals(g => g.includes(id) ? g.filter(x => x !== id) : g.length < 3 ? [...g, id] : g)} onNext={() => go('onb-target')} onBack={() => go('welcome')} />;
    if (route === 'onb-target') return <OnbTarget distance={distance} weeks={weeks} setDistance={setDistance} setWeeks={setWeeks} onNext={() => go('onb-commit')} onBack={() => go('onb-goals')} />;
    if (route === 'onb-commit') return <OnbCommit onDone={() => { setTab('home'); go('app'); }} onBack={() => go('onb-target')} />;

    if (route === 'trainer') {
      return (
        <Screen>
          <BookSlot trainer={pickedTrainer} onBack={() => go('app')} onConfirm={() => go('app')} />
        </Screen>
      );
    }

    if (route === 'log') {
      return (
        <Screen>
          <Log onCancel={() => go('app')} onSave={() => {
            setWeekDone(wd => { const n = [...wd]; n[0] = true; return n; });
            setStreak(s => s + 1);
            go('app');
          }} />
        </Screen>
      );
    }

    // Main app with tabs
    const content = () => {
      if (tab === 'home') return <Dashboard streak={streak} weekDone={weekDone} onLog={() => go('log')} onBook={() => setTab('book')} />;
      if (tab === 'log')  return <Log onCancel={() => setTab('home')} onSave={() => {
        setWeekDone(wd => { const n = [...wd]; n[0] = true; return n; });
        setStreak(s => s + 1); setTab('home');
      }} />;
      if (tab === 'book') return <BookTab onPickTrainer={(t) => { setPickedTrainer(t); go('trainer'); }} />;
      if (tab === 'me')   return <Coach onOpenRecovery={() => setTab('book')} onOpenTrainers={() => setTab('book')} />;
    };

    return (
      <Screen>
        {content()}
        <TabBar active={tab} onChange={setTab} />
      </Screen>
    );
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '30px 20px',
      background: `radial-gradient(1000px 600px at 20% 10%, rgba(159,188,135,0.07), transparent 60%),
        radial-gradient(800px 500px at 80% 90%, rgba(159,188,135,0.04), transparent 60%), #07070a`,
    }}>
      {/* Meta label */}
      <div style={{
        position: 'fixed', top: 24, left: 24,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'rgba(250,250,247,0.55)',
        letterSpacing: 1.4, textTransform: 'uppercase', zIndex: 10,
      }}>
        <div>
          <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: MO.accent, marginRight: 8, boxShadow: `0 0 12px ${MO.accent}`, verticalAlign: 'middle' }} />
          MOMENTUM · HI-FI
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: MO.ink, letterSpacing: -0.3, textTransform: 'none', marginTop: 4 }}>Sport Premium · Sage</div>
      </div>

      {/* Reset button */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 10 }}>
        <button onClick={() => {
          localStorage.removeItem('mo_state');
          setRoute('welcome'); setTab('home'); setGoals(['run5k']);
          setDistance(5); setWeeks(12); setStreak(17);
          setWeekDone([true, true, false, true, false, false, false]);
        }} style={{
          padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 9999, color: 'rgba(250,250,247,0.7)', fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: 0.6, cursor: 'pointer', backdropFilter: 'blur(10px)',
        }}>RESET</button>
      </div>

      {/* Phone shell */}
      <div style={{
        width: 390, height: 844, borderRadius: 54, overflow: 'hidden', position: 'relative',
        background: '#0b0b0a',
        boxShadow: '0 0 0 12px #111, 0 0 0 14px #1a1a1a, 0 60px 120px rgba(0,0,0,0.6), 0 0 80px rgba(159,188,135,0.08)',
      }}>
        {/* Dynamic island */}
        <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 42 }}>
          <div style={{
            position: 'absolute', inset: 0,
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'scale(0.98)' : 'scale(1)',
            transition: 'opacity 160ms cubic-bezier(.2,.7,.3,1), transform 160ms cubic-bezier(.2,.7,.3,1)',
          }}>
            {renderRoute()}
          </div>
        </div>
      </div>
    </div>
  );
}
