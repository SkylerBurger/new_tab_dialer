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
  const [isPendingChanges, setIsPendingChanges] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);

  return (
    dialGroups && (
      <>
        <GroupTabs
          groups={dialGroups}
          groupIndex={groupIndex}
          isPendingChanges={isPendingChanges}
          setShowConfirm={setShowConfirm}
          setShowDetails={setShowDetails}
          setShowSettings={setShowSettings}
          updateGroupIndex={updateGroupIndex}
        />

        {timeEnabled && <Time timeFormat={timeFormat} />}

        {showDetails ? (
          <GroupDetails
            {...dialGroups[groupIndex]}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            isPendingChanges={isPendingChanges}
            setIsPendingChanges={setIsPendingChanges}
            setShowDetails={setShowDetails}
            setShowSettings={setShowSettings}
            updateGroupDials={updateGroupDials}
            updateGroupIndex={updateGroupIndex}
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
