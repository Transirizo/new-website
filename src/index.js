import React from "react";

import { createRoot } from "react-dom/client";

import App from "./App";
import App2a from "./App2a";
import Exercise21 from "./Exercise21";

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

const root = createRoot(document.getElementById("root"));
root.render(<Exercise21 />);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App2a notes={notes} />, document.getElementById("root"));
// ReactDOM.render(<Exercise21 />, document.getElementById("root"));
