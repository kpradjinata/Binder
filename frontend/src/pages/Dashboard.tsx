import React from 'react';
import Sidebar from "../components/Sidebar"
import CourseOverview from "../components/CourseOverview"
import GroupSession from "../components/GroupSession"
import TrendingDiscussion from "../components/TrendingDiscussion"
import UpcomingEvents from "../components/UpcomingEvents"

import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="left-column">
          <CourseOverview />
          <UpcomingEvents />
        </div>
        <div className="right-column">
          <GroupSession />
          <TrendingDiscussion />
          <div className="inbox">
            <h2 className="inbox-title">Inbox</h2>
            {/* Add inbox component here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;