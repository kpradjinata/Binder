import React, { useState } from 'react';
import '../styles/Discussion.css';
import { HeartFilledIcon, PlusIcon } from "@radix-ui/react-icons"

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

const Discussion: React.FC = () => {
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 389,
      title: "Score total for midterms",
      author: "Anonymous Finch",
      timestamp: "6 days ago",
      content: "I noticed that only some past midterms put how many points the midterm is out of, and I was wondering if that could be put on ours? It's just helpful to know when strategizing what problems to work on more during the actual test, like if if I'm getting stuck on a problem that's worth 20/150 points I might want to spend a little more time on it, versus if I'm stuck on a problem that's worth 20/300 points, it might be better to move on and come back to it later.",
      likes: 1
    },
    {
      id: 414,
      title: "Trees",
      author: "Anonymous Jackal",
      timestamp: "4 days ago",
      content: "is a 2 vertices, 1 edge graph considered a tree? or for trees, do we only consider n>2?",
      likes: 1
    },
  ]);

  const [comments, setComments] = useState<Record<number, Comment[]>>({
    389: [
      {
        id: 1,
        author: "Gavin Zhang",
        content: "Yes, we will say the total amount of points at the beginning of the exam.",
        timestamp: "6 days ago",
        likes: 1
      }
    ],
    414: [
      {
        id: 2,
        author: "Anonymous Squirrel",
        content: "yes i think so bc its still connected and acyclic, and edges are v-1. i believe even a single vertex would be considered a tree",
        timestamp: "4 days ago",
        likes: 1
      }
    ]
  });

  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);

  const currentThread = threads[currentThreadIndex];
  const currentComments = comments[currentThread.id] || [];

  const goToPrevious = () => {
    setCurrentThreadIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : threads.length - 1
    );
  };

  const goToNext = () => {
    setCurrentThreadIndex((prevIndex) =>
      prevIndex < threads.length - 1 ? prevIndex + 1 : 0
    );
  };

  const likeThread = () => {
    setThreads(prevThreads => prevThreads.map(thread =>
      thread.id === currentThread.id ? { ...thread, likes: thread.likes + 1 } : thread
    ));
  };

  const likeComment = (commentId: number) => {
    setComments(prevComments => ({
      ...prevComments,
      [currentThread.id]: prevComments[currentThread.id].map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    }));
  };

  const createNewThread = () => {
    if (newThreadTitle && newThreadContent) {
      const newThread: Thread = {
        id: Date.now(),
        title: newThreadTitle,
        author: "Anonymous User",
        timestamp: "Just now",
        content: newThreadContent,
        likes: 0
      };
      setThreads([...threads, newThread]);
      setCurrentThreadIndex(threads.length);
      setNewThreadTitle('');
      setNewThreadContent('');
      setShowNewThreadForm(false);
    }
  };

  const createNewComment = () => {
    if (newCommentContent) {
      const newComment: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        content: newCommentContent,
        timestamp: "Just now",
        likes: 0
      };
      setComments(prevComments => ({
        ...prevComments,
        [currentThread.id]: [...(prevComments[currentThread.id] || []), newComment]
      }));
      setNewCommentContent('');
    }
  };

  return (
    <div className="discussion-forum">
      <button onClick={() => setShowNewThreadForm(!showNewThreadForm)} className="new-thread-button">
        <PlusIcon /> New Thread
      </button>

      {showNewThreadForm && (
        <div className="new-thread-form">
          <input
            type="text"
            placeholder="Thread Title"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
          />
          <textarea
            placeholder="Thread Content"
            value={newThreadContent}
            onChange={(e) => setNewThreadContent(e.target.value)}
          />
          <button onClick={createNewThread}>Create Thread</button>
        </div>
      )}

      <div className="thread-content">
        <h1>{currentThread.title} <span className="thread-id">#{currentThread.id}</span></h1>
        <div className="thread-info">
          <span className="author">{currentThread.author}</span>
          <span className="timestamp">{currentThread.timestamp}</span>
        </div>
        <p className="thread-body">{currentThread.content}</p>
        <div className="thread-actions">
          <button onClick={likeThread} className="like-button"><HeartFilledIcon /></button>
          <span>{currentThread.likes} Likes</span>
        </div>
        <h2>{currentComments.length} Answer{currentComments.length !== 1 ? 's' : ''}</h2>
        {currentComments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="author">{comment.author}</span>
              <span className="timestamp">{comment.timestamp}</span>
            </div>
            <p className="comment-body">{comment.content}</p>
            <div className="comment-actions">
              <button onClick={() => likeComment(comment.id)} className="like-button"><HeartFilledIcon /></button>
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
          <button onClick={createNewComment} className="post-comment-button">Post</button>
        </div>
      </div>
      <div className="navigation">
        <button onClick={goToPrevious} className="nav-button">← Previous</button>
        <button className="dashboard-button">Go back to Dashboard</button>
        <button onClick={goToNext} className="nav-button">Next →</button>
      </div>
    </div>
  );
};

export default Discussion;