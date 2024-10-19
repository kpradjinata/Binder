import React from 'react';

const Login: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        color: 'white',
        padding: '30px',
        borderRadius: '10px',
        border: '2px solid white',
        width: '300px',
      }}>
        <h1 style={{ marginBottom: '10px', fontSize: '20px', textAlign: 'center' }}>Welcome to Binder!</h1>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Login</h2>
        <div style={{
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}>
          <span style={{ marginRight: '10px', color: '#6b6b6b' }}>👤</span>
          <input type="text" placeholder="Username" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #333',
            borderRadius: '5px',
            color: 'white',
          }} />
        </div>
        <div style={{
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}>
          <span style={{ marginRight: '10px', color: '#6b6b6b' }}>🔒</span>
          <input type="password" placeholder="Password" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #333',
            borderRadius: '5px',
            color: 'white',
          }} />
        </div>
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
          fontSize: '16px',
        }}>
          Login
        </button>
        <a href="#" style={{
          color: '#6b6b6b',
          textDecoration: 'none',
          marginTop: '15px',
          fontSize: '14px',
        }}>
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default Login;