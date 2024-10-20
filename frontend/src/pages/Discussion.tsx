import React, { useState } from 'react';
import '../styles/Discussion.css';
import { HeartFilledIcon, PlusIcon } from "@radix-ui/react-icons";
import Sidebar from '../components/Sidebar'

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
      content: "I noticed that only some past midterms put how many points the midterm is out of...",
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
    {
      id: 415,
      title: "Graph Cycles",
      author: "CuriousFox",
      timestamp: "3 days ago",
      content: "Can a cycle in a graph have overlapping vertices, or does each vertex need to be unique?",
      likes: 2
    },
    {
      id: 416,
      title: "DFS vs BFS",
      author: "LogicLion",
      timestamp: "2 days ago",
      content: "Which search algorithm is faster in terms of time complexity for dense graphs: DFS or BFS?",
      likes: 5
    },
    {
      id: 417,
      title: "Binary Trees",
      author: "SilentBear",
      timestamp: "6 days ago",
      content: "Why are binary search trees considered more efficient for searching compared to regular binary trees?",
      likes: 3
    },
    {
      id: 418,
      title: "Minimum Spanning Tree",
      author: "FastFalcon",
      timestamp: "1 day ago",
      content: "What is the difference between Prim's and Kruskal's algorithms when generating MSTs?",
      likes: 4
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
        content: "yes i think so bc its still connected and acyclic...",
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
    <div className="discussion-container">
      <Sidebar />
      <div className="thread-navigation">
        <button onClick={() => setShowNewThreadForm(true)} className="new-thread-button">
          <PlusIcon /> New Thread
        </button>
        <ul className="thread-list">
          {threads.map((thread, index) => (
            <li key={thread.id} onClick={() => setCurrentThreadIndex(index)} className={index === currentThreadIndex ? 'active' : ''}>
              {thread.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="discussion-content">
        <div className="thread-content">
          <h1>{currentThread.title} <span className="thread-id">#{currentThread.id}</span></h1>
          <div className="thread-info">
            <strong className="author">{currentThread.author}</strong>
            <span className="timestamp">{currentThread.timestamp}</span>
          </div>
          <p className="thread-body">{currentThread.content}</p>
          <div className="thread-actions">
            <button onClick={likeThread} className="like-button"><HeartFilledIcon /></button>
            <span>{currentThread.likes}   Likes</span>
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
      </div>

      {showNewThreadForm && (
        <div className="modal-overlay" onClick={() => setShowNewThreadForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Thread</h2>
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
            <button onClick={() => setShowNewThreadForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
