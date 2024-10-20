import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const Analytics: React.FC = () => {
  const threadActivityData = [
    { name: 'Mon', threads: 4, comments: 12 },
    { name: 'Tue', threads: 3, comments: 9 },
    { name: 'Wed', threads: 2, comments: 15 },
    { name: 'Thu', threads: 5, comments: 18 },
    { name: 'Fri', threads: 6, comments: 22 },
    { name: 'Sat', threads: 2, comments: 8 },
    { name: 'Sun', threads: 1, comments: 5 },
  ];

  const topThreadsData = [
    { name: 'DFS vs BFS', value: 5 },
    { name: 'Minimum Spanning Tree', value: 4 },
    { name: 'Binary Trees', value: 3 },
    { name: 'Graph Cycles', value: 2 },
    { name: 'Trees', value: 1 },
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  const [threadActivityExpanded, setThreadActivityExpanded] = React.useState(true);
  const [topThreadsExpanded, setTopThreadsExpanded] = React.useState(true);
  const [quickStatsExpanded, setQuickStatsExpanded] = React.useState(true);

  const ToggleSection: React.FC<{ title: string; expanded: boolean; onToggle: () => void }> = ({ title, expanded, onToggle, children }) => (
    <div className="toggle-section" style={{ marginBottom: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
      <div 
        onClick={onToggle} 
        style={{ 
          padding: '15px', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: expanded ? '1px solid #eee' : 'none'
        }}
      >
        {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <h2 style={{ margin: '0 0 0 10px', fontSize: '1.2rem', fontWeight: 600 }}>{title}</h2>
      </div>
      {expanded && <div style={{ padding: '15px' }}>{children}</div>}
    </div>
  );

  return (
    <div className="analytics-container" style={{ display: 'flex', paddingTop: '20px', fontFamily: 'Inter, sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <Sidebar />
      <div className="analytics-wrapper" style={{ marginLeft: '250px', flex: 1, padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 700 }}>Discussion Analytics</h1>

        <ToggleSection title="Thread and Comment Activity (Last 7 Days)" expanded={threadActivityExpanded} onToggle={() => setThreadActivityExpanded(!threadActivityExpanded)}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={threadActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="threads" fill="#4ECDC4" />
              <Bar dataKey="comments" fill="#FF6B6B" />
            </BarChart>
          </ResponsiveContainer>
        </ToggleSection>

        <ToggleSection title="Top 5 Threads by Likes" expanded={topThreadsExpanded} onToggle={() => setTopThreadsExpanded(!topThreadsExpanded)}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topThreadsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {topThreadsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ToggleSection>

        <ToggleSection title="Quick Stats" expanded={quickStatsExpanded} onToggle={() => setQuickStatsExpanded(!quickStatsExpanded)}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>Total Threads: 6</li>
            <li style={{ marginBottom: '10px' }}>Total Comments: 89</li>
            <li style={{ marginBottom: '10px' }}>Most Active User: LogicLion</li>
            <li style={{ marginBottom: '10px' }}>Average Likes per Thread: 2.67</li>
            <li>Average Comments per Thread: 14.83</li>
          </ul>
        </ToggleSection>
      </div>
    </div>
  );
};

export default Analytics;