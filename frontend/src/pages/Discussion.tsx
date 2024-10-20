import React, { useState } from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import '../styles/Discussion.css';
import { HeartFilledIcon, PlusIcon } from "@radix-ui/react-icons";
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

const ThreadList: React.FC<{ threads: Thread[], onNewThread: () => void }> = ({ threads, onNewThread }) => (
  <div className="thread-navigation">
    <button onClick={onNewThread} className="new-thread-button">
      <PlusIcon /> New Thread
    </button>
    <ul className="thread-list">
      {threads.map((thread) => (
        <li key={thread.id}>
          <Link to={`/discussion/${thread.id}`}>{thread.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);


interface ThreadDetailProps {
  threads: Thread[];
  comments: Record<number, Comment[]>;
  createNewComment: (threadId: number, content: string) => void;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({ threads, comments, createNewComment }) => {
  const { threadId } = useParams<{ threadId: string }>();
  const thread = threads.find(t => t.id === Number(threadId));
  const [newCommentContent, setNewCommentContent] = useState('');
  
  if (!thread) return <div>Thread not found</div>;

  const threadComments = comments[thread.id] || [];

  const handleCreateComment = () => {
    if (newCommentContent.trim()) {
      createNewComment(thread.id, newCommentContent);
      setNewCommentContent('');
    }
  };

  return (
    <div className="thread-detail">
      <h2>{thread.title}</h2>
      <p>{thread.content}</p>
      <div className="comments">
        {threadComments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <span>{comment.author} - {comment.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="new-comment-form">
        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleCreateComment}>Post Comment</button>
      </div>
    </div>
  );
};



const Discussion: React.FC = () => {
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

  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const createNewComment = (threadId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: "Anonymous User",
      content: content,
      timestamp: "Just now",
      likes: 0
    };
    setComments(prevComments => ({
      ...prevComments,
      [threadId]: [...(prevComments[threadId] || []), newComment]
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
      setNewThreadTitle('');
      setNewThreadContent('');
      setShowNewThreadForm(false);
    }
  };

  return (
    <div className="discussion-container">
      <Sidebar />
      <div className="discussion-content">
        <div className="thread-list-container">
          <button onClick={() => setShowNewThreadForm(true)} className="new-thread-button">
            <PlusIcon /> New Thread
          </button>
          <ul className="thread-list">
            {threads.map((thread) => (
              <li key={thread.id}>
                <Link to={`/discussion/${thread.id}`}>{thread.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="thread-detail-container">
          <h1 className="page-title">Discussions</h1>
          <Routes>
          <Route 
            path="/:threadId" 
            element={
              <ThreadDetail 
                threads={threads} 
                comments={comments} 
                createNewComment={createNewComment}
              />
            } 
          />
            <Route path="/" element={<div className="select-thread-message">Select a thread or create a new one</div>} />
          </Routes>
        </div>
      </div>

      {showNewThreadForm && (
        <div className="modal-overlay" onClick={() => setShowNewThreadForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowNewThreadForm(false)}>&times;</button>
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