import "../index.css";

const DisplayStatusUpdate = ({ message, type }) => {
  if (message == null) return null;
  if (type == "error")
    return <div className="phoneNumberStausError">{message}</div>;
  if (type == "update")
    return <div className="phoneNumberStausUpdate">{message}</div>;
  console.log(
    `Unkown StatusUpdateType "${type}" in function DisplayStatusUpdate.`
  );
};

export default DisplayStatusUpdate;
