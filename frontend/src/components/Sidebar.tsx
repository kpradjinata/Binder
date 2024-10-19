// import React from "react";
import { DashboardIcon, ReaderIcon, Share1Icon, BarChartIcon, ArchiveIcon, AvatarIcon } from "@radix-ui/react-icons"

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Study Plan', icon: <ReaderIcon/> },
    { name: 'Groups', icon: <Share1Icon /> },
    { name: 'Analytics', icon: <BarChartIcon /> },
    { name: 'Content Library', icon: <ArchiveIcon /> },
    { name: 'Profile', icon: <AvatarIcon /> }
  ];

  const sidebarStyle: React.CSSProperties = {
    width: '250px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '20px',
    height: '100vh',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000
  };

  return (
    <div style={sidebarStyle}>
      {menuItems.map((item, index) => (
        <div key={index} style={{
          padding: '12px',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background-color 0.3s',
        }}>
          <span style={{ marginRight: '12px', fontSize: '20px' }}>{item.icon}</span>
          <span style={{ fontSize: '16px' }}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};


const Sidebar = () => {
  const menuItems = ['Dashboard', 'Study Plan', 'Groups', 'Analytics', 'Content Library', 'Profile'];
  
  return (
    <div style={{
      width: '250px',
      backgroundColor: 'black',
      color: 'white',
      padding: '20px',
    }}>
      {menuItems.map((item, index) => (
        <div key={index} style={{
          padding: '10px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ marginRight: '10px' }}>🔵</span> {/* Placeholder for icons */}
          {item}
        </div>
      ))}
    </div>
  );
};


export default Sidebar;