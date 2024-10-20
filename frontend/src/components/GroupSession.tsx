import React from 'react';
import '../styles/GroupSession.css';

const GroupSession: React.FC = () => {
  return (
    <div className="group-session-card">
      <h3 className="session-title">Next Group Session</h3>
      <div className="session-info">
        <p className="session-name">Amoeba Growth</p>
        <p className="session-date">June 24th, 6PM</p>
      </div>
    </div>
  );
};

export default GroupSession;