import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./groupTabs.css";
import TabMenu from "./TabMenu/TabMenu";
import { SettingsTab } from "../Settings/Settings";

function GroupTab({ group, idx, isSelected, updateGroupIndex }) {
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
    if (liElement) {
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
      {group.groupName}
      {isSelected && <TabOptions onClick={openMenu} />}
      {showTabMenu && <TabMenu onClose={closeMenu} />}
    </li>
  );
}

function GroupTabs({
  groups,
  groupIndex,
  updateGroupIndex,
  showSettings,
  setShowSettings,
}) {
  return (
    <div id="GroupTabs">
      <ul className={showSettings ? "hide-tabs" : ""}>
        {groups.map((group, idx) => {
          return (
            <GroupTab
              group={group}
              idx={idx}
              isSelected={idx === parseInt(groupIndex)}
              updateGroupIndex={updateGroupIndex}
            />
          );
        })}
      </ul>
      <SettingsTab
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </div>
  );
}

export default GroupTabs;
