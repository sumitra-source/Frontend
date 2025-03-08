import React from 'react';

const ReminderItem = ({ reminder, deleteReminder, snoozeReminder }) => {
  return (
    <li className="reminder-item">
      <div className="reminder-text">
        <strong>{reminder.text}</strong>
      </div>
      <div className="reminder-buttons">
        <button className="snooze-button" onClick={snoozeReminder}>
          Snooze
        </button>
        <button className="delete-button" onClick={deleteReminder}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default ReminderItem;