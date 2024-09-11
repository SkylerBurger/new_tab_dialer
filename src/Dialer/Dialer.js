import Group from "../Group/Group";
import GroupDetails from "../GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";

import { useDialer } from "./useDialer";

export default function Dialer() {
  const { showDialDetails, timeEnabled, timeFormat } = useDialer();

  return (
    <>
      <GroupTabs />

      {timeEnabled && <Time timeFormat={timeFormat} />}

      {showDialDetails ? <GroupDetails /> : <Group />}
    </>
  );
}
