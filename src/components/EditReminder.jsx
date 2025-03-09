import React, { useState } from 'react';

const EditReminder = ({ reminder, index, updateReminder, cancelEdit }) => {
  const [newText, setNewText] = useState(reminder.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReminder(index, newText);
  };

  return (
    <div className="edit-reminder">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          required
        />
        <button type="submit">Update</button>
        <button type="button" onClick={cancelEdit}>Cancel</button>
      </form>
    </div>
  );
};

export default EditReminder;