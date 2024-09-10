import { SettingsTab } from "../Settings/Settings";
import useGroupStore from "../Stores/useGroupStore";

import "./groupTabs.css";
import Tab from "./Tab/Tab";

function GroupTabs({ setShowDetails }) {
  const groups = useGroupStore((state) => state.groups);

  return (
    <nav className="GroupTabs">
      <ul>
        {groups &&
          groups.map((group, idx) => {
            return (
              <Tab
                idx={idx}
                name={group.name}
                setShowDetails={setShowDetails}
              />
            );
          })}
      </ul>
      <SettingsTab />
    </nav>
  );
}

export default GroupTabs;
