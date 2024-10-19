import React from 'react';
import Sidebar from "../components/Sidebar"
import CourseOverview from "../components/CourseOverview"
import GroupSession from "../components/GroupSession"
import TrendingDiscussion from "../components/TrendingDiscussion"
import UpcomingEvents from "../components/UpcomingEvents"


const Dashboard: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <CourseOverview />
      <GroupSession />
      <TrendingDiscussion />
      <UpcomingEvents />
    </div>
  );
};

export default Dashboard;