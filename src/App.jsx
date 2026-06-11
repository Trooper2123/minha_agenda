import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './index.css';

// Simple SVG Icons
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>,
  CheckSquare: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  Settings: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  Moon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Coffee: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" x2="6" y1="1" y2="4" /><line x1="10" x2="10" y1="1" y2="4" /><line x1="14" x2="14" y1="1" y2="4" /></svg>,
  Play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
  Pause: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
};

function App() {
  const [googleConnected, setGoogleConnected] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Google login success:', tokenResponse);
      setGoogleConnected(true);
      if (window.fetchGoogleEvents) {
        window.fetchGoogleEvents(tokenResponse.access_token);
      }
    },
    onError: error => console.error('Google login failed:', error),
    scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.readonly',
  });

  const today = new Date();
  const currentMonth = today.toLocaleString('en-US', { month: 'long' });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const currentDay = today.getDate();
  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Format YYYY-MM-DD for date input
  const todayDateString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [maxWeeklyStats, setMaxWeeklyStats] = useState({
    points: 450,
    date: '2026-05-15'
  });
  const [newTask, setNewTask] = useState({ title: '', date: todayDateString, time: '', badge: 'blue' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.date || !newTask.time) {
      alert("Please fill in all fields.");
      return;
    }

    const taskDateTime = new Date(`${newTask.date}T${newTask.time}`);
    const now = new Date();

    if (taskDateTime - now < 30 * 60 * 1000) {
      alert("A Quest não pode ser criada com menos de 30 minutos de antecedência.");
      return;
    }

    const formatTime12h = (time24) => {
      const [h, m] = time24.split(':');
      let hours = parseInt(h, 10);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${m} ${ampm}`;
    };

    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      time: formatTime12h(newTask.time),
      date: taskDateTime.getDate(),
      fullDate: newTask.date,
      completed: false,
      badge: newTask.badge,
    };

    setTasks([...tasks, newTaskObj]);
    setIsModalOpen(false);
    setNewTask({ title: '', date: todayDateString, time: '', badge: 'blue' });
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Defeat the False Knight', time: '10:00 AM', date: currentDay, completed: true, badge: 'blue' },
    { id: 2, title: 'Explore City of Tears', time: '1:00 PM', date: currentDay, completed: false, badge: 'blue' },
    { id: 3, title: 'Gather 500 Geo', time: '3:30 PM', date: (currentDay % daysInMonth) + 1, completed: false, badge: 'orange' },
    { id: 4, title: 'Challenge Hornet', time: '5:00 PM', date: ((currentDay + 2) % daysInMonth) + 1, completed: false, badge: 'red' },
  ]);

  window.fetchGoogleEvents = async (accessToken) => {
    try {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();

      const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(startOfDay)}&timeMax=${encodeURIComponent(endOfDay)}&singleEvents=true&orderBy=startTime`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (data.items) {
        const newTasks = data.items.map(event => {
          const isHighPriority = event.description?.includes('http') || event.location?.includes('http') || event.hangoutLink;
          let eventTime = 'All Day';
          let eventDate = currentDay;
          if (event.start.dateTime) {
            const dt = new Date(event.start.dateTime);
            let h = dt.getHours();
            const m = dt.getMinutes().toString().padStart(2, '0');
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            eventTime = `${h}:${m} ${ampm}`;
            eventDate = dt.getDate();
          }
          return {
            id: event.id || Date.now() + Math.random(),
            title: event.summary || 'Sem Título',
            time: eventTime,
            date: eventDate,
            fullDate: event.start.dateTime || event.start.date || todayDateString,
            completed: false,
            badge: isHighPriority ? 'red' : 'blue',
          };
        });

        setTasks(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const filteredNew = newTasks.filter(t => !existingIds.has(t.id));
          return [...prev, ...filteredNew];
        });

        alert(`Google Calendar conectado! Foram importados ${newTasks.length} eventos para hoje.`);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const BOSSES = [
    'False Knight', 'Hornet', 'Mantis Lords', 'Soul Master', 'The Hollow Knight', 'The Radiance', 'Lace'
  ];

  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [bossDamage, setBossDamage] = useState(10); // 10 points for initial completed task

  useEffect(() => {
    if (bossDamage >= 150 && currentBossIndex < BOSSES.length - 1) {
      setCurrentBossIndex(prev => prev + 1);
      setBossDamage(prev => prev - 150);
    }
  }, [bossDamage, currentBossIndex]);

  const currentBoss = BOSSES[currentBossIndex];
  const isMaxLevel = currentBossIndex === BOSSES.length - 1 && bossDamage >= 150;
  const displayDamage = isMaxLevel ? 150 : Math.min(bossDamage, 150);
  const percentage = isMaxLevel ? 100 : (displayDamage / 150) * 100;

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const isCompleting = !t.completed;
        let points = t.badge === 'red' ? 30 : t.badge === 'orange' ? 20 : 10;
        setBossDamage(prev => Math.max(0, prev + (isCompleting ? points : -points)));
        return { ...t, completed: isCompleting };
      }
      return t;
    }));
  };

  const cyclePriority = (id) => {
    const nextBadge = { blue: 'orange', orange: 'red', red: 'blue' };
    setTasks(tasks.map(t => t.id === id ? { ...t, badge: nextBadge[t.badge] } : t));
  };

  const priorityOrder = { red: 3, orange: 2, blue: 1 };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return priorityOrder[b.badge] - priorityOrder[a.badge];
  });

  const [endOfDayTime, setEndOfDayTime] = useState('');
  const [breakTimer, setBreakTimer] = useState(30 * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [breaksLeft, setBreaksLeft] = useState(6);

  // Settings
  const [defaultBreakMinutes, setDefaultBreakMinutes] = useState(30);
  const [totalBreaks, setTotalBreaks] = useState(6);
  const [endOfDayTarget, setEndOfDayTarget] = useState('23:59');

  const applySettings = () => {
    if (!isBreakActive) {
      setBreakTimer(defaultBreakMinutes * 60);
    }
    setBreaksLeft(totalBreaks);
    alert('Configurações salvas com sucesso!');
    setActiveTab('dashboard');
  };

  useEffect(() => {
    const updateEndOfDay = () => {
      const now = new Date();
      const endOfDay = new Date();
      const [hours, minutes] = endOfDayTarget.split(':');
      endOfDay.setHours(parseInt(hours, 10), parseInt(minutes, 10), 59, 999);

      const diff = endOfDay - now;
      if (diff > 0) {
        const h = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const m = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        setEndOfDayTime(`${h}:${m}:${s}`);
      } else {
        setEndOfDayTime('00:00:00');
      }
    };
    updateEndOfDay();
    const interval = setInterval(updateEndOfDay, 1000);
    return () => clearInterval(interval);
  }, [endOfDayTarget]);

  useEffect(() => {
    let interval = null;
    if (isBreakActive && breakTimer > 0) {
      interval = setInterval(() => {
        setBreakTimer(prev => prev - 1);
      }, 1000);
    } else if (breakTimer === 0) {
      setIsBreakActive(false);
      setBreakTimer(defaultBreakMinutes * 60);
    }
    return () => clearInterval(interval);
  }, [isBreakActive, breakTimer]);

  const toggleBreak = () => {
    if (!isBreakActive && breaksLeft > 0) {
      setIsBreakActive(true);
      setBreaksLeft(prev => prev - 1);
    } else if (isBreakActive) {
      setIsBreakActive(false);
    }
  };

  const formatBreakTime = () => {
    const m = Math.floor(breakTimer / 60).toString().padStart(2, '0');
    const s = (breakTimer % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>

      <div className="app-container">
        {/* Mobile Header */}
        <header className="mobile-header">
          <h1 className="title-glow" style={{ fontSize: '1.2rem', marginBottom: 0 }}>
            <Icons.Moon />
            Hallownest <span className="title-silksong" style={{ fontSize: '0.9rem', marginLeft: '0.25rem' }}>Planner</span>
          </h1>
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
            <Icons.Menu />
          </button>
        </header>

        {/* Sidebar Backdrop Overlay */}
        <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div>
              <h1 className="title-glow" style={{ marginBottom: '0.5rem' }}>
                <Icons.Moon />
                Hallownest
              </h1>
              <h2 className="title-silksong" style={{ fontSize: '1rem', marginLeft: '2.5rem' }}>Planner</h2>
            </div>
            <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
              <Icons.X />
            </button>
          </div>

          <nav className="nav-links">
            <button className="nav-link" onClick={() => { setIsTaskModalOpen(true); setIsSidebarOpen(false); }}>
              <Icons.Home /> Tasks
            </button>
            <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}>
              <Icons.CheckSquare /> Dashboard
            </button>
            <button className="nav-link" onClick={() => { setIsCalendarModalOpen(true); setIsSidebarOpen(false); }}>
              <Icons.Calendar /> Calendar
            </button>
            <button className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}>
              <Icons.Settings /> Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="page-header">
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Greetings, Traveler</h2>
              <p style={{ color: 'var(--text-muted)' }}>Here is your schedule for this cycle.</p>
            </div>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
              <Icons.CheckSquare /> New Task
            </button>
          </header>

          {activeTab === 'settings' ? (
            <div className="glass-panel settings-panel">
              <div className="card-header" style={{ marginBottom: '2rem' }}>
                <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem' }}>
                  <Icons.Settings /> Configurações
                </h3>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Tempo de Pausa (minutos)</label>
                <input type="number" className="form-input" value={defaultBreakMinutes} onChange={e => setDefaultBreakMinutes(Number(e.target.value))} min="1" max="120" style={{ fontSize: '1.1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Duração de cada "Restorative Break".</p>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Quantidade Total de Pausas</label>
                <input type="number" className="form-input" value={totalBreaks} onChange={e => setTotalBreaks(Number(e.target.value))} min="1" max="20" style={{ fontSize: '1.1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Quantas pausas você pode fazer por dia.</p>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Horário de Finalização da Missão (HH:mm)</label>
                <input type="time" className="form-input" value={endOfDayTarget} onChange={e => setEndOfDayTarget(e.target.value)} style={{ fontSize: '1.1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>O timer "End of Cycle" contará até este horário.</p>
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={applySettings} style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Salvar Alterações</button>
              </div>
            </div>
          ) : (
            <div className="dashboard-grid">
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Boss Challenge */}
                <section className="glass-panel" style={{ padding: '2rem' }}>
                  <div className="card-header">
                    <h3 className="card-title">Weekly Boss Challenge</h3>
                    <span className="badge red">Combat</span>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>Current Target</div>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', textShadow: '0 0 10px var(--accent-glow-red)' }}>
                      {isMaxLevel ? 'All Bosses Defeated!' : currentBoss}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <span>{isMaxLevel ? 'MAX' : `${displayDamage} / 150 Points`}</span>
                      <span>Level {currentBossIndex + 1}</span>
                    </div>
                    <div style={{ height: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: 'var(--accent-red)',
                        boxShadow: '0 0 10px var(--accent-glow-red)',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      Complete quests to deal damage! (High: 30 | Med: 20 | Low: 10)
                    </div>
                  </div>
                </section>

                {/* Task Board */}
                <section className="glass-panel" style={{ padding: '2rem' }}>
                  <div className="card-header">
                    <h3 className="card-title">Daily Quests</h3>
                    <span className="badge blue">Today</span>
                  </div>

                  <div>
                    {sortedTasks.map(task => (
                      <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <div className="task-checkbox" onClick={() => toggleTask(task.id)}>
                          {task.completed && <Icons.Check />}
                        </div>
                        <div className="task-content">
                          <div className="task-title">{task.title}</div>
                          <div className="task-time">
                            <Icons.Calendar /> {task.time}
                          </div>
                        </div>
                        <span
                          className={`badge ${task.badge}`}
                          onClick={() => cyclePriority(task.id)}
                          style={{ cursor: 'pointer' }}
                          title="Click to change priority"
                        >
                          {task.badge === 'red' ? 'High' : task.badge === 'orange' ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Timers Section */}
                <section className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div className="card-header" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                    <h3 className="card-title" style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icons.Clock /> Time Control
                    </h3>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>End of Cycle (Day)</div>
                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-blue)', textShadow: '0 0 10px var(--accent-glow-blue)' }}>
                      {endOfDayTime}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
                        <Icons.Coffee /> Restorative Break
                      </div>
                      <div className="badge orange">{breaksLeft}/{totalBreaks} Remaining</div>
                    </div>

                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-orange)', marginBottom: '1rem' }}>
                      {formatBreakTime()}
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={toggleBreak}
                      disabled={!isBreakActive && breaksLeft === 0}
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: (!isBreakActive && breaksLeft === 0) ? 0.5 : 1 }}
                    >
                      {isBreakActive ? <Icons.Pause /> : <Icons.Play />}
                      {isBreakActive ? 'Pause Timer' : `Start Break (${defaultBreakMinutes}m)`}
                    </button>
                  </div>
                </section>

                {/* Mini Calendar */}
                <section className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div className="card-header" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                    <h3 className="card-title" style={{ fontSize: '1.1rem' }}>{currentMonth} {currentYear}</h3>
                  </div>

                  <div className="calendar-grid">
                    {days.map((day, idx) => (
                      <div key={`${day}-${idx}`} className="calendar-day-header">{day}</div>
                    ))}

                    {emptySlots.map(slot => (
                      <div key={`mini-empty-${slot}`} className="calendar-day" style={{ opacity: 0 }}></div>
                    ))}

                    {dates.map(date => {
                      const tasksOnDate = tasks.filter(t => t.date === date);
                      return (
                        <div
                          key={date}
                          className={`calendar-day ${date === currentDay ? 'active' : ''}`}
                          style={{ position: 'relative' }}
                        >
                          {date}
                          {tasksOnDate.length > 0 && (
                            <div style={{ position: 'absolute', bottom: '2px', display: 'flex', gap: '2px' }}>
                              {tasksOnDate.slice(0, 3).map(t => (
                                <div key={t.id} style={{ width: '4px', height: '4px', borderRadius: '50%', background: `var(--accent-${t.badge})` }} />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Integrations */}
                <section className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div className="card-header" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                    <h3 className="card-title" style={{ fontSize: '1.1rem' }}>Integrations</h3>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    Para utilizar a integração com serviços Google localmente, faça um <strong style={{ color: 'var(--text-main)' }}>Fork</strong> deste projeto, crie o seu projeto no <strong style={{ color: 'var(--accent-blue)' }}>Google Cloud Console</strong> e insira o seu próprio Client ID no arquivo <code>.env</code>.
                  </div>

                  <div className="integration-card" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)' }}>
                    <div className="integration-icon" style={{ color: '#4285f4' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.85-2.22.83-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    </div>
                    <div className="integration-info">
                      <div className="integration-name">Google Services</div>
                      <div className="integration-status">{googleConnected ? 'Connected' : 'Not connected'}</div>
                    </div>
                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => loginWithGoogle()}>
                      {googleConnected ? 'Reconnect' : 'Connect'}
                    </button>
                  </div>
                </section>

              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="card-title">Create New Quest</h3>
              <button className="btn" style={{ border: 'none', padding: '0.5rem' }} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Quest Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Defeat the Radiance"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={newTask.date}
                  min={todayDateString}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  className="form-input"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-select"
                  value={newTask.badge}
                  onChange={(e) => setNewTask({ ...newTask, badge: e.target.value })}
                >
                  <option value="blue">Low (Blue)</option>
                  <option value="orange">Medium (Orange)</option>
                  <option value="red">High (Red)</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Quest</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {isCalendarModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCalendarModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icons.Calendar /> {currentMonth} {currentYear}
              </h3>
              <button className="btn" style={{ border: 'none', padding: '0.5rem' }} onClick={() => setIsCalendarModalOpen(false)}>✕</button>
            </div>

            <div className="modal-calendar-grid">
              {days.map((day, idx) => (
                <div key={`${day}-${idx}`} className="calendar-day-header" style={{ fontSize: '1rem' }}>{day}</div>
              ))}

              {emptySlots.map(slot => (
                <div key={`modal-empty-${slot}`} className="calendar-day" style={{ opacity: 0 }}></div>
              ))}

              {dates.map(date => {
                const tasksOnDate = tasks.filter(t => t.date === date);

                return (
                  <div
                    key={date}
                    className={`modal-calendar-day ${date === currentDay ? 'active' : ''}`}
                  >
                    {date}
                    {tasksOnDate.length > 0 && (
                      <div className="modal-calendar-dots">
                        {tasksOnDate.map(t => (
                          <div
                            key={t.id}
                            className="calendar-dot"
                            style={{
                              background: `var(--accent-${t.badge})`,
                              boxShadow: `0 0 5px var(--accent-glow-${t.badge})`
                            }}
                            title={t.title}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tasks / Hall of Gods Modal */}
      {isTaskModalOpen && (
        <div className="modal-overlay" onClick={() => setIsTaskModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icons.Home /> Hall of Gods
              </h3>
              <button className="btn" style={{ border: 'none', padding: '0.5rem' }} onClick={() => setIsTaskModalOpen(false)}>✕</button>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>Weekly Record</h4>
                <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', textShadow: '0 0 10px var(--accent-glow-orange)' }}>
                  {maxWeeklyStats.points} Points
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Achieved on: {new Date(maxWeeklyStats.date).toLocaleDateString()}
                </div>
              </div>

              <h4 style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>Defeated Bosses</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                {currentBossIndex === 0 && !isMaxLevel ? (
                  <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem', textAlign: 'center' }}>No bosses defeated yet. Keep fighting!</div>
                ) : (
                  BOSSES.slice(0, isMaxLevel ? BOSSES.length : currentBossIndex).map((boss, idx) => (
                    <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{boss}</span>
                      <span className="badge blue">Defeated</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
