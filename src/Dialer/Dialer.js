import Group from "../Group/Group";
import GroupDetails from "../GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";

import { useDialer } from "./useDialer";

export default function Dialer() {
  const { showDetails, setShowDetails, timeEnabled, timeFormat } = useDialer();

  return (
    <>
      <GroupTabs setShowDetails={setShowDetails} />

      {timeEnabled && <Time timeFormat={timeFormat} />}

      {showDetails ? (
        <GroupDetails setShowDetails={setShowDetails} />
      ) : (
        <Group />
      )}
    </>
  );
}
