import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";

import TabMenu from "../TabMenu/TabMenu";
import useTab from "./useTab";

function TabOptions({ onClick, showTabMenu }) {
  return (
    <div className="tabOptions" onClick={onClick}>
      <FontAwesomeIcon
        className="fa-sm"
        icon={showTabMenu ? faAnglesUp : faAnglesDown}
      />
    </div>
  );
}

function Tab({ idx, name, setShowConfirm, setShowDetails }) {
  const { closeMenu, openMenu, isSelected, handleTabClick, showTabMenu } =
    useTab({ idx, setShowConfirm, setShowDetails });

  return (
    <li
      className={isSelected ? "selectedGroup" : ""}
      data-index={idx}
      key={idx}
      onClick={handleTabClick}
    >
      {name}
      {isSelected && (
        <TabOptions onClick={openMenu} showTabMenu={showTabMenu} />
      )}
      {showTabMenu && (
        <TabMenu
          idx={idx}
          name={name}
          onClose={closeMenu}
          setShowDetails={setShowDetails}
        />
      )}
    </li>
  );
}

export default Tab;
