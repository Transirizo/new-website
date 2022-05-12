import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "./components/Note";

const App2a = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showall, setShowall] = useState(true);

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/notes").then((response) => {
			console.log("fulfilled");
			setNotes(response.data);
		});
	}, []);

	console.log("render", notes.length, "notes");

	const addNote = (event) => {
		event.preventDefault();
		console.log("button clicked", event.target);

		const newNoteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};
		setNotes(notes.concat(newNoteObject));
		setNewNote("");
	};

	const noteToShow = showall ? notes : notes.filter((note) => note.important);

	const handleOnChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	};
	return (
		<div>
			<h1>Notes</h1>
			<button onClick={() => setShowall(!showall)}>
				show {showall ? "important" : "all"}
			</button>

			<ul>
				{noteToShow.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>

			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleOnChange} />
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App2a;
