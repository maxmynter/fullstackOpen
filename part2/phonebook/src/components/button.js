const Button = ({ text, onClick, type }) => (
  <button onClick={onClick} type={type}>
    {text}
  </button>
);

export default Button;
