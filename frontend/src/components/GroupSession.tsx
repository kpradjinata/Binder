import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GroupSession.css';

const GroupSession: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinSession = () => {
    navigate('/groups');
  };

  return (
    <div className="group-session-card">
      <h3 className="session-title">Next Group Session</h3>
      <div className="session-info">
        <p className="session-name">Amoeba Growth</p>
        <p className="session-date">October 24th, 6PM</p>
      </div>
      <button className="join-session-btn" onClick={handleJoinSession}>
        Join Session
      </button>
    </div>
  );
};

export default GroupSession;
