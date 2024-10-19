import React from 'react';
import '../styles/UpcomingEvents.css';

const UpcomingEvents: React.FC = () => {
  const events = [
    { date: 'OCT 19', title: 'Wallahi', color: 'lightblue' },
    { date: 'OCT 24', title: 'Wallahi', color: 'lightpink' },
    { date: 'SEPT 11', title: 'Wallahi', color: 'lightgreen' },
  ];

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <div className="event-date" style={{ backgroundColor: event.color }}>{event.date}</div>
          <div className="event-title">{event.title}</div>
          <button className="add-to-calendar">Add to Calendar</button>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;