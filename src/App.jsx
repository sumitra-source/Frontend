import { useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import AddReminder from './components/AddReminder';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [reminders, setReminders] = useState([]);

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

  return (
    <div className="App">
      <h1>Geo Reminder App</h1>
      <div className="icon-bar">
        <button className="icon-button">
          <i className="fas fa-plus"></i>
        </button>
        <button className="icon-button">
          <i className="fas fa-map-marker-alt"></i>
        </button>
      </div>
      <AddReminder addReminder={addReminder} />
      <MapContainer center={[51.505, -0.09]} zoom={13} id="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {reminders.map((reminder, index) => (
          <Marker key={index} position={[reminder.location.lat, reminder.location.lng]}>
            <Popup>
              {reminder.text}
              <br />
              <button className="snooze-button" onClick={() => snoozeReminder(index)}>
                Snooze
              </button>
              <button className="delete-button" onClick={() => deleteReminder(index)}>
                Delete
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <ReminderList reminders={reminders} deleteReminder={deleteReminder} snoozeReminder={snoozeReminder} />
    </div>
  );
}

export default App;