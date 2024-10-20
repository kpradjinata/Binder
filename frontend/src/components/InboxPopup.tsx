import React, { useState } from 'react';
import '../styles/InboxPopup.css';
import { Pencil2Icon } from '@radix-ui/react-icons';

interface Invitation {
  id: string;
  from: string;
  subject: string;
  content: string;
}

const InboxPopup: React.FC = () => {
  const [showInboxPopup, setShowInboxPopup] = useState(false);
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: '1', from: 'John Doe', subject: 'Study Group Invitation', content: 'Would you like to join our study group?' },
    { id: '2', from: 'Jane Smith', subject: 'Project Collaboration', content: 'Interested in joining the project team?' },
  ]);

  const [newInvitation, setNewInvitation] = useState({ from: '', subject: '', content: '' });

  const handleInboxClick = () => setShowInboxPopup(true);
  const handleCloseInbox = () => {
    setShowInboxPopup(false);
    setShowComposeForm(false); // Reset compose form visibility
  };

  const handleAcceptInvitation = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const handleDeclineInvitation = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const handleComposeClick = () => setShowComposeForm(true);
  const handleCancelCompose = () => setShowComposeForm(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInvitation(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSendInvitation = () => {
    if (newInvitation.from && newInvitation.subject && newInvitation.content) {
      setInvitations([...invitations, { ...newInvitation, id: (invitations.length + 1).toString() }]);
      setNewInvitation({ from: '', subject: '', content: '' });
      setShowComposeForm(false);
    }
  };

  return (
    <>
      <button onClick={handleInboxClick} className="inbox-button">Open Inbox</button>
      {showInboxPopup && (
        <div className="inbox-popup-overlay">
          <div className="inbox-popup">
            <h2>Inbox</h2>
            <button onClick={handleComposeClick} className="compose-button"><Pencil2Icon/> Compose</button>
            {!showComposeForm ? (
              <div className="invitation-list">
                {invitations.map(invitation => (
                  <div key={invitation.id} className="invitation-item">
                    <div className="invitation-header">
                      <span className="invitation-from">{invitation.from}</span>
                      <span className="invitation-subject">{invitation.subject}</span>
                    </div>
                    <p className="invitation-content">{invitation.content}</p>
                    <button onClick={() => handleAcceptInvitation(invitation.id)} className="accept-button">Accept</button>
                    <button onClick={() => handleDeclineInvitation(invitation.id)} className="decline-button">Decline</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="compose-form">
                <input
                  type="text"
                  name="from"
                  placeholder="Recipient"
                  value={newInvitation.from}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Title"
                  value={newInvitation.subject}
                  onChange={handleInputChange}
                />
                <textarea
                  name="content"
                  placeholder="Body"
                  value={newInvitation.content}
                  onChange={handleInputChange}
                />
                <div className="compose-actions">
                  <button onClick={handleSendInvitation}>Send</button>
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
