const Notification = ({ err, message }) => {
	if (message === null) {
		return null;
	}

	return err ? (
		<div className="error">{message}</div>
	) : (
		<div className="success">{message}</div>
	);
};
export default Notification;
