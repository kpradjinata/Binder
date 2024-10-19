import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Groups.css';

const Groups: React.FC = () => {
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

  return (
    <div className="groups-page">
      <Sidebar />
      <div className="main-content">
        <div className="left-column">
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
                  <li key={index}>{group}</li>
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
                  <button className="join-btn">Join</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="group-scheduler-section">
            <h2>Group Study Session Scheduler</h2>
            <button className="calendar-integration-btn">Integrate with Google Calendar</button>
            <button className="zoom-integration-btn">Set up Zoom Integration</button>
            <div className="post-meeting-quiz">
              <h3>Post-Meeting Quiz</h3>
              <p>Complete a quick quiz after your study session to track progress!</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Groups;