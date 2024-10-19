import React from "react";
import { NavLink } from "react-router-dom";
import { DashboardIcon, ReaderIcon, Share1Icon, BarChartIcon, ArchiveIcon, AvatarIcon } from "@radix-ui/react-icons";
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { name: 'Study Plan', icon: <ReaderIcon/>, path: '/study-plan' },
    { name: 'Groups', icon: <Share1Icon />, path: '/groups' },
    { name: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
    { name: 'Content Library', icon: <ArchiveIcon />, path: '/content-library' },
    { name: 'Profile', icon: <AvatarIcon />, path: '/profile' }
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <NavLink 
          key={index} 
          to={item.path} 
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="menu-item-icon">{item.icon}</span>
          <span className="menu-item-text">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;