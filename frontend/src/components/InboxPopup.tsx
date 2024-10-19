import React, { useState } from 'react';
import '../styles/InboxPopup.css';

interface Invitation {
  id: string;
  from: string;
  subject: string;
  content: string;
}

const InboxPopup: React.FC = () => {
  const [showInboxPopup, setShowInboxPopup] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: '1', from: 'John Doe', subject: 'Study Group Invitation', content: 'Would you like to join our study group?' },
    { id: '2', from: 'Jane Smith', subject: 'Project Collaboration', content: 'Interested in joining the project team?' },
  ]);

  const handleInboxClick = () => setShowInboxPopup(true);
  const handleCloseInbox = () => setShowInboxPopup(false);

  const handleAcceptInvitation = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const handleDeclineInvitation = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  return (
    <>
      <button onClick={handleInboxClick} className="inbox-button">Open Inbox</button>
      {showInboxPopup && (
        <div className="inbox-popup-overlay">
          <div className="inbox-popup">
            <h2>Inbox</h2>
            <div className="invitation-list">
              {invitations.map(invitation => (
                <div key={invitation.id} className="invitation-item">
                  <div className="invitation-header">
                    <span className="invitation-from">{invitation.from}</span>
                    <span className="invitation-subject">{invitation.subject}</span>
                  </div>
                  <p className="invitation-content">{invitation.content}</p>
                  <button onClick={() => handleAcceptInvitation(invitation.id)}>Accept</button>
                  <button onClick={() => handleDeclineInvitation(invitation.id)}>Decline</button>
                </div>
              ))}
            </div>
            <button onClick={handleCloseInbox}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default InboxPopup;
