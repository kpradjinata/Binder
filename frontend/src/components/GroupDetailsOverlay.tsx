import React from 'react';

interface GroupDetailsProps {
  group: {
    name: string;
    members: number;
    lastActive: string;
    description?: string;
    discussions?: string[];
    courseDescription?: string;
  };
  onClose: () => void;
}

const GroupDetailsOverlay: React.FC<GroupDetailsProps> = ({ group, onClose }) => {
  return (
    <div className="group-details-overlay">
      <div className="group-details-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{group.name}</h2>
        <p><strong>Members:</strong> {group.members}</p>
        <p><strong>Last Active:</strong> {group.lastActive}</p>
        {group.description && <p><strong>Description:</strong> {group.description}</p>}
        {group.courseDescription && <p><strong>Course Description:</strong> {group.courseDescription}</p>}
        {group.discussions && group.discussions.length > 0 && (
          <>
            <h3>Recent Discussions</h3>
            <ul>
              {group.discussions.map((discussion, index) => (
                <li key={index}>{discussion}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupDetailsOverlay;