import Group from "../Group/Group";
import GroupDetails from "../Group/GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";
import NewGroupForm from "../Group/NewGroupForm/NewGroupForm";
import ReorderGroups from "../Group/ReorderGroups/ReorderGroups";

import { useDialer } from "./useDialer";

export default function Dialer() {
  const {
    showDialDetails,
    showNewGroupForm,
    showReorderGroups,
    timeEnabled,
    timeFormat,
  } = useDialer();

  return (
    <>
      <GroupTabs />

      {timeEnabled && <Time timeFormat={timeFormat} />}

      {showDialDetails ? <GroupDetails /> : <Group />}

      {showNewGroupForm && <NewGroupForm />}

      {showReorderGroups && <ReorderGroups />}
    </>
  );
}
