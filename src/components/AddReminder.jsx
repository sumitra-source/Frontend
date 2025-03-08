import React, { useState } from 'react';

const AddReminder = ({ addReminder }) => {
  const [reminder, setReminder] = useState('');
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminder.trim()) {
      addReminder({ text: reminder, location });
      setReminder('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={reminder} 
        onChange={(e) => setReminder(e.target.value)} 
        placeholder="Add a new reminder" 
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddReminder;