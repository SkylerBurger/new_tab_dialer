import { useState } from "react";

import DialGroup from "../Dials/DialGroup";
import GroupDetails from "../GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";

export default function Dialer({
  groups,
  dialsVisibility,
  currentGroupIndex,
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
    groups && (
      <>
        <GroupTabs
          groups={groups}
          currentGroupIndex={currentGroupIndex}
          isPendingChanges={isPendingChanges}
          setShowConfirm={setShowConfirm}
          setShowDetails={setShowDetails}
          setShowSettings={setShowSettings}
          updateGroupIndex={updateGroupIndex}
        />

        {timeEnabled && <Time timeFormat={timeFormat} />}

        {showDetails ? (
          <GroupDetails
            {...groups[currentGroupIndex]}
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
            {...groups[currentGroupIndex]}
            dialsVisibility={dialsVisibility}
            setDialsVisibility={setDialsVisibility}
          />
        )}
      </>
    )
  );
}
