import React from 'react';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const menuItems = ['Dashboard', 'Study Plan', 'Groups', 'Analytics', 'Content Library', 'Profile'];
  
  return (
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a href="#" className="nav-link">
                <span className="icon">🔵</span> {/* Placeholder for icons */}
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;