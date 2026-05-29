import React, { useState, useEffect } from 'react';
import './index.css';

// Simple SVG Icons
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  CheckSquare: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Settings: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Moon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Coffee: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/></svg>,
  Play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pause: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', time: '', badge: 'blue' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      time: newTask.time || '12:00 PM',
      completed: false,
      badge: newTask.badge,
    };
    
    setTasks([...tasks, newTaskObj]);
    setIsModalOpen(false);
    setNewTask({ title: '', time: '', badge: 'blue' });
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Defeat the False Knight', time: '10:00 AM', completed: true, badge: 'blue' },
    { id: 2, title: 'Explore City of Tears', time: '1:00 PM', completed: false, badge: 'blue' },
    { id: 3, title: 'Gather 500 Geo', time: '3:30 PM', completed: false, badge: 'orange' },
    { id: 4, title: 'Challenge Hornet', time: '5:00 PM', completed: false, badge: 'red' },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
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

  useEffect(() => {
    const updateEndOfDay = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
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
  }, []);

  useEffect(() => {
    let interval = null;
    if (isBreakActive && breakTimer > 0) {
      interval = setInterval(() => {
        setBreakTimer(prev => prev - 1);
      }, 1000);
    } else if (breakTimer === 0) {
      setIsBreakActive(false);
      setBreakTimer(30 * 60);
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

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <h1 className="title-glow" style={{ marginBottom: '0.5rem' }}>
              <Icons.Moon />
              Hallownest
            </h1>
            <h2 className="title-silksong" style={{ fontSize: '1rem', marginLeft: '2.5rem' }}>Planner</h2>
          </div>

          <nav className="nav-links">
            <a className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <Icons.Home /> Dashboard
            </a>
            <a className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
              <Icons.CheckSquare /> Tasks
            </a>
            <a className={`nav-link ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
              <Icons.Calendar /> Calendar
            </a>
            <a className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <Icons.Settings /> Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Greetings, Traveler</h2>
              <p style={{ color: 'var(--text-muted)' }}>Here is your schedule for this cycle.</p>
            </div>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
              <Icons.CheckSquare /> New Task
            </button>
          </header>

          <div className="dashboard-grid">
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
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
                    <div className="badge orange">{breaksLeft}/6 Remaining</div>
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
                    {isBreakActive ? 'Pause Timer' : 'Start Break (30m)'}
                  </button>
                </div>
              </section>
              
              {/* Mini Calendar */}
              <section className="glass-panel" style={{ padding: '1.5rem' }}>
                <div className="card-header" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                  <h3 className="card-title" style={{ fontSize: '1.1rem' }}>October 2026</h3>
                </div>
                
                <div className="calendar-grid">
                  {days.map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                  ))}
                  
                  {/* Empty slots for month start */}
                  <div className="calendar-day" style={{ opacity: 0 }}></div>
                  <div className="calendar-day" style={{ opacity: 0 }}></div>
                  <div className="calendar-day" style={{ opacity: 0 }}></div>
                  
                  {dates.map(date => (
                    <div 
                      key={date} 
                      className={`calendar-day 
                        ${date === 15 ? 'active' : ''} 
                        ${[12, 18, 22].includes(date) ? 'has-event' : ''}`
                      }
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </section>

              {/* Integrations */}
              <section className="glass-panel" style={{ padding: '1.5rem' }}>
                <div className="card-header" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                  <h3 className="card-title" style={{ fontSize: '1.1rem' }}>Integrations</h3>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{ color: '#ea4335' }}>
                    <Icons.Mail />
                  </div>
                  <div className="integration-info">
                    <div className="integration-name">Google Mail</div>
                    <div className="integration-status">Not connected</div>
                  </div>
                  <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{ color: '#4285f4' }}>
                    <Icons.Calendar />
                  </div>
                  <div className="integration-info">
                    <div className="integration-name">Google Calendar</div>
                    <div className="integration-status">Not connected</div>
                  </div>
                  <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Connect</button>
                </div>
              </section>

            </div>
          </div>
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
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g. Defeat the Radiance"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  placeholder="e.g. 10:00 AM"
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select 
                  className="form-select"
                  value={newTask.badge}
                  onChange={(e) => setNewTask({...newTask, badge: e.target.value})}
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
    </>
  );
}

export default App;
