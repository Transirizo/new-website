import React, { useState } from "react";

const Filter = ({ filterText, filterTextChange }) => {
	return (
		<div>
			filter shown with <input onChange={filterTextChange} value={filterText} />
		</div>
	);
};

const Add = (props) => {
	return (
		<form onSubmit={props.add}>
			<div>
				name: <input onChange={props.nameChange} value={props.name} />
			</div>
			<div>
				number: <input onChange={props.numberChange} value={props.number} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = (props) => {
	return (
		<div>
			{props.persons
				.filter((person) =>
					person.name
						.toLocaleLowerCase()
						.includes(props.filterText.toLocaleLowerCase())
				)
				.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
		</div>
	);
};

const Exercise22 = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: 15622540029 },
	]);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterText, setFilterText] = useState("");

	const handleInputNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleInputNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterTextChange = (event) => {
		setFilterText(event.target.value);
	};

	const add = (event) => {
		event.preventDefault();

		if (persons.find((element) => element.name === newName)) {
			console.log("same name!");
			alert(`${newName} is already added to phonebook`);
			setNewName("");
			setNewNumber("");
			return;
		}

		const newNameObject = {
			name: newName,
			number: newNumber,
		};

		setPersons(persons.concat(newNameObject));
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				filterText={filterText}
				filterTextChange={handleFilterTextChange}
			/>
			<h3> add a new</h3>
			<Add
				add={add}
				name={newName}
				number={newNumber}
				nameChange={handleInputNameChange}
				numberChange={handleInputNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons} filterText={filterText} />
		</div>
	);
};

export default Exercise22;
