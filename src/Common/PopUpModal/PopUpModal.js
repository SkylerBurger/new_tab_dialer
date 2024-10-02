import { useEffect, useRef } from "react";

import "./PopUpModal.css";

function PopUpModal({ onBlur, children }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.focus();
    }
  });

  return (
    <div className="PopUpModal">
      <div className="popup-window" ref={popupRef} onBlur={onBlur} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}

export default PopUpModal;
