import React, { useState } from 'react';
import '../styles/UpcomingEvents.css';
import EventDetailsPopup from './EventDetailsPopup';

interface Event {
  date: string;
  title: string;
  color: string;
  description?: string;
  year?: number;
}

const UpcomingEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    { date: 'SEPT 13', title: 'English Essay Peer Review', color: '#E8F5E9', description: 'Thesis Statement Evaluation and Argument Development', year: 2024 },
    { date: 'OCT 19', title: 'Physics Waves and Electromagnetism Study Session', color: '#E0F2F1', description: 'Wave Properties and Electric Fields', year: 2024 },
    { date: 'OCT 24', title: 'CS-170 Efficient Algorithms Zoom Study Meet Up', color: '#FCE4EC', description: 'Algorithm Design Paradigms, Complexity Analysis, and Graph Algorithms', year: 2024 },
  ];

  const createGoogleCalendarUrl = (event: Event) => {
    const { date, title, year } = event;
    const [month, day] = date.split(' ');
    const startDate = new Date(`${month} ${day}, ${year || new Date().getFullYear()}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Assuming 1-hour event

    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

    const url = new URL('https://www.google.com/calendar/render?action=TEMPLATE');
    url.searchParams.append('text', title);
    url.searchParams.append('dates', `${formatDate(startDate)}/${formatDate(endDate)}`);
    url.searchParams.append('details', 'Event added from your app');

    return url.toString();
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  const handleAddToCalendar = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    const calendarUrl = createGoogleCalendarUrl(event);
    window.open(calendarUrl, '_blank');
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
            <button
              className="add-to-calendar"
              onClick={(e) => handleAddToCalendar(e, event)}
            >
              Add to Calendar
            </button>
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