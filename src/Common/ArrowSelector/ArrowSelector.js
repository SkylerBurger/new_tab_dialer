import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./ArrowSelector.css";

function ArrowSelector({ downAble, onDown, downTitle, onUp, upAble, upTitle }) {
  return (
    <div className="ArrowSelector">
      <FontAwesomeIcon
        className={upAble ? "" : "dimmed"}
        icon={faCaretUp}
        onClick={onUp}
        title={upAble ? upTitle : ""}
      />
      <FontAwesomeIcon
        className={downAble ? "" : "dimmed"}
        icon={faCaretDown}
        onClick={onDown}
        title={downAble ? downTitle : ""}
      />
    </div>
  );
}

export default ArrowSelector;
