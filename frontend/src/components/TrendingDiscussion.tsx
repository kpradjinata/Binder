import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TrendingDiscussion.css';

const TrendingDiscussion: React.FC = () => {
  const discussions = [
    { id: 389, text: "I noticed that only some past midterms put how many points the midterm is out of?", votes: 15 },
    { id: 414, text: "is a 2 vertices, 1 edge graph considered a tree? or for trees, do we only consider n>2?", votes: 8 },
    { id: 415, text: "Can a cycle in a graph have overlapping vertices, or does each vertex need to be unique?", votes: 12 }
  ];

  return (
    <div className="trending-discussion-container">
      <h3 className="discussion-title">Trending Discussion</h3>
      <ul className="discussion-list">
        {discussions.map((discussion) => (
          <li key={discussion.id} className="discussion-item">
            <Link to={`/discussion/${discussion.id}`} className="discussion-link">
              <span className="discussion-text" title={discussion.text}>{discussion.text}</span>
              <span className="discussion-votes">{discussion.votes}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/discussion" className="view-all-link">View All Discussions</Link>
    </div>
  );
};

export default TrendingDiscussion;