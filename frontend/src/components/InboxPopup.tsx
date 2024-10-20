import React, { useState } from 'react';
import '../styles/InboxPopup.css';
import { EnvelopeClosedIcon, Pencil2Icon } from '@radix-ui/react-icons';

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: string;
}

const InboxPopup: React.FC = () => {
  const [showInboxPopup, setShowInboxPopup] = useState(false);
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', from: 'John Doe', subject: 'Project Update', content: 'The project is progressing well. We\'ll have a meeting tomorrow to discuss the next steps.', timestamp: '2024-10-20 09:30' },
    { id: '2', from: 'Jane Smith', subject: 'Lunch Invitation', content: 'Would you like to grab lunch together this week? Let me know your availability.', timestamp: '2024-10-19 14:15' },
  ]);

  const [newMessage, setNewMessage] = useState({ from: '', subject: '', content: '' });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleInboxClick = () => setShowInboxPopup(true);
  const handleCloseInbox = () => {
    setShowInboxPopup(false);
    setShowComposeForm(false);
    setSelectedMessage(null);
  };

  const handleComposeClick = () => setShowComposeForm(true);
  const handleCancelCompose = () => setShowComposeForm(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSendMessage = () => {
    if (newMessage.from && newMessage.subject && newMessage.content) {
      const timestamp = new Date().toLocaleString();
      setMessages([{ ...newMessage, id: (messages.length + 1).toString(), timestamp }, ...messages]);
      setNewMessage({ from: '', subject: '', content: '' });
      setShowComposeForm(false);
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
  };

  return (
    <>
      <button onClick={handleInboxClick} className="inbox-button">
        <EnvelopeClosedIcon /> Inbox
      </button>
      {showInboxPopup && (
        <div className="inbox-popup-overlay">
          <div className="inbox-popup">
            <h2>Inbox</h2>
            <button onClick={handleComposeClick} className="compose-button"><Pencil2Icon /> Compose</button>
            {!showComposeForm ? (
              <div className="message-container">
                <div className="message-list">
                  {messages.map(message => (
                    <div key={message.id} className="message-item" onClick={() => handleMessageClick(message)}>
                      <span className="message-from">{message.from}</span>
                      <span className="message-subject">{message.subject}</span>
                      <span className="message-timestamp">{message.timestamp}</span>
                    </div>
                  ))}
                </div>
                {selectedMessage && (
                  <div className="message-content">
                    <h3>{selectedMessage.subject}</h3>
                    <p className="message-sender">From: {selectedMessage.from}</p>
                    <p className="message-time">Sent: {selectedMessage.timestamp}</p>
                    <p className="message-body">{selectedMessage.content}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="compose-form">
                <input
                  type="text"
                  name="from"
                  placeholder="To"
                  value={newMessage.from}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={newMessage.subject}
                  onChange={handleInputChange}
                />
                <textarea
                  name="content"
                  placeholder="Message"
                  value={newMessage.content}
                  onChange={handleInputChange}
                />
                <div className="compose-actions">
                  <button onClick={handleSendMessage}>Send</button>
                  <button onClick={handleCancelCompose}>Cancel</button>
                </div>
              </div>
            )}
            <button onClick={handleCloseInbox} className="close-button">×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default InboxPopup;