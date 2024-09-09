import "./Confirm.css";

function Confirm({ message, options }) {
  return (
    <div className={`Confirm`}>
      <div className="popup">
        <p>{message}</p>
        <div className="butonBox">
          {options.map((option) => {
            const buttonStyle = option.color
              ? { backgroundColor: option.color }
              : {};
            return (
              <button style={buttonStyle} onClick={option.action}>
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Confirm;
