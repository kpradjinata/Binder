import React from 'react';
import '../styles/UpcomingEvents.css';

const UpcomingEvents: React.FC = () => {
  const events = [
    { date: 'OCT 19', title: 'Jam', color: '#E0F2F1' },
    { date: 'OCT 24', title: 'Jam', color: '#FCE4EC' },
    { date: 'SEPT 11', title: 'Jam', color: '#E8F5E9' },
  ];

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <div className="event-date" style={{ backgroundColor: event.color }}>
            <span className="date-text">{event.date}</span>
          </div>
          <div className="event-details">
            <div className="event-title">{event.title}</div>
            <button className="add-to-calendar">Add to Calendar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;