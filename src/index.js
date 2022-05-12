import React from "react";

import { createRoot } from "react-dom/client";

import App from "./App";
import App2a from "./App2a";
import Exercise21 from "./Exercise21";
import Exercise22 from "./Exercise22";
import DataForCountries from "./DataForCountries";

import axios from "axios";

const notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2019-05-30T17:30:31.098Z",
		important: true,
	},
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		date: "2019-05-30T18:39:34.091Z",
		important: false,
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2019-05-30T19:20:14.298Z",
		important: true,
	},
];
// axios.get("http://localhost:3001/notes").then((response) => {
// 	const notes = response.data;
// 	console.log(notes);
// });

const root = createRoot(document.getElementById("root"));
// root.render(<Exercise21 />);
// root.render(<App2a />);
// root.render(<Exercise22 />);
root.render(<DataForCountries />);
