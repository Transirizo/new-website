import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = ({ country, setCountry }) => {
	return (
		<p>
			{country.name}
			<button
				onClick={() => {
					const show = {
						show: true,
						country: country,
					};
					setCountry(show);
				}}
			>
				show
			</button>
		</p>
	);
};

const Country = ({ country }) => {
	const picture = country.flag;
	const api_key = process.env.REACT_APP_API_KEY;
	const [weather, setWeather] = useState({});
	var mb = (p) => (o) => p.map((c) => (o = (o || {})[c])) && o;
	const lat = country.latlng[0];
	const lon = country.latlng[1];

	useEffect(() => {
		console.log("Weather effect");

		axios
			.get(
				"https://api.openweathermap.org/data/2.5/weather?lat=" +
					lat +
					"&lon=" +
					lon +
					"&appid=" +
					api_key +
					"&units=metric"
			)
			.then((response) => {
				console.log("weather fulfilled");
				setWeather(response.data);
			});
	}, []);

	var getTemp = mb(["main", "temp"]);
	var getIcon = mb(["weather", 0, "icon"]);
	var getSpeed = mb(["wind", "speed"]);
	var getDegree = mb(["wind", "deg"]);

	const temp = getTemp(weather);
	const icon = getIcon(weather);
	const weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
	const speed = getSpeed(weather);
	const degree = getDegree(weather);

	// const transitionForDegree = ({ degree }) => {
	// 	if (degree === 0) return "N";
	// 	else if (degree > 0 && degree < 45) return "NNE";
	// 	else if (degree === 45) return "NE";
	// 	else if (degree > 45 && degree < 90) return "ENE";
	// 	else if (degree === 90) return "E";
	// 	else if (degree > 90 && degree < 135) return "ESE";
	// 	else if (degree === 135) return "SE";
	// 	else if (degree > 135 && degree < 180) return "SSE";
	// 	else if (degree === 180) return "S";
	// 	else if (degree > 180 && degree < 225) return "SSW";
	// 	else if (degree === 225) return "SW";
	// 	else if (degree > 225 && degree < 270) return "WSW";
	// 	else if (degree === 270) return "W";
	// 	else if (degree > 270 && degree < 315) return "WNW";
	// 	else if (degree === 315) return "NW";
	// 	else if (degree > 315 && degree < 360) return "NNW";
	// };

	return (
		<div>
			<h2>{country.name}</h2>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h3>languages</h3>
			<ul>
				{country.languages.map((language) => {
					return <li key={language.name}>{language.name}</li>;
				})}
			</ul>
			<img alt="flag" src={picture} />
			<h3>Weather in {country.capital}</h3>
			<p>temperature: {temp} Celcius</p>
			<img alt="weatherIcon" src={weatherIcon} />
			<p>
				wind:{speed} mph, degree {degree}
			</p>
		</div>
	);
};

const CountryDisplay = ({ countriesFilter, searchText, setCountry }) => {
	if (searchText !== "" && countriesFilter.length > 10) {
		return <p>too many countries</p>;
	} else if (countriesFilter.length === 1) {
		return <Country country={countriesFilter[0]} />;
	} else {
		return countriesFilter.map((country) => (
			<Countries key={country.name} country={country} setCountry={setCountry} />
		));
	}
};

const DataForCountries = () => {
	const [searchText, setSearchText] = useState("");
	const [countries, setCountries] = useState([]);
	const handleSearchTextChange = (event) => {
		// console.log(event.target.value);
		setSearchText(event.target.value);
		setShow({
			...show,
			show: false,
		});
	};

	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.com/v2/all").then((response) => {
			console.log("fulfilled");
			setCountries(response.data);
		});
	}, []);

	const [show, setShow] = useState({ show: false, country: countries[0] });

	console.log("render", countries.length, "countries");

	const countriesFilter = countries.filter((country) =>
		country.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
	);

	console.log(countriesFilter.length);

	return (
		<div>
			find countries{" "}
			<input onChange={handleSearchTextChange} value={searchText} />
			<div>
				{show.show ? (
					<Country country={show.country} />
				) : (
					<CountryDisplay
						countriesFilter={countriesFilter}
						searchText={searchText}
						setCountry={setShow}
					/>
				)}
			</div>
		</div>
	);
};

export default DataForCountries;
