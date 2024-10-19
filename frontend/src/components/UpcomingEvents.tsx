const UpcomingEvents = () => {
    const events = [
      { date: 'OCT 19', text: 'Wallahi' },
      { date: 'OCT 24', text: 'Wallahi' },
      { date: 'SEPT 11', text: 'Wallahi' }
    ];
  
    return (
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Upcoming Events</h2>
        {events.map((event, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '10px',
          }}>
            <div style={{
              backgroundColor: ['#e3f2fd', '#fce4ec', '#e8f5e9'][index],
              borderRadius: '5px',
              padding: '5px 10px',
              marginRight: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
              {event.date}
            </div>
            <div style={{ flex: 1 }}>{event.text}</div>
            <button style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}>
              Add to Calendar
            </button>
          </div>
        ))}
      </div>
    );
  };
  

export default UpcomingEvents