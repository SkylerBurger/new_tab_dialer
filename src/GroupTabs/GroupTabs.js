import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { SettingsTab } from "../Settings/Settings";
import useSettingStore from "../Stores/useSettingStore";
import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";

import "./groupTabs.css";
import TabMenu from "./TabMenu/TabMenu";

function GroupTab({ idx, name, setShowConfirm, setShowDetails }) {
  const [showTabMenu, setShowTabMenu] = useState(false);
  const [isPendingChanges] = useRenderStore((state) => {
    return [state.isPendingChanges];
  });
  const [currentGroupIndex, updateSetting] = useSettingStore((state) => {
    return [state.currentGroupIndex, state.updateSetting];
  });
  const isSelected = idx === parseInt(currentGroupIndex);

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

  function handleTabClick({ target }) {
    const liElement = target.closest("li[data-index]");
    if (liElement && isPendingChanges) {
      setShowConfirm({ newIndex: liElement.dataset.index });
    } else if (liElement) {
      setShowDetails(false);
      updateSetting("currentGroupIndex", liElement.dataset.index);
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
      onClick={handleTabClick}
    >
      {name}
      {isSelected && <TabOptions onClick={openMenu} />}
      {showTabMenu && (
        <TabMenu onClose={closeMenu} setShowDetails={setShowDetails} />
      )}
    </li>
  );
}

function GroupTabs({ setShowConfirm, setShowDetails }) {
  const groups = useGroupStore((state) => state.groups);

  return (
    <nav className="GroupTabs">
      <ul>
        {groups &&
          groups.map((group, idx) => {
            return (
              <GroupTab
                idx={idx}
                name={group.name}
                setShowConfirm={setShowConfirm}
                setShowDetails={setShowDetails}
              />
            );
          })}
      </ul>
      <SettingsTab setShowConfirm={setShowConfirm} />
    </nav>
  );
}

export default GroupTabs;
