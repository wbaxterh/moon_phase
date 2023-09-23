import React, { useState, useEffect, useContext } from "react";
import SunCalc from "suncalc";
import moment from "moment";
import { BackgroundContext } from "../contexts/BackgroundContext";

function SunScreen(props) {
	// Default coordinates for New York City
	const [latitude, setLatitude] = useState(40.7128);
	const [longitude, setLongitude] = useState(-74.006);
	const [azimuth, setAzimuth] = useState(0);
	const [altitude, setAltitude] = useState(0);

	const { setBackground } = useContext(BackgroundContext);
	// Call this function whenever you want to change the background to sun
	const setSunBackground = () => {
		setBackground("sun");
	};
	useEffect(() => {
		setSunBackground();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude);
					setLongitude(position.coords.longitude);
				},
				(error) => {
					console.error("Error obtaining location: ", error);
					// Handle error as needed, perhaps falling back to a default location
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
			// Handle lack of geolocation support as needed
		}

		const now = new Date();
		const times = SunCalc.getTimes(now, latitude, longitude);
		const currentHour = now.getHours();

		// if (
		// 	currentHour >= times.sunrise.getHours() &&
		// 	currentHour < times.sunriseEnd.getHours()
		// ) {
		// 	setSunBackground("sunDawn.png");
		// } else if (
		// 	currentHour >= times.sunriseEnd.getHours() &&
		// 	currentHour < times.sunsetStart.getHours()
		// ) {
		// 	setSunBackground("sunDay.png");
		// } else if (
		// 	currentHour >= times.sunsetStart.getHours() &&
		// 	currentHour < times.sunset.getHours()
		// ) {
		// 	setSunBackground("sunSet.png");
		// } else {
		// 	setSunBackground("sunNight.png");
		// }
		const interval = setInterval(updateSunPosition, 60 * 1000); // Update every minute

		setAzimuth(SunCalc.getPosition(now, latitude, longitude).azimuth);
		return () => clearInterval(interval); // Clear interval on unmount
	}, []);
	const updateSunPosition = () => {
		const sunPos = SunCalc.getPosition(new Date(), latitude, longitude);

		setAzimuth(sunPos.azimuth * (180 / Math.PI));
		setAltitude(sunPos.altitude * (180 / Math.PI));
	};

	const now = new Date();
	const times = SunCalc.getTimes(now, latitude, longitude);
	let dawn = new Date(times.dawn);
	dawn = moment(dawn).format("MM/DD/YYYY") + " " + moment(dawn).format("h:mmA");
	let sunrise = new Date(times.sunrise);
	sunrise =
		moment(sunrise).format("MM/DD/YYYY") +
		" " +
		moment(sunrise).format("h:mmA");
	let sunset = times.sunset;
	sunset =
		moment(sunset).format("MM/DD/YYYY") + " " + moment(sunset).format("h:mmA");
	let dusk = times.dusk;
	dusk = moment(dusk).format("MM/DD/YYYY") + " " + moment(dusk).format("h:mmA");
	let night = times.night;
	night =
		moment(night).format("MM/DD/YYYY") + " " + moment(night).format("h:mmA");
	const sunStyle = {
		position: "absolute",
		// Other styles if necessary
		transform: `rotate(${azimuth}deg)`,
		bottom: `${altitude}%`,
	};
	return (
		<div className="sun-screen">
			<div className="sun-bottom">
				<h1>Sun Information</h1>
				<p>Dawn: {dawn.toString()}</p>
				<p>Sunrise: {sunrise.toString()}</p>
				<p>Sunset: {sunset.toString()}</p>
				<p>Dusk: {dusk.toString()}</p>
				<p>Night: {night.toString()}</p>
				<p>Azimuth: {azimuth}</p>
			</div>
			{/* <div>
    <img className="sun" style={sunStyle} src="../../images/sun.png" alt="Sun" />
  </div> */}
		</div>
	);
}

export default SunScreen;
