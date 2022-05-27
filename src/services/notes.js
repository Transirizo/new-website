import axios from "axios";

const baseUrl = "/api/notes";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};
const create = (newNoteObject) => {
	const request = axios.post(baseUrl, newNoteObject);
	return request.then((response) => response.data);
};
const update = (id, newNoteObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newNoteObject);
	return request.then((response) => response.data);
};

const exportedObject = { getAll, create, update };

export default exportedObject;
