import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { SettingsTab } from "../Settings/Settings";

import "./groupTabs.css";
import TabMenu from "./TabMenu/TabMenu";

function GroupTab({
  group,
  idx,
  isPendingChanges,
  isSelected,
  setShowConfirm,
  setShowDetails,
  updateGroupIndex,
}) {
  const [showTabMenu, setShowTabMenu] = useState(false);

  function TabOptions({ onClick }) {
    return (
      <div className="tabOptions" onClick={onClick}>
        <FontAwesomeIcon
          className="fa-sm"
          icon={showTabMenu ? faAnglesUp : faAnglesDown}
        />
      </div>
    );
  }

  function handleClick({ target }) {
    const liElement = target.closest("li[data-index]");
    if (liElement && isPendingChanges) {
      setShowConfirm({ newIndex: liElement.dataset.index });
    } else if (liElement) {
      setShowDetails(false);
      updateGroupIndex(liElement.dataset.index);
    }
  }

  function openMenu(event) {
    event.stopPropagation();
    setShowTabMenu(true);
  }

  function closeMenu() {
    setShowTabMenu(false);
  }

  return (
    <li
      className={isSelected ? "selectedGroup" : ""}
      data-index={idx}
      key={idx}
      onClick={handleClick}
    >
      {group.name}
      {isSelected && <TabOptions onClick={openMenu} />}
      {showTabMenu && (
        <TabMenu onClose={closeMenu} setShowDetails={setShowDetails} />
      )}
    </li>
  );
}

function GroupTabs({
  groups,
  currentGroupIndex,
  isPendingChanges,
  setShowConfirm,
  setShowDetails,
  setShowSettings,
  updateGroupIndex,
}) {
  return (
    <nav className="GroupTabs">
      <ul>
        {groups.map((group, idx) => {
          return (
            <GroupTab
              group={group}
              idx={idx}
              isPendingChanges={isPendingChanges}
              isSelected={idx === parseInt(currentGroupIndex)}
              setShowConfirm={setShowConfirm}
              setShowDetails={setShowDetails}
              updateGroupIndex={updateGroupIndex}
            />
          );
        })}
      </ul>
      <SettingsTab
        isPendingChanges={isPendingChanges}
        setShowConfirm={setShowConfirm}
        setShowSettings={setShowSettings}
      />
    </nav>
  );
}

export default GroupTabs;
