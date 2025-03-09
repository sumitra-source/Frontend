import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Map from './pages/Map';
import Reminders from './pages/Reminders';
import EditReminder from './components/EditReminder';
import Login from './components/Login';
import Signup from './components/Signup';
import Next7Days from './pages/Next7Days';
import AllTasks from './pages/AllTasks';
import Personal from './pages/Personal';
import Work from './pages/Work';
import Grocery from './pages/Grocery';

function App() {
  const [reminders, setReminders] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const deleteReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const snoozeReminder = (index) => {
    const snoozedReminder = reminders[index];
    setReminders(reminders.filter((_, i) => i !== index).concat(snoozedReminder));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const updateReminder = (index, newText) => {
    const updatedReminders = reminders.map((reminder, i) =>
      i === index ? { ...reminder, text: newText } : reminder
    );
    setReminders(updatedReminders);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <Sidebar logout={logout} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home reminders={reminders} addReminder={addReminder} deleteReminder={deleteReminder} snoozeReminder={snoozeReminder} startEditing={startEditing} user={user} logout={logout} />} />
                <Route path="/map" element={<Map reminders={reminders} snoozeReminder={snoozeReminder} deleteReminder={deleteReminder} />} />
                <Route path="/reminders" element={<Reminders reminders={reminders} addReminder={addReminder} deleteReminder={deleteReminder} snoozeReminder={snoozeReminder} startEditing={startEditing} />} />
                <Route path="/next7days" element={<Next7Days />} />
                <Route path="/alltasks" element={<AllTasks />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/work" element={<Work />} />
                <Route path="/grocery" element={<Grocery />} />
              </Routes>
              {editingIndex !== null && (
                <EditReminder
                  reminder={reminders[editingIndex]}
                  index={editingIndex}
                  updateReminder={updateReminder}
                  cancelEdit={cancelEdit}
                />
              )}
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;