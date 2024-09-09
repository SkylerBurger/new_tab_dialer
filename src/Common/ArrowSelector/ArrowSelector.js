import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./ArrowSelector.css";

function ArrowSelector({ downAble, onDown, onUp, upAble }) {
  return (
    <div className="ArrowSelector">
      <FontAwesomeIcon
        className={upAble ? "" : "dimmed"}
        icon={faCaretUp}
        onClick={onUp}
      />
      <FontAwesomeIcon
        className={downAble ? "" : "dimmed"}
        icon={faCaretDown}
        onClick={onDown}
      />
    </div>
  );
}

export default ArrowSelector;
