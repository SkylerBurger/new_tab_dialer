import DialGroup from "../Dials/DialGroup";
import GroupDetails from "../GroupDetails/GroupDetails";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";

import { useDialer } from "./useDialer";

export default function Dialer() {
  const {
    showDetails,
    setShowDetails,
    showConfirm,
    setShowConfirm,
    timeEnabled,
    timeFormat,
  } = useDialer();

  return (
    <>
      <GroupTabs
        setShowConfirm={setShowConfirm}
        setShowDetails={setShowDetails}
      />

      {timeEnabled && <Time timeFormat={timeFormat} />}

      {showDetails ? (
        <GroupDetails
          setShowDetails={setShowDetails}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
        />
      ) : (
        <DialGroup />
      )}
    </>
  );
}
