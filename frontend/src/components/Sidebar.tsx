import React from "react";
import { DashboardIcon, ReaderIcon, Share1Icon, BarChartIcon, ArchiveIcon, AvatarIcon } from "@radix-ui/react-icons";
import '../styles/Sidebar.css'; 

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Study Plan', icon: <ReaderIcon/> },
    { name: 'Groups', icon: <Share1Icon /> },
    { name: 'Analytics', icon: <BarChartIcon /> },
    { name: 'Content Library', icon: <ArchiveIcon /> },
    { name: 'Profile', icon: <AvatarIcon /> }
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item">
          <span className="menu-item-icon">{item.icon}</span>
          <span className="menu-item-text">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;