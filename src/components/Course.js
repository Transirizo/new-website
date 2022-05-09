import React from "react";

const Course = ({ courses }) => {
	return (
		<div>
			{courses.map((course) => {
				return (
					<div key={course.id}>
						<h2>{course.name}</h2>
						{course.parts.map((part) => {
							return (
								<p key={part.id}>
									{part.name} {part.exercises}
								</p>
							);
						})}
						<h4>
							total of{" "}
							{course.parts.reduce((p, c) => {
								p = p + c.exercises;
								return p;
							}, 0)}{" "}
							exercises
						</h4>
					</div>
				);
			})}
		</div>
	);
};

export default Course;
