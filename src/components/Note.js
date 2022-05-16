import React from "react";

const Note = ({ note, toggleImportance }) => {
	const label = note.important ? "make not important" : "make important";
	return note.important ? (
		<li className="important">
			{note.content} <button onClick={toggleImportance}>{label}</button>
		</li>
	) : (
		<li>
			{note.content} <button onClick={toggleImportance}>{label}</button>
		</li>
	);
};

export default Note;
