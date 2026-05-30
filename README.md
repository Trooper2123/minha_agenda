# Hallownest Planner

**Hallownest Planner** is an immersive, aesthetic task manager and personal organizer inspired by the dark, beautifully crafted universe of *Hollow Knight* and *Silksong*. Built with React and Vite, the application utilizes deep dark color palettes, glassmorphic UI elements, glowing neon accents, and thematic fonts to create an engaging productivity experience.

## ✨ Features Overview

### 🎮 Gamified Productivity (Weekly Boss Challenge)
Turn your to-do list into a boss rush! 
* **Points System:** Tasks are categorized by priority (Low = 10 pts, Medium = 20 pts, High = 30 pts).
* **Boss Progression:** Checking off quests deals "damage" to the current boss. Accumulate 150 points to defeat the boss and advance to the next level. Once defeated, a boss cannot be downgraded!
* **Hall of Gods:** A dedicated dashboard modal that showcases your Weekly Record (maximum points obtained) and a complete roster of all bosses you've successfully defeated.

### 📝 Dynamic Task Management (Quests)
Manage your day like a true adventurer.
* **Quest Creation:** A dedicated modal allows you to schedule new tasks.
* **Smart Validation:** The planner prevents you from creating tasks less than 30 minutes in the future, ensuring your schedule remains realistic.
* **Priorities:** Cycle through visual priority badges that dictate the importance of the task and its damage output.

### 📅 Interactive Calendar
Keep track of your cycle seamlessly.
* **Dynamic Generation:** The calendar automatically generates the accurate grid for the current month and year.
* **Visual Indicators:** Glowing dots matching task priorities automatically appear on days that contain scheduled quests, giving you a quick bird's-eye view of your workload.
* **Mini & Modal Views:** Accessible via the dashboard's quick view or a comprehensive, dedicated calendar modal.

### ⏳ Time Control
* **Cycle Countdown:** A real-time tracker displaying the exact time remaining until the end of the day.
* **Restorative Breaks:** A built-in 30-minute Pomodoro-style timer to ensure you rest between intense productivity sessions (limited to 6 breaks per day).

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   cd minha_agenda
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`.

## 🛠️ Tech Stack
* **Framework:** React 19 + Vite
* **Styling:** Vanilla CSS (Glassmorphism, CSS Variables, Flexbox/CSS Grid)
* **Icons:** Inline SVG representations
* **Fonts:** Cinzel (Headers) & Outfit (Body text) via Google Fonts

## 🔮 Future Roadmap
* **Persistent Storage:** Integrating `localStorage` or a backend to persist tasks, points, and defeated bosses across sessions.
* **Integrations:** OAuth2 connections to Google Calendar and Gmail to automatically import external events as Quests.
