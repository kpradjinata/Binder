import React from 'react';
interface Event {
  date: string;
  title: string;
  color: string;
  description?: string;
  year?: number;
}

interface EventDetailsPopupProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({ event, onClose }) => {
    
    return (
    <div className="event-popup-overlay">
        <div className="event-popup-content">
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Description:</strong> {event.description || 'No description available.'}</p>
        <button onClick={onClose}>Close</button>
        </div>
    </div>
    );
};
    

export default EventDetailsPopup;