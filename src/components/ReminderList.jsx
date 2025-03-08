import React from 'react';
import ReminderItem from './ReminderItem';

const ReminderList = ({ reminders, deleteReminder, snoozeReminder }) => {
  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <ReminderItem 
            key={index} 
            reminder={reminder} 
            deleteReminder={() => deleteReminder(index)} 
            snoozeReminder={() => snoozeReminder(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;