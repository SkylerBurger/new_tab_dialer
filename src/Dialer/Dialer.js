import { useState } from "react";

import DialGroup from "../Dials/DialGroup";
import GroupDetails from "../GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";

export default function Dialer({
  groups,
  dialsVisibility,
  setDialsVisibility,
  timeEnabled,
  timeFormat,
  updateGroupDials,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);

  return (
    groups && (
      <>
        <GroupTabs
          groups={groups}
          setShowConfirm={setShowConfirm}
          setShowDetails={setShowDetails}
        />

        {timeEnabled && <Time timeFormat={timeFormat} />}

        {showDetails ? (
          <GroupDetails
            setShowDetails={setShowDetails}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            updateGroupDials={updateGroupDials}
          />
        ) : (
          <DialGroup
            dialsVisibility={dialsVisibility}
            setDialsVisibility={setDialsVisibility}
          />
        )}
      </>
    )
  );
}
