import React, { useEffect, useState } from "react";
import Service from "./services/phonebook";
import Notification from "./components/Notification";
import axios from "axios";

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
				<button type="submit">add/update</button>
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
		// Service.getAll().then((initialPhoneBook) => {
		// 	console.log("fulfill");
		// 	setPersons(initialPhoneBook);
		// });
		axios
			.get("http://localhost:3001/api/persons")
			.then((res) => setPersons(res.data));
	}, []);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterText, setFilterText] = useState("");
	const [message, setMessage] = useState(null);
	const [err, setErr] = useState(false);

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
		if (newName === "" || newNumber === "") {
			setNewNumber("");
			setMessage(
				"Add/Update require name and number for the person in phonebook"
			);
			setErr(true);
			setTimeout(() => {
				setMessage(null);
				setErr(false);
			}, 5000);
			return;
		}

		const nowPerson = persons.find((element) => element.name === newName);
		if (nowPerson) {
			console.log("same name!");
			if (nowPerson.number === newNumber) {
				setErr(true);
				setMessage(`${newName} is already added to phonebook`);
				setTimeout(() => {
					setMessage(null);
					setErr(false);
				}, 5000);
				setNewName("");
				setNewNumber("");
				return;
			}
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number wiht a new one?`
				)
			) {
				const changePerson = {
					...nowPerson,
					number: newNumber,
				};
				Service.update(nowPerson.id, changePerson)
					.then((newPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== nowPerson.id ? person : newPerson
							)
						);
						setMessage(`${newName}'s number had been updated`);
						setTimeout(() => {
							setMessage(null);
						}, 3000);
					})
					.catch((error) => {
						setMessage(error.response.data.error);
						setErr(true);
						setTimeout(() => {
							setMessage(null);
							setErr(false);
						}, 5000);
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

		Service.create(newNameObject)
			.then((newContact) => {
				setPersons(persons.concat(newContact));
				setNewName("");
				setNewNumber("");
				setMessage(`You have added ${newContact.name}`);
				setTimeout(() => {
					setMessage(null);
				}, 3000);
			})
			.catch((error) => {
				setErr(true);
				setMessage(error.response.data.error);
				console.log(error.response.data);
				setTimeout(() => {
					setErr(false);
					setMessage(null);
				}, 5000);
				return;
			});
	};

	const handleDelete = (props) => {
		if (window.confirm(`Delete ${props.name} ?`)) {
			const newPersons = persons.filter((person) => person.id !== props.id);
			Service.deletePerson(props.id).then(() => setPersons(newPersons));
			setMessage(`You have deleted ${props.name}`);
			setTimeout(() => {
				setMessage(null);
			}, 3000);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification err={err} message={message} />
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
