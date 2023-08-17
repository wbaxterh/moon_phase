import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SunCalc from 'suncalc';
import './App.css';

function App() {
  const [moonPhase, setMoonPhase] = useState('');
  const [moonImage, setMoonImage] = useState('moon-16.png'); // Default to full moon
  const [currentDateTime, setCurrentDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const [illuminationPercentage, setIlluminationPercentage] = useState(0);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
      // Get moon phase directly using suncalc
      const moonInfo = SunCalc.getMoonIllumination(new Date());
      const phase = moonInfo.phase; // This will give a value between 0 and 1
      
      // Calculate human-readable moon phase
      const moonPhases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
      const index = Math.round(phase * (moonPhases.length - 1));
      const humanReadablePhase = moonPhases[index];
      
      setMoonPhase(humanReadablePhase);
      
      // Calculate the image number
      const imageNumber = Math.round(phase * 27) + 1; // This will give a value between 1 and 28
      setMoonImage(`moon-${imageNumber}.png`);

      // Update the illumination percentage
      setIlluminationPercentage(Math.round(moonInfo.fraction * 100));
      // Update the time every second
      const interval = setInterval(() => {
          setCurrentDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
      }, 1000);

      // Cleanup the interval on unmount
      return () => clearInterval(interval);
  }, []);

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const getMoreInfoContent = (moonPhase) => {
    switch (moonPhase) {
      case "New Moon": return "This is a time for new beginnings, to reset and start fresh. Take some time to silence the noise and let your intuition guide you towards new thoughts and ideas.";
      case "Waxing Crescent": return "This is a time for building momentum. Get excited, and work hard now. You will see the results come to fruition later.";
      case "First Quarter Moon": return "Embrace the energy of the First Quarter Moon by making decisions and taking action on your New Moon intentions. Use this phase to overcome resistance and adjust your plans. The universe supports your ability to adapt and refine your path.";
      case "Waxing Gibbous": return "This phase invites you to refine and clarify your ideas. It's a time for introspection, assessing situations, and addressing feelings. Consider daily affirmations to boost your confidence as you prepare for transformation during the Full Moon.";
      case "Full Moon": return "This is the time to celebrate and share your progress, it's also the climax when something will come into the full light or be illuminated. It can be a chaotic time, so it's important to remain grounded and thankful.";
      case "Waning Gibbous": return "As you reflect on the progress you've made, the Waning Gibbous Moon invites you to refine and release. Cut out what doesn't serve you and embrace cleaning as a symbolic act. Express gratitude and acknowledge your growth.";
      case "Last Quarter Moon": return "The Last Quarter Moon represents a time of cleansing and release. Consider it a spiritual 'spring cleaning,' letting go of burdens and embracing change. Cleanse your mind through meditation and be prepared for karma to come full circle. It's an optimal time to break free from bad habits.";
      case "Waning Crescent": return "As the cycle nears its end, the Waning Crescent calls for rest, focus, and reflection. It's a time for peace and preparation, to gather strength and clarity for the new journey ahead.";

      default: return "";
    }
  };
  

  const moreInfoContent = (
    <div className="more-info">
      <p>{getMoreInfoContent(moonPhase)}</p>
    </div>
  );

    return (
        <div className="App">
          <div className="date-time">
                {currentDateTime}
            </div>
            <header className="App-header">
                <img className="moon-img" src={`./images/${moonImage}`} alt={`Moon phase: ${moonPhase}`} />
                <h2>Moon Phase: {moonPhase}</h2>
                <h4>Illumination: {illuminationPercentage}%</h4>
                <button className="more-info-button" onClick={toggleMoreInfo}>
                <i className={`fas ${showMoreInfo ? 'fa-xmark' : 'fa-regular fa-lightbulb'}`}></i>
                </button>
                {showMoreInfo && moreInfoContent}

            </header>
        </div>
    );
}

export default App;
