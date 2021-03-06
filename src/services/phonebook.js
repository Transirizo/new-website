import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newContact) => {
	const request = axios.post(baseUrl, newContact);
	return request.then((response) => response.data);
};

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => {
		console.log(response);
		return response.data;
	});
};

const update = (id, newNumber) => {
	const request = axios.put(`${baseUrl}/${id}`, newNumber);
	return request.then((response) => response.data);
};

const exportedObject = { getAll, create, deletePerson, update };

export default exportedObject;
