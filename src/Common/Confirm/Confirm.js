import "./Confirm.css";
import PopUpModal from "../PopUpModal/PopUpModal";

function Confirm({ message, options }) {
  return (
    <PopUpModal>
      <div className={`Confirm`}>
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
    </PopUpModal>
  );
}

export default Confirm;
