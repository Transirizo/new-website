import axios from "axios";
import React, { useEffect, useState } from "react";
import Service from "./services/phonebook";

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
						{person.name} {person.number}{" "}
						<button onClick={() => props.handleDelete(person)}>delete</button>
					</p>
				))}
		</div>
	);
};

const PhoneBook = () => {
	const [persons, setPersons] = useState([]);
	useEffect(() => {
		console.log("effect");
		Service.getAll().then((initialPhoneBook) => {
			console.log("fulfill");
			setPersons(initialPhoneBook);
		});
	}, []);

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
		const nowPerson = persons.find((element) => element.name === newName);
		if (nowPerson) {
			console.log("same name!");
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number wiht a new one?`
				)
			) {
				const changePerson = {
					...nowPerson,
					number: newNumber,
				};
				Service.update(nowPerson.id, changePerson).then((newPerson) => {
					setPersons(
						persons.map((person) =>
							person.id !== nowPerson.id ? person : newPerson
						)
					);
				});
			}
			setNewName("");
			setNewNumber("");
			return;
		}

		const newNameObject = {
			name: newName,
			number: newNumber,
		};

		Service.create(newNameObject).then((newContact) => {
			setPersons(persons.concat(newContact));
			setNewName("");
			setNewNumber("");
		});
	};

	const handleDelete = (props) => {
		if (window.confirm(`Delete ${props.name} ?`)) {
			const newPersons = persons.filter((person) => person.id !== props.id);
			Service.deletePerson(props.id).then(() => setPersons(newPersons));
		}
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
			<Persons
				persons={persons}
				filterText={filterText}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default PhoneBook;
