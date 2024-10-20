import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import CourseOverview from "../components/CourseOverview";
import GroupSession from "../components/GroupSession";
import TrendingDiscussion from "../components/TrendingDiscussion";
import UpcomingEvents from "../components/UpcomingEvents";
import InboxPopup from "../components/InboxPopup";
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState([
    { name: 'English', instructor: 'Alphonso Thompson', progress: 77, image: '/path/to/english-image.jpg' },
    // ... other initial courses
  ]);

  const handleAddCourse = (newCourse: { name: string; instructor: string; progress: number; image: string; }) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="left-column">
          <CourseOverview courses={courses} onAddCourse={handleAddCourse} />
          <UpcomingEvents />
        </div>
        <div className="right-column">
          <GroupSession />
          <TrendingDiscussion />
          <div className="inbox">
            <h2 className="inbox-title">Inbox</h2>
            <InboxPopup />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
