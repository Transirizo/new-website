import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";

const App2a = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showall, setShowall] = useState(true);

	useEffect(() => {
		console.log("effect");
		noteServices.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	// console.log("render", notes.length, "notes");

	const addNote = (event) => {
		event.preventDefault();
		// console.log("button clicked", event.target);
		const newNoteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		};
		noteServices.create(newNoteObject).then((newNote) => {
			setNotes(notes.concat(newNote));
			setNewNote("");
		});
	};

	const noteToShow = showall ? notes : notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changeNote = { ...note, important: !note.important };
		noteServices
			.update(id, changeNote)
			.then((updateNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : updateNote)));
			})
			.catch((error) => {
				console.log("fail");
				alert(`the note ${note.content} was already deleted from server`);
				setNotes(notes.filter((note) => note.id !== id));
			});
	};

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
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
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
