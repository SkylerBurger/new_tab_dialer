import "./PopUpModal.css";

function PopUpModal({ children, options }) {
  return (
    <div className="PopUpModal">
      <div className="popup">{children}</div>
    </div>
  );
}

export default PopUpModal;
