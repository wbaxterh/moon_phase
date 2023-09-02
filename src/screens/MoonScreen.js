import React, { useEffect } from 'react';
import { useContext } from 'react';
import { BackgroundContext } from '../contexts/BackgroundContext';

function MoonScreen({ moonPhase, moonImage, illuminationPercentage, showMoreInfo, toggleMoreInfo, moreInfoContent }) {
    const { setBackground } = useContext(BackgroundContext);
    // Call this function whenever you want to change the background to sun
    const setMoonBackground = () => {
        setBackground('moon');
    };
    useEffect(() => {
        setMoonBackground();
    }, []);
  return (
    <header className="App-header">
      <img className="moon-img" src={`./images/${moonImage}`} alt={`Moon phase: ${moonPhase}`} />
      <h2>Moon Phase: {moonPhase}</h2>
      <h4>Illumination: {illuminationPercentage}%</h4>
      <button className="more-info-button" onClick={toggleMoreInfo}>
        <i className={"fa fa-angles-down"}></i>
      </button>
      {showMoreInfo && moreInfoContent}
    </header>
  );
}

export default MoonScreen;
