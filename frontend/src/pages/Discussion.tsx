import React, { useState } from 'react';
import '../styles/Discussion.css';
import { HeartFilledIcon, PlusIcon } from "@radix-ui/react-icons";

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
    {
      id: 419,
      title: "Isomorphic Trees",
      author: "SkyDolphin",
      timestamp: "4 days ago",
      content: "How do you determine if two trees are isomorphic?",
      likes: 1
    },
    {
      id: 420,
      title: "Graph Theory Applications",
      author: "MysteriousEagle",
      timestamp: "3 days ago",
      content: "What are some real-world applications of graph theory in computer science?",
      likes: 2
    },
    {
      id: 421,
      title: "Dijkstra's Algorithm",
      author: "SavvyHawk",
      timestamp: "5 days ago",
      content: "Can Dijkstra's algorithm handle negative weights, or do we need to use another algorithm for that?",
      likes: 6
    },
    {
      id: 422,
      title: "Eulerian Path",
      author: "WiseWolf",
      timestamp: "2 days ago",
      content: "How do you determine if a graph has an Eulerian path?",
      likes: 2
    },
    {
      id: 423,
      title: "Hamiltonian Cycle",
      author: "CleverCheetah",
      timestamp: "1 day ago",
      content: "Is there a difference between a Hamiltonian path and a Hamiltonian cycle?",
      likes: 3
    },
    {
      id: 424,
      title: "Adjacency List",
      author: "BraveOtter",
      timestamp: "6 days ago",
      content: "What are the advantages of using an adjacency list over an adjacency matrix for representing graphs?",
      likes: 4
    },
    {
      id: 425,
      title: "Bellman-Ford Algorithm",
      author: "SpeedyPanther",
      timestamp: "4 days ago",
      content: "How does the Bellman-Ford algorithm differ from Dijkstra's in terms of negative edge weights?",
      likes: 5
    },
    {
      id: 426,
      title: "Bipartite Graphs",
      author: "ShyDeer",
      timestamp: "3 days ago",
      content: "What are the key characteristics of bipartite graphs?",
      likes: 3
    },
    {
      id: 427,
      title: "DFS Time Complexity",
      author: "CunningTiger",
      timestamp: "7 days ago",
      content: "Why is the time complexity of depth-first search O(V + E)?",
      likes: 4
    },
    {
      id: 428,
      title: "Planar Graph",
      author: "ZebraExplorer",
      timestamp: "6 days ago",
      content: "How can you prove whether a graph is planar or not?",
      likes: 2
    },
    {
      id: 429,
      title: "Weighted Graphs",
      author: "SnowyOwl",
      timestamp: "2 days ago",
      content: "Can a graph have both weighted and unweighted edges, or does it have to be uniform?",
      likes: 1
    },
    {
      id: 430,
      title: "Complete Graphs",
      author: "KingElephant",
      timestamp: "1 day ago",
      content: "What makes a graph 'complete,' and what is its significance in network theory?",
      likes: 3
    },
    {
      id: 431,
      title: "Graph Coloring",
      author: "NimbleRabbit",
      timestamp: "5 days ago",
      content: "What's the best strategy for minimizing the number of colors needed to color a graph?",
      likes: 2
    },
    {
      id: 432,
      title: "Shortest Path Algorithms",
      author: "SmartPenguin",
      timestamp: "7 days ago",
      content: "Besides Dijkstra and Bellman-Ford, are there other algorithms used for finding the shortest path in a graph?",
      likes: 6
    },
    {
      id: 433,
      title: "Spanning Tree Properties",
      author: "RedPanda",
      timestamp: "2 days ago",
      content: "Why does a spanning tree contain exactly V-1 edges in a graph with V vertices?",
      likes: 1
    },
    {
      id: 434,
      title: "Tree Diameter",
      author: "GoldenMonkey",
      timestamp: "3 days ago",
      content: "What is the diameter of a tree, and how do you calculate it?",
      likes: 4
    },
    {
      id: 435,
      title: "Cycle Detection",
      author: "ElectricBison",
      timestamp: "5 days ago",
      content: "What's the most efficient way to detect a cycle in a directed graph?",
      likes: 2
    },
    {
      id: 436,
      title: "Kruskal's Algorithm",
      author: "OceanWhale",
      timestamp: "2 days ago",
      content: "Why does Kruskal's algorithm sort the edges before constructing the MST?",
      likes: 3
    },
    {
      id: 437,
      title: "Graph Density",
      author: "JungleTiger",
      timestamp: "1 day ago",
      content: "What is the difference between a sparse and dense graph, and how is density calculated?",
      likes: 1
    },
    {
      id: 438,
      title: "Tree Traversal",
      author: "LazyKoala",
      timestamp: "6 days ago",
      content: "Which is more space-efficient for large trees: pre-order or post-order traversal?",
      likes: 2
    },
    {
      id: 439,
      title: "Network Flow",
      author: "SneakyFox",
      timestamp: "4 days ago",
      content: "How does the Ford-Fulkerson method find the maximum flow in a flow network?",
      likes: 4
    },
    {
      id: 440,
      title: "Connected Components",
      author: "GentleCamel",
      timestamp: "3 days ago",
      content: "What's the best way to find all connected components in an undirected graph?",
      likes: 1
    },
    {
      id: 441,
      title: "Graph Isomorphism",
      author: "SilverRaven",
      timestamp: "2 days ago",
      content: "How can you test if two graphs are isomorphic efficiently?",
      likes: 2
    },
    {
      id: 442,
      title: "Prim's Algorithm",
      author: "LoyalSheep",
      timestamp: "5 days ago",
      content: "How does Prim's algorithm select the starting node for constructing the MST?",
      likes: 1
    },
    {
      id: 443,
      title: "Acyclic Graphs",
      author: "BlueLeopard",
      timestamp: "4 days ago",
      content: "What is an acyclic graph, and how can you prove that a graph is acyclic?",
      likes: 3
    },
    {
      id: 444,
      title: "Graph Traversal Techniques",
      author: "BlackPanther",
      timestamp: "3 days ago",
      content: "What are the trade-offs between BFS and DFS for traversing graphs?",
      likes: 2
    },
    {
      id: 445,
      title: "Graph Cut",
      author: "BrownBear",
      timestamp: "6 days ago",
      content: "What is a graph cut, and how does it relate to network flow problems?",
      likes: 3
    }
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
