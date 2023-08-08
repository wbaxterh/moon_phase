import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const [moonPhase, setMoonPhase] = useState('');
  const [moonImage, setMoonImage] = useState('moon-16.png'); // Default to full moon
  const [currentDateTime, setCurrentDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
      fetch('/moonphase')
          .then(response => response.json())
          .then(data => {
              setMoonPhase(data.moon_phase);

              // Calculate the image number
              const imageNumber = Math.round(data.phase_num * 27) + 1; // This will give a value between 1 and 28
              setMoonImage(`moon-${imageNumber}.png`);
          })
          .catch(err => console.error('Error fetching moon phase:', err));
      
          // Update the time every second
      const interval = setInterval(() => {
          setCurrentDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
      }, 1000);

      // Cleanup the interval on unmount
      return () => clearInterval(interval);
  }, []);


    return (
        <div className="App">
          <div className="date-time">
                {currentDateTime}
            </div>
            <header className="App-header">
                {/* <h1>Moon Phase App</h1> */}
                <img className="moon-img" src={`./images/${moonImage}`} alt={`Moon phase: ${moonPhase}`} />
                <h2>Moon Phase: {moonPhase}</h2>
                <p>Hi from moon phase v2</p>
            </header>
        </div>
    );
}

export default App;
