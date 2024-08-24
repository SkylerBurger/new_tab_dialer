import { useState } from "react";

import DialGroup from "../Dials/DialGroup";
import GroupDetails from "../GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";

export default function Dialer({
  dialGroups,
  dialsVisibility,
  groupIndex,
  setDialsVisibility,
  setShowSettings,
  timeEnabled,
  timeFormat,
  updateGroupIndex,
  updateGroupDials,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    dialGroups && (
      <>
        <GroupTabs
          groups={dialGroups}
          groupIndex={groupIndex}
          setShowDetails={setShowDetails}
          setShowSettings={setShowSettings}
          updateGroupIndex={updateGroupIndex}
        />

        {timeEnabled && <Time timeFormat={timeFormat} />}

        {showDetails ? (
          <GroupDetails
            {...dialGroups[groupIndex]}
            setShowDetails={setShowDetails}
            updateGroupDials={updateGroupDials}
          />
        ) : (
          <DialGroup
            {...dialGroups[groupIndex]}
            dialsVisibility={dialsVisibility}
            setDialsVisibility={setDialsVisibility}
          />
        )}
      </>
    )
  );
}
