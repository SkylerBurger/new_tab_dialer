import "./PopUpModal.css";

function PopUpModal({ children }) {
  return (
    <div className="PopUpModal">
      <div className="popup-window">{children}</div>
    </div>
  );
}

export default PopUpModal;
