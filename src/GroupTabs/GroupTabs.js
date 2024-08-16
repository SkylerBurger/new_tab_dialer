import "./groupTabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { SettingsTab } from "../Settings/Settings";

function GroupTab({ group, idx, isSelected, updateGroupIndex }) {
  function TabOptions() {
    return (
      <div className="tabOptions">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    );
  }

  function handleClick({ target }) {
    const liElement = target.closest("li[data-index]");
    if (liElement) {
      updateGroupIndex(liElement.dataset.index);
    }
  }

  return (
    <li
      className={isSelected ? "selectedGroup" : ""}
      data-index={idx}
      key={idx}
      onClick={handleClick}
    >
      {group.groupName}
      {isSelected ? <TabOptions /> : ""}
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
