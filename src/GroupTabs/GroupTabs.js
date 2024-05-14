import "./groupTabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Settings from "../Settings/Settings";

function GroupTab({ group, idx, isSelected, setGroupIndex }) {
  function TabOptions() {
    return (
      <div className="tabOptions">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    );
  }

  function handleClick({ target }) {
    setGroupIndex(target.value);
  }

  return (
    <li
      className={isSelected ? "selectedGroup" : ""}
      key={idx}
      value={idx}
      onClick={handleClick}
    >
      {group.groupName}
      {isSelected ? <TabOptions /> : ""}
    </li>
  );
}

function GroupTabs({ groups, groupIndex, refreshConfig, setGroupIndex }) {
  return (
    <div id="GroupTabs">
      <ul>
        {groups.map((group, idx) => {
          return (
            <GroupTab
              group={group}
              idx={idx}
              isSelected={groupIndex === idx}
              setGroupIndex={setGroupIndex}
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
