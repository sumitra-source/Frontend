import React from 'react';
import { FiCheck } from 'react-icons/fi';
import './Reminders.css';

const Reminders = ({ reminders, deleteReminder, startEditing }) => {
  return (
    <div className="reminders-container">
      <h3 className="section-title">All Reminders</h3>
      {reminders.map((reminder, index) => (
        <div key={index} className="reminder-item">
          <div className="reminder-text">
            <span>{reminder.text}</span>
            {reminder.position && (
              <span className="reminder-location">
                ({reminder.position.lat.toFixed(2)}, {reminder.position.lng.toFixed(2)})
              </span>
            )}
            <span className="reminder-datetime">
              {reminder.date} {reminder.time}
            </span>
          </div>
          <div className="reminder-actions">
            <button className="complete-button" onClick={() => deleteReminder(index)}>
              <FiCheck /> Complete
            </button>
            <button className="edit-button" onClick={() => startEditing(index)}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reminders;