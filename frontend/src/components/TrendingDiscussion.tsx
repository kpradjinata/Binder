import React from 'react';
import '../styles/TrendingDiscussion.css';

const TrendingDiscussion: React.FC = () => {
  const discussions = [
    "anyone remember what Mr. Falck said would be on the math final?",
    "Anybody need help on diff eq?",
    "does anybody know how to do #5 on the econ homework?"
  ];

  return (
    <div className="trending-discussion-container">
      <h3 className="discussion-title">Trending Discussion</h3>
      <ul className="discussion-list">
        {discussions.map((discussion, index) => (
          <li key={index} className="discussion-item">{discussion}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingDiscussion;