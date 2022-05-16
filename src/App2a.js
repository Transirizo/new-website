import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";
import Notification from "./components/Notification";

const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 16,
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note app, Department of Computer Science, university of Helsinki 2022
			</em>
		</div>
	);
};

const App2a = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showall, setShowall] = useState(true);
	const [Message, setMessage] = useState(null);

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
				setMessage(`Note ${note.content} was already deleted from server`);
				setTimeout(() => {
					setMessage(null);
				}, 5000);
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
			<Notification message={Message} />
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

			<Footer />
		</div>
	);
};

export default App2a;
