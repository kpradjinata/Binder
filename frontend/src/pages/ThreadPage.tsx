import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeartFilledIcon } from "@radix-ui/react-icons";
import Sidebar from '../components/Sidebar';

interface Thread {
  id: number;
  title: string;
  author: string;
  timestamp: string;
  content: string;
  likes: number;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface ThreadPageProps {
  threads: Thread[];
  comments: Record<number, Comment[]>;
  likeThread: (threadId: number) => void;
  likeComment: (threadId: number, commentId: number) => void;
  createNewComment: (threadId: number, content: string) => void;
}

const ThreadPage: React.FC<ThreadPageProps> = ({ threads, comments, likeThread, likeComment, createNewComment }) => {
  const { threadId } = useParams<{ threadId: string }>();
  const thread = threads.find(t => t.id === parseInt(threadId!, 10));
  const [newCommentContent, setNewCommentContent] = useState('');

  if (!thread) {
    return <div>Thread not found</div>;
  }

  const threadComments = comments[thread.id] || [];

  const handleCreateComment = () => {
    if (newCommentContent) {
      createNewComment(thread.id, newCommentContent);
      setNewCommentContent('');
    }
  };

  return (
    <div className="thread-page">
      <Sidebar />
      <div className="thread-content">
        <h1>{thread.title} <span className="thread-id">#{thread.id}</span></h1>
        <div className="thread-info">
          <strong className="author">{thread.author}</strong>
          <span className="timestamp">{thread.timestamp}</span>
        </div>
        <p className="thread-body">{thread.content}</p>
        <div className="thread-actions">
          <button onClick={() => likeThread(thread.id)} className="like-button"><HeartFilledIcon /></button>
          <span>{thread.likes} Likes</span>
        </div>
        <h2>{threadComments.length} Answer{threadComments.length !== 1 ? 's' : ''}</h2>
        {threadComments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="author">{comment.author}</span>
              <span className="timestamp">{comment.timestamp}</span>
            </div>
            <p className="comment-body">{comment.content}</p>
            <div className="comment-actions">
              <button onClick={() => likeComment(thread.id, comment.id)} className="like-button"><HeartFilledIcon /></button>
              <span>{comment.likes} Likes</span>
            </div>
          </div>
        ))}
        <div className="new-comment-form">
          <input
            type="text"
            placeholder="Add comment"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            className="add-comment"
          />
          <button onClick={handleCreateComment} className="post-comment-button">Post</button>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;