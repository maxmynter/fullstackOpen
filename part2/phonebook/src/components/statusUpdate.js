import "../index.css";

const DisplayStatusUpdate = ({ message, type }) => {
  if (message == null) return null;
  if (type == "error" || type == "delete")
    return <div className="phoneNumberStausError">{message}</div>;
  if (type == "update")
    return <div className="phoneNumberStausUpdate">{message}</div>;
  console.log(
    `Unkown StatusUpdateType "${type}" in function DisplayStatusUpdate.`
  );
  return <div className="phoneNumberStausError">{message}</div>;
};

export default DisplayStatusUpdate;
