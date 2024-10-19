// import React from "react";

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