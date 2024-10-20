import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Groups.css';

interface User {
  name: string;
  email: string;
}

const createGoogleCalendarUrl = (event: {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  attendees: User[];
}) => {
  const { title, description, location, startTime, endTime, attendees } = event;
  
  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

  const url = new URL('https://www.google.com/calendar/render?action=TEMPLATE');
  url.searchParams.append('text', title);
  url.searchParams.append('details', description);
  url.searchParams.append('location', location);
  url.searchParams.append('dates', `${formatDate(startTime)}/${formatDate(endTime)}`);
  
  // Add attendees to the URL
  attendees.forEach(attendee => {
    url.searchParams.append('add', `${attendee.email}`);
  });

  return url.toString();
};

const Groups: React.FC = () => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const recommendedGroups = [
    "Advanced Calculus Study Group",
    "World History Discussion",
    "Economics Project Team"
  ];

  const myGroups = [
    { name: "Math 101", members: 5, lastActive: "2 hours ago" },
    { name: "History Buffs", members: 8, lastActive: "1 day ago" },
    { name: "Econ Team", members: 4, lastActive: "3 days ago" },
  ];

  const toggleGroupSelection = (group: string) => {
    setSelectedGroups(prevSelected => 
      prevSelected.includes(group)
        ? prevSelected.filter(g => g !== group)
        : [...prevSelected, group]
    );
  };

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      setInvitedUsers([...invitedUsers, { name: newUserName, email: newUserEmail }]);
      setNewUserName('');
      setNewUserEmail('');
    }
  };

  const handleRemoveUser = (email: string) => {
    setInvitedUsers(invitedUsers.filter(user => user.email !== email));
  };

  const handleAddToGoogleCalendar = () => {
    const event = {
      title: "Group Study Session",
      description: "Join our group study session to prepare for upcoming exams.",
      location: "Online",
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000), // Tomorrow + 1 hour
      attendees: invitedUsers,
    };

    const calendarUrl = createGoogleCalendarUrl(event);
    window.open(calendarUrl, '_blank');
  };
  

  return (
    <div className="groups-page">
      <Sidebar />
      <div className="group-main-content">
        <h1 className="page-title">Groups</h1>
        
        <section className="group-finder-section">
          <h2>Group Finder</h2>
          <div className="search-filter">
            <input type="text" placeholder="Search groups..." />
            <button className="filter-btn">Filter</button>
          </div>
          <div className="recommendations">
            <h3>Recommended Groups</h3>
            <ul>
              {recommendedGroups.map((group, index) => (
                <li 
                  key={index} 
                  onClick={() => toggleGroupSelection(group)}
                  className={selectedGroups.includes(group) ? 'selected' : ''}
                >
                  {group}
                </li>
              ))}
            </ul>
          </div>
          <button className="create-group-btn">Create New Group</button>
        </section>

        <section className="my-groups-section">
          <h2>My Groups</h2>
          <ul className="group-list">
            {myGroups.map((group, index) => (
              <li key={index} className="group-item">
                <div>
                  <h3>{group.name}</h3>
                  <p>{group.members} members • Last active {group.lastActive}</p>
                </div>
                <button className="join-btn">Open</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="group-scheduler-section">
          <h2>Group Study Session Scheduler</h2>
          <div className="invite-users">
            <h3>Invite Users</h3>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <button onClick={handleAddUser}>Add User</button>
            </div>
            <ul>
              {invitedUsers.map((user, index) => (
                <li key={index}>
                  {user.name} ({user.email})
                  <button onClick={() => handleRemoveUser(user.email)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="integration-buttons">
            <button className="integration-btn google-btn" onClick={handleAddToGoogleCalendar}>
              Add with Google Calendar
            </button>
            <button className="integration-btn zoom-btn">Set up Zoom Integration</button>
          </div>
          <div className="post-meeting-quiz">
            <h3>Post-Meeting Quiz</h3>
            <p>Complete a quick quiz after your study session to track progress!</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Groups;