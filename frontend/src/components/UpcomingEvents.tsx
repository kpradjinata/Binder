import React, { useState } from 'react';
import '../styles/UpcomingEvents.css';
import EventDetailsPopup from './EventDetailsPopup';

interface Event {
  date: string;
  title: string;
  color: string;
  description?: string;
}

const UpcomingEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    { date: 'OCT 19', title: 'Jam', color: '#E0F2F1', description: 'Music jam session' },
    { date: 'OCT 24', title: 'Jam', color: '#FCE4EC', description: 'Another jam event' },
    { date: 'SEPT 11', title: 'Jam', color: '#E8F5E9', description: 'End of summer jam' },
  ];
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      {events.map((event, index) => (
        <div key={index} className="event-item" onClick={() => handleEventClick(event)}>
          <div className="event-date" style={{ backgroundColor: event.color }}>
            <span className="date-text">{event.date}</span>
          </div>
          <div className="event-details">
            <div className="event-title">{event.title}</div>
            <button className="add-to-calendar">Add to Calendar</button>
          </div>
        </div>
      ))}
      {selectedEvent && (
        <EventDetailsPopup event={selectedEvent} onClose={closePopup} />
      )}
    </div>
  );
};

export default UpcomingEvents;