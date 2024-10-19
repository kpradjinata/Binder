const TrendingDiscussion = () => {
    const discussions = [
      "anyone remember what Mr. Falck said would be on the math final?",
      "Anybody need help on diff eq?",
      "does anybody know how to do #5 on the econ homework?"
    ];
  
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '15px',
      }}>
        <h3 style={{ marginTop: 0 }}>Trending Discussion</h3>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {discussions.map((discussion, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{discussion}</li>
          ))}
        </ul>
      </div>
    );
  };


export default TrendingDiscussion
