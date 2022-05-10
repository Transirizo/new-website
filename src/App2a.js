import React, { useState, useTransition } from "react";
import Note from "./components/Note";

const App2a = (props) => {
	const [notes, setNotes] = useState(props.notes);
	const [newNote, setNewNote] = useState("");
	const [showall, setShowall] = useState(true);

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
