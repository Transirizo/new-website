import React from "react";
import { useState } from "react";

function Header(props) {
	return <h1>{props.course}</h1>;
}

function Part(props) {
	return (
		<p>
			{props.part} {props.exercises}
		</p>
	);
}

function Content(props) {
	return (
		<div>
			<Part part={props.part[0].name} exercises={props.part[0].exercises} />
			<Part part={props.part[1].name} exercises={props.part[1].exercises} />
			<Part part={props.part[2].name} exercises={props.part[2].exercises} />
		</div>
	);

	// <Part part={props.part1.name} exercises={props.part1.exercises1} />
	// <Part part={props.part2.name} exercises={props.part2.exercises2} />
	// <Part part={props.part3.name} exercises={props.part3.exercises3} />
}

function Total(props) {
	return (
		<p>
			Numbers of exercises:
			{props.parts[0].exercises +
				props.parts[1].exercises +
				props.parts[2].exercises}
		</p>
	);
}

function Hello({ name, age }) {
	return (
		<div>
			<p>
				Hello {name}, you are {age} years old.
			</p>
			<p>So you were born in {new Date().getFullYear() - age}.</p>
		</div>
	);
}
const Button = ({ clickFuntion, text }) => (
	<button onClick={clickFuntion}>{text}</button>
);

const Display = ({ counter }) => <div>{counter}</div>;

const History = ({ allClicks }) => {
	if (allClicks.length === 0) {
		return <div>You have not pressed any button</div>;
	} else {
		return <div>Your history of pressed button:{allClicks.join(" ")}</div>;
	}
};

const Statics = ({ feedback }) => {
	if (feedback.all === 0) {
		return (
			<div>
				<h1>statics</h1>
				<p>No feedback given</p>
			</div>
		);
	} else {
		return (
			<div>
				<h1>statics</h1>
				<p>good {feedback.good}</p>
				<p>neutral {feedback.neutral}</p>
				<p>bad {feedback.bad}</p>
				<p>all {feedback.all}</p>
				<p>average {feedback.average}</p>
				<p>positive {feedback.positive}%</p>
			</div>
		);
	}
};

const Anecdotes = () => {
	const [select, setSelect] = useState(0);
	const [vote, setVote] = useState(Array(7).fill(0));

	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const handleAncedotes = () => {
		let next = Math.round(Math.random() * 6);
		while (next === select) {
			next = Math.round(Math.random() * 6);
		}
		setSelect(next);
	};

	const handleVote = () => {
		const copy = [...vote];
		copy[select] += 1;
		setVote(copy);
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[select]}
			<br />
			has {vote[select]} votes.
			<div>
				<Button clickFuntion={handleVote} text="vote" />
				<Button clickFuntion={handleAncedotes} text="next anecdote" />
			</div>
			<div>
				<h1>Anecdote with most votes</h1>
				{anecdotes[vote.indexOf(Math.max(...vote))]}
				<br />
				has {Math.max(...vote)} votes.
			</div>
		</div>
	);
};

function App() {
	const course = {
		name: "Half Stack application development",
		parts: [
			{ name: "Fundamentals of React", exercises: 10 },
			{ name: "Using props to pass data", exercises: 7 },
			{ name: "State of a component", exercises: 14 },
		],
	};

	const [counter, setCounter] = useState(0);

	const increseByOne = () => setCounter(counter + 1);
	const setToZero = () => setCounter(0);
	const decreaseByOne = () => setCounter(counter - 1);

	const [clicks, setClicks] = useState({ left: 0, mid: 0, right: 0 });
	const [allClicks, setAll] = useState([]);
	const [feedback, setFeedback] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
		all: 0,
		average: 0,
		positive: 0,
	});

	const handleLeftClick = () => {
		const newClicks = {
			...clicks,
			left: clicks.left + 1,
		};
		setAll(allClicks.concat("L"));
		setClicks(newClicks);
	};

	const handleRightClick = () => {
		const newClicks = {
			...clicks,
			right: clicks.right + 1,
		};
		setAll(allClicks.concat("R"));
		setClicks(newClicks);
	};

	const handleMidClick = () => {
		const newClicks = {
			...clicks,
			mid: clicks.mid + 1,
		};
		setAll(allClicks.concat("M"));
		setClicks(newClicks);
	};

	const handleZeroClick = () => {
		const newClicks = {
			left: 0,
			mid: 0,
			right: 0,
		};
		setAll([]);
		setClicks(newClicks);
	};

	const handleGood = () => {
		const newFeedback = {
			...feedback,
			good: feedback.good + 1,
			all: feedback.all + 1,
			average: (feedback.good + 1 - feedback.bad) / (feedback.all + 1),
			positive: ((feedback.good + 1) / (feedback.all + 1)) * 100,
		};
		setFeedback(newFeedback);
	};

	const handleBad = () => {
		const newFeedback = {
			...feedback,
			bad: feedback.bad + 1,
			all: feedback.all + 1,
			average: (feedback.good - 1 - feedback.bad) / (feedback.all + 1),
			positive: (feedback.good / (feedback.all + 1)) * 100,
		};
		setFeedback(newFeedback);
	};
	const handleNeutral = () => {
		const newFeedback = {
			...feedback,
			neutral: feedback.neutral + 1,
			all: feedback.all + 1,
			average: (feedback.good - feedback.bad) / (feedback.all + 1),
			positive: (feedback.good / (feedback.all + 1)) * 100,
		};
		setFeedback(newFeedback);
	};

	// setTimeout(() => setCounter(counter + 1), 1000);

	// const handelClick = () => {
	// 	console.log("Click");
	// };

	// const part1 = { name: "Fundamentals of React", exercises1: 10 };
	// const part2 = { name: "Using props to pass data", exercises2: 7 };
	// const part3 = { name: "State of a component", exercises3: 14 };

	return (
		<div>
			<Header course={course.name} />
			<Content part={course.parts} />
			<Total parts={course.parts} />
			<Hello name="Transirizo" age={22} />
			<Display counter={counter} />
			<div>
				<Button clickFuntion={increseByOne} text="plus" />
				<Button clickFuntion={decreaseByOne} text="minus" />
				<Button clickFuntion={setToZero} text="zero" />
				<p>
					{clicks.left} {clicks.mid} {clicks.right}
				</p>

				<History allClicks={allClicks} />
				<div>
					<Button clickFuntion={handleLeftClick} text="left" />
					<Button clickFuntion={handleMidClick} text="mid" />
					<Button clickFuntion={handleRightClick} text="right" />
					<Button clickFuntion={handleZeroClick} text="zero" />
				</div>
			</div>
			<div>
				<h1>give feedback</h1>
				<div>
					<Button clickFuntion={handleGood} text="good" />
					<Button clickFuntion={handleNeutral} text="neutral" />
					<Button clickFuntion={handleBad} text="bad" />
				</div>
				<Statics feedback={feedback} />
			</div>
			<Anecdotes />
		</div>
	);
}

export default App;
