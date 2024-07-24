import "./groupTabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faArrowRotateRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Settings from "../Settings/Settings";

function GroupTab({ group, idx, isSelected, updateGroupIndex }) {
  function TabOptions() {
    return (
      <div className="tabOptions">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    );
  }

  function handleClick({ target }) {
    updateGroupIndex(target.dataset.index);
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

function GroupTabs({ groups, groupIndex, updateGroupIndex }) {
  return (
    <div id="GroupTabs">
      <ul>
        {groups.map((group, idx) => {
          return (
            <GroupTab
              group={group}
              idx={idx}
              isSelected={groupIndex === idx}
              updateGroupIndex={updateGroupIndex}
            />
          );
        })}
      </ul>
      <ul>
        <li>
          <Settings />
        </li>
      </ul>
    </div>
  );
}

export default GroupTabs;
