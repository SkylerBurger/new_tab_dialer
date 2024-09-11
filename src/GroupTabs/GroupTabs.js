import { SettingsTab } from "../Settings/Settings";
import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";

import "./groupTabs.css";
import Tab from "./Tab/Tab";

function GroupTabs() {
  const groups = useGroupStore((state) => state.groups);

  return (
    <nav className="GroupTabs">
      <ul>
        {groups &&
          groups.map((group, idx) => {
            return <Tab idx={idx} name={group.name} />;
          })}
      </ul>
      <SettingsTab />
    </nav>
  );
}

export default GroupTabs;
