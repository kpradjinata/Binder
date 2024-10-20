import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import GroupDetailsOverlay from '../components/GroupDetailsOverlay';
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
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [contentLoaded, setContentLoaded] = useState(false);


  const [recommendedGroups, setRecommendedGroups] = useState([
    { id: 1, name: "Advanced Calculus Study Group", joined: false },
    { id: 2, name: "World History Discussion", joined: false },
    { id: 3, name: "Economics Project Team", joined: false }
  ]);

  const myGroups = [
    { 
      name: "Math 101", 
      members: 5, 
      lastActive: "2 hours ago",
      description: "A study group for Math 101 students",
      discussions: ["Upcoming midterm prep", "Homework help for Chapter 5"],
      courseDescription: "Introduction to Calculus and Linear Algebra"
    },
    { 
      name: "History Buffs", 
      members: 8, 
      lastActive: "1 day ago",
      description: "Discussing historical events and their impact",
      discussions: ["Ancient Rome documentary review", "Planning for museum visit"],
      courseDescription: "World History from Ancient Times to Present"
    },
    { 
      name: "Econ Team", 
      members: 4, 
      lastActive: "3 days ago",
      description: "Collaborative group for Economics projects",
      discussions: ["Market analysis project", "Macroeconomics study session"],
      courseDescription: "Principles of Microeconomics and Macroeconomics"
    },
  ];

  const handleOpenGroup = (group: any) => {
    setSelectedGroup(group);
  };

  const handleCloseOverlay = () => {
    setSelectedGroup(null);
  };

  const toggleGroupSelection = (groupId: number) => {
    setRecommendedGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId ? { ...group, joined: !group.joined } : group
      )
    );
  };

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      setInvitedUsers([...invitedUsers, { name: newUserName, email: newUserEmail }]);
      setNewUserName('');
      setNewUserEmail('');
    }
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
        
        <section className={`group-finder-section ${contentLoaded ? 'fade-in' : ''}`}>
        
          <h2>Group Finder</h2>
          <div className="search-filter">
            <input type="text" placeholder="Search groups..." />
            <button className="filter-btn">Filter</button>
          </div>
          <div className="group-actions">
            <button className="join-group-btn">Join New Group</button>
            <button className="create-group-btn">Create New Group</button>
          </div>
          <div className="recommendations">
            <h3>Recommended Groups</h3>
            <ul>
              {recommendedGroups.map((group) => (
                <li key={group.id} className={group.joined ? 'joined' : ''}>
                  <span>{group.name}</span>
                  <button 
                    onClick={() => toggleGroupSelection(group.id)}
                    className={`join-btn ${group.joined ? 'joined' : ''}`}
                  >
                    {group.joined ? 'Joined' : 'Join'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className={`my-groups-section ${contentLoaded ? 'fade-in' : ''}`}>
          <h2>My Groups</h2>
          <ul className="group-list">
            {myGroups.map((group, index) => (
              <li key={index} className="group-item">
                <div>
                  <h3>{group.name}</h3>
                  <p>{group.members} members • Last active {group.lastActive}</p>
                </div>
                <button className="open-btn" onClick={() => handleOpenGroup(group)}>Open</button>
              </li>
            ))}
          </ul>
        </section>

        <section className={`group-scheduler-section ${contentLoaded ? 'fade-in' : ''}`}>
          <h2>Group Study Session Scheduler</h2>
          <div className="scheduler-content">
            <div className="invite-users">
              <h3>Invite Users</h3>
              <div className="invite-form">
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
              <div className="integration-buttons">
                <button className="integration-btn google-btn" onClick={handleAddToGoogleCalendar}>
                  Add to Google Calendar
                </button>
                <button className="integration-btn zoom-btn">
                  Set up Zoom Meeting
                </button>
              </div>
            </div>
            {invitedUsers.length > 0 && (
              <div className="invited-users-list">
                <h4>Invited Users</h4>
                <ul>
                  {invitedUsers.map((user, index) => (
                    <li key={index}>
                      <span>{user.name} ({user.email})</span>
                      <button onClick={() => handleRemoveUser(user.email)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="post-meeting-quiz">
            <h3>Post-Meeting Quiz</h3>
            <p>Complete a quick quiz after your study session to track progress!</p>
            <button className="quiz-btn">Start Quiz</button>
          </div>
        </section>
      </div>

      {selectedGroup && (
        <GroupDetailsOverlay group={selectedGroup} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

export default Groups;