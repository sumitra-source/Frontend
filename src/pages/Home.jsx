import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiHome, FiMap, FiBell, FiUser, FiPlus, FiCheck, FiEdit, FiSave } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';

export default function Home({ reminders, addReminder, deleteReminder, snoozeReminder, startEditing, user, logout }) {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [editingTime, setEditingTime] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://qapi.vercel.app/api/quotes');
        const randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setError('Failed to fetch quote');
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderDate = new Date(`${reminder.date}T${reminder.time}`);
        if (now >= reminderDate && now <= new Date(reminderDate.getTime() + 60000)) {
          playSound();
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const playSound = () => {
    const audio = new Audio('/reminder.mp3');
    audio.play();
  };

  const handleAddTask = () => {
    if (newTask.trim() && newDate.trim() && newTime.trim()) {
      addReminder({ text: newTask, date: newDate, time: newTime });
      setNewTask('');
      setNewDate('');
      setNewTime('');
    }
  };

  const handleEditTask = (index) => {
    const reminder = reminders[index];
    setEditingIndex(index);
    setEditingTask(reminder.text);
    setEditingDate(reminder.date);
    setEditingTime(reminder.time);
  };

  const handleSaveTask = (index) => {
    if (editingTask.trim() && editingDate.trim() && editingTime.trim()) {
      startEditing(index, { text: editingTask, date: editingDate, time: editingTime });
      setEditingIndex(null);
      setEditingTask('');
      setEditingDate('');
      setEditingTime('');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "w-64" : "w-20"}`}>
        <h1 className="sidebar-title">Geo Reminder App</h1>
        <nav className="sidebar-nav">
          <NavItem icon={<FiHome />} text="Home" link="/" />
          <NavItem icon={<FiMap />} text="Map" link="/map" />
          <NavItem icon={<FiBell />} text="Reminders" link="/reminders" />
        </nav>
        <button className="logout-button" onClick={logout}>Logout</button>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2 className="header-title">Hello!😊</h2>
          <p className="header-subtitle">Here's your reminder!</p>
          <button className="profile-button">
            <i className="fa fa-user"></i>
          </button>
        </header>

        <section className="categories-section">
          <h3 className="section-title">Categories</h3>
          <div className="categories">
            <CategoryCard title="📌 Personal" link="/personal" />
            <CategoryCard title="💼 Work" link="/work" />
          </div>
        </section>

        <section className="tasks-section">
          <h3 className="section-title">All Tasks</h3>
          {reminders.map((reminder, index) => (
            <TaskItem
              key={index}
              title={reminder.text}
              onComplete={() => deleteReminder(index)}
              onEdit={() => handleEditTask(index)}
              onSave={() => handleSaveTask(index)}
              isEditing={editingIndex === index}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              editingDate={editingDate}
              setEditingDate={setEditingDate}
              editingTime={editingTime}
              setEditingTime={setEditingTime}
              position={reminder.position}
              date={reminder.date}
              time={reminder.time}
            />
          ))}
          <div className="add-task-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new reminder"
              className="add-task-input"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="add-task-input"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="add-task-input"
            />
            <button className="add-task-button" onClick={handleAddTask}>
              <FiPlus /> Add Reminder
            </button>
          </div>
        </section>

        <section className="quote-section">
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            quote ? (
              <blockquote className="quote">
                "{quote.quote}" - {quote.author}
              </blockquote>
            ) : (
              <p>Loading quote...</p>
            )
          )}
        </section>
      </div>
    </div>
  );
}

// Reusable Components
const NavItem = ({ icon, text, link }) => (
  <Link to={link} className="nav-item">
    {icon} <span>{text}</span>
  </Link>
);

const CategoryCard = ({ title, link }) => {
  const navigate = useNavigate();

  return (
    <div className="category-card" onClick={() => navigate(link)}>
      {title}
    </div>
  );
};

const TaskItem = ({ title, onComplete, onEdit, onSave, isEditing, editingTask, setEditingTask, editingDate, setEditingDate, editingTime, setEditingTime, position, date, time }) => (
  <div className="task-item">
    {isEditing ? (
      <>
        <input
          type="text"
          value={editingTask}
          onChange={(e) => setEditingTask(e.target.value)}
          className="edit-task-input"
        />
        <input
          type="date"
          value={editingDate}
          onChange={(e) => setEditingDate(e.target.value)}
          className="edit-task-input"
        />
        <input
          type="time"
          value={editingTime}
          onChange={(e) => setEditingTime(e.target.value)}
          className="edit-task-input"
        />
        <button className="save-button" onClick={onSave}>
          <FiSave /> Save
        </button>
      </>
    ) : (
      <>
        <span>{title}</span>
        {position && (
          <span className="task-location">
            ({position.lat.toFixed(2)}, {position.lng.toFixed(2)})
          </span>
        )}
        <span className="task-datetime">
          {date} {time}
        </span>
        <div className="task-actions">
          <button className="complete-button" onClick={onComplete}>
            <FiCheck /> Complete
          </button>
          <button className="edit-button" onClick={onEdit}>
            <FiEdit /> Edit
          </button>
        </div>
      </>
    )}
  </div>
);