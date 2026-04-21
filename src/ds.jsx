// Momentum design system tokens + base components

export const MO = {
  bg:       '#0b0b0a',
  surface:  '#17171a',
  surface2: '#1f1f23',
  paper:    '#f5f4f1',
  line:     'rgba(255,255,255,0.08)',
  lineStrong: 'rgba(255,255,255,0.14)',
  ink:      '#fafaf7',
  ink2:     'rgba(250,250,247,0.72)',
  ink3:     'rgba(250,250,247,0.5)',
  ink4:     'rgba(250,250,247,0.32)',
  accent:   '#9fbc87',
  accentHi: '#b6d39d',
  accentDim:'rgba(159,188,135,0.18)',
  accentText:'#0b0b0a',
  warn:     '#e7a86a',
  err:      '#e87070',
  ok:       '#9fbc87',
  display: '"Inter", system-ui, sans-serif',
  text:    '"Inter", system-ui, sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
};

export const R = { xs: 6, sm: 10, md: 14, lg: 20, xl: 28, pill: 9999 };

export function N({ children, size = 16, weight = 500, color, style = {} }) {
  return <span style={{
    fontFamily: MO.display, fontSize: size, fontWeight: weight,
    fontVariantNumeric: 'tabular-nums lining-nums',
    color: color || MO.ink, letterSpacing: size > 40 ? -1.2 : -0.2,
    ...style,
  }}>{children}</span>;
}

export function D({ children, size = 28, weight = 600, color, style = {}, as: Tag = 'div' }) {
  return <Tag style={{
    fontFamily: MO.display, fontSize: size, fontWeight: weight,
    letterSpacing: size > 40 ? -1.6 : size > 24 ? -0.8 : -0.4,
    lineHeight: 1.05, color: color || MO.ink, ...style,
  }}>{children}</Tag>;
}

export function T({ children, size = 14, weight = 400, color, style = {}, as: Tag = 'div' }) {
  return <Tag style={{
    fontFamily: MO.text, fontSize: size, fontWeight: weight,
    lineHeight: 1.4, color: color || MO.ink2, letterSpacing: -0.1, ...style,
  }}>{children}</Tag>;
}

export function Label({ children, size = 10, color, style = {} }) {
  return <div style={{
    fontFamily: MO.mono, fontSize: size, textTransform: 'uppercase',
    letterSpacing: 1.4, color: color || MO.ink3, ...style,
  }}>{children}</div>;
}

export function Btn({ children, variant = 'primary', size = 'md', onClick, style = {}, disabled, icon, stretch }) {
  const pads = { sm: '8px 14px', md: '13px 20px', lg: '16px 26px' };
  const fsz = { sm: 13, md: 15, lg: 17 };
  const bg = { primary: MO.accent, ghost: 'transparent', dark: MO.surface2, outline: 'transparent' }[variant];
  const color = { primary: MO.accentText, ghost: MO.ink, dark: MO.ink, outline: MO.ink }[variant];
  const border = {
    primary: 'none', ghost: 'none',
    dark: `1px solid ${MO.line}`, outline: `1px solid ${MO.lineStrong}`,
  }[variant];
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: pads[size], borderRadius: R.pill,
        background: bg, color, border,
        fontFamily: MO.text, fontSize: fsz[size], fontWeight: 600, letterSpacing: -0.1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        width: stretch ? '100%' : undefined,
        transition: 'transform 120ms cubic-bezier(.2,.7,.3,1), background 120ms',
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {icon}{children}
    </button>
  );
}

export function Card({ children, style = {}, raised, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: raised ? MO.surface2 : MO.surface,
      borderRadius: R.lg,
      border: `1px solid ${MO.line}`,
      padding: 18,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 160ms, border-color 160ms',
      ...style,
    }}>{children}</div>
  );
}

export function Chip({ children, active, onClick, icon, size = 'md' }) {
  const pad = size === 'sm' ? '6px 12px' : '9px 15px';
  const fs = size === 'sm' ? 13 : 14;
  return (
    <button onClick={onClick} style={{
      padding: pad, borderRadius: R.pill,
      background: active ? MO.accent : 'transparent',
      color: active ? MO.accentText : MO.ink,
      border: active ? 'none' : `1px solid ${MO.lineStrong}`,
      fontFamily: MO.text, fontSize: fs, fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      transition: 'all 140ms',
    }}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </button>
  );
}

const ICON_PATHS = {
  home: 'M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2V10z',
  plus: 'M12 5v14M5 12h14',
  flame: 'M12 2c0 4-3 6-3 10a6 6 0 0012 0c0-3-2-4-3-6 0 2-1 3-2 3-2 0-1-3-1-5 0-1-1-2-3-2z',
  run: 'M13 4a2 2 0 100 4 2 2 0 000-4zM10 21l2-6-3-3 2-4 3 3h3M14 12l2 4 3-1',
  calendar: 'M3 7h18M8 3v4M16 3v4M5 7v13a1 1 0 001 1h12a1 1 0 001-1V7',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-7 8-7s8 3 8 7',
  bell: 'M12 3a6 6 0 016 6v4l2 3H4l2-3V9a6 6 0 016-6zM10 20a2 2 0 004 0',
  chevron: 'M9 6l6 6-6 6',
  chevronL: 'M15 6l-6 6 6 6',
  check: 'M4 12l6 6L20 6',
  close: 'M6 6l12 12M18 6l-12 12',
  star: 'M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2L6.1 21l1.2-6.6L2.5 9.9 9.1 9 12 3z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  heart: 'M12 21s-8-5-8-11a5 5 0 018-4 5 5 0 018 4c0 6-8 11-8 11z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12l2 1.5-1.5 2.5-2.5-1 .5 3h-3l-.5-3-2.5 1L10 13.5 12 12l-2-1.5L11.5 8l2.5 1-.5-3h3l.5 3 2.5-1L21 10.5 19 12z',
  trend: 'M3 17l6-6 4 4 8-8',
  target: 'M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0M12 12m-5 0a5 5 0 1010 0 5 5 0 10-10 0M12 12m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0',
  moon: 'M21 13a9 9 0 11-10-10 7 7 0 0010 10z',
  spark: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z',
  dumbbell: 'M6.5 6.5l11 11M4 9l2-2 5 5-2 2zM13 15l5 5 2-2-5-5z',
  yoga: 'M12 4a2 2 0 100 4 2 2 0 000-4zM12 9l-3 6M12 9l3 6M9 15h6M4 20h16',
  utensils: 'M5 2v7a2 2 0 002 2v11M7 2v9M17 2a4 4 0 00-4 4v4a2 2 0 002 2v10',
  sparkle: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
  google: 'M21 12c0-1-.1-1.9-.3-2.8H12v5.3h5.1a4.4 4.4 0 01-1.9 2.9v2.4h3c1.8-1.6 2.8-4 2.8-7.8z M12 22c2.7 0 5-.9 6.6-2.4l-3-2.4a6.7 6.7 0 01-10-3.5H2.4v2.5A10 10 0 0012 22z M5.6 13.7a6 6 0 010-3.4V7.8H2.4a10 10 0 000 8.4l3.2-2.5z M12 5.4a5.4 5.4 0 013.8 1.5l2.9-2.9A9.6 9.6 0 0012 2 10 10 0 002.4 7.8l3.2 2.5A6 6 0 0112 5.4z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z',
  'eye-off': 'M17.9 17.9A10 10 0 0112 20c-7 0-11-8-11-8a18 18 0 015.1-5.9M9.9 4.2A9.8 9.8 0 0112 4c7 0 11 8 11 8a18 18 0 01-2.1 3.1M1 1l22 22',
};

export function Icon({ name, size = 22, color, stroke = 1.6 }) {
  const c = color || 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d={ICON_PATHS[name] || ICON_PATHS.star} />
    </svg>
  );
}

export function Bar({ pct, height = 6, color, bg }) {
  return (
    <div style={{ width: '100%', height, background: bg || MO.line, borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{
        width: `${Math.max(0, Math.min(100, pct))}%`, height: '100%',
        background: color || MO.accent, borderRadius: height / 2,
        transition: 'width 600ms cubic-bezier(.2,.7,.3,1)',
      }} />
    </div>
  );
}

export function Ring({ pct = 50, size = 88, stroke = 6, color, trackColor, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor || MO.line} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color || MO.accent} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(.2,.7,.3,1)' }} />
      </svg>
      {children && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function StatusBar({ dark = true }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54, zIndex: 10,
      padding: '17px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{ fontFamily: MO.display, fontSize: 16, fontWeight: 600, color: c }}>9:41</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="10" viewBox="0 0 17 10">
          <path d="M1 9h2v-2H1zM5 9h2v-4H5zM9 9h2v-6H9zM13 9h2v-8h-2z" fill={c} />
        </svg>
        <svg width="15" height="10" viewBox="0 0 15 10">
          <path d="M7.5 2.5a5 5 0 015 5l-1.4.1a3.6 3.6 0 00-3.6-3.6 3.6 3.6 0 00-3.6 3.6L2.5 7.5a5 5 0 015-5z" fill={c} />
          <circle cx="7.5" cy="8" r="1.2" fill={c} />
        </svg>
        <div style={{ width: 24, height: 11, border: `1px solid ${c}`, borderRadius: 3, position: 'relative', opacity: 0.5 }}>
          <div style={{ position: 'absolute', inset: 1.5, width: 15, background: c, borderRadius: 1.5 }} />
        </div>
      </div>
    </div>
  );
}

export function HomeIndicator({ dark = true }) {
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 60,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{ width: 136, height: 5, borderRadius: 100, background: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.3)' }} />
    </div>
  );
}

export function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Today', icon: 'home' },
    { id: 'log',  label: 'Log',   icon: 'plus' },
    { id: 'book', label: 'Book',  icon: 'calendar' },
    { id: 'me',   label: 'Coach', icon: 'sparkle' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: 'rgba(11,11,10,0.82)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderTop: `1px solid ${MO.line}`,
      padding: '8px 8px 24px',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          padding: '8px 4px', border: 'none', background: 'transparent', cursor: 'pointer',
        }}>
          <Icon name={t.icon} size={22} color={active === t.id ? MO.accent : MO.ink3} />
          <div style={{ fontFamily: MO.text, fontSize: 10, fontWeight: 500, letterSpacing: 0.2, color: active === t.id ? MO.accent : MO.ink3 }}>
            {t.label}
          </div>
        </button>
      ))}
    </div>
  );
}

export function Screen({ children, style = {}, scroll = true, dark = true }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: dark ? MO.bg : MO.paper,
      position: 'relative', overflow: 'hidden',
      fontFamily: MO.text,
      color: dark ? MO.ink : '#111',
      ...style,
    }}>
      <StatusBar dark={dark} />
      <div
        className="mo-scroll"
        style={{
          position: 'absolute', top: 54, bottom: 0, left: 0, right: 0,
          overflowY: scroll ? 'auto' : 'hidden',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </div>
      <HomeIndicator dark={dark} />
    </div>
  );
}

export function Div({ m = 16 }) {
  return <div style={{ height: 1, background: MO.line, margin: `${m}px 0` }} />;
}
