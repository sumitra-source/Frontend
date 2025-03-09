import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMap, FiBell, FiCalendar, FiList, FiTag } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ logout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Geo Reminder App</h1>
      </div>
      <nav className="sidebar-nav">
        <NavItem icon={<FiHome />} text="My day" link="/" />
        <NavItem icon={<FiCalendar />} text="Next 7 days" link="/next7days" />
        <NavItem icon={<FiList />} text="All my tasks" link="/alltasks" />
        <NavItem icon={<FiMap />} text="Map" link="/map" />
        <NavItem icon={<FiBell />} text="Reminders" link="/reminders" />
      </nav>
      <div className="sidebar-footer">
        <h3 className="sidebar-subtitle">My lists</h3>
        <NavItem icon={<FiTag />} text="Personal" link="/personal" />
        <NavItem icon={<FiTag />} text="Work" link="/work" />
        <NavItem icon={<FiTag />} text="Grocery List" link="/grocery" />
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, text, link }) => (
  <Link to={link} className="nav-item">
    {icon} <span>{text}</span>
  </Link>
);

export default Sidebar;