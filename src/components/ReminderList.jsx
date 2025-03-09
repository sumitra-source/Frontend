import React from 'react';

const ReminderList = ({ reminders, deleteReminder, snoozeReminder, startEditing }) => {
  return (
    <ul>
      {reminders.map((reminder, index) => (
        <li key={index}>
          <div className="reminder-text">{reminder.text}</div>
          <div className="reminder-buttons">
            <button className="snooze-button" onClick={() => snoozeReminder(index)}>
              Snooze
            </button>
            <button className="delete-button" onClick={() => deleteReminder(index)}>
              Delete
            </button>
            <button className="edit-button" onClick={() => startEditing(index)}>
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;