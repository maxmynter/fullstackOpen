import "../index.css";

const Button = ({ text, onClick, type }) => (
  <button className="button" onClick={onClick} type={type}>
    {text}
  </button>
);

export default Button;
