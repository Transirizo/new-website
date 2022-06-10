import React from "react";
import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./App";
import App2a from "./App2a";
import PhoneBook from "./PhoneBook";
import DataForCountries from "./DataForCountries";
import Exercise21 from "./Exercise21";

// import axios from "axios";
// axios.get("http://localhost:3001/notes").then((response) => {
// 	const notes = response.data;
// 	console.log(notes);
// });

const root = createRoot(document.getElementById("root"));
root.render(<PhoneBook />);
// root.render(<App2a />);
// root.render(<Exercise21 />);
// root.render(<DataForCountries />);
