import DialGroup from "../Dials/DialGroup";
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
}) {
  return (
    dialGroups && (
      <>
        <GroupTabs
          groups={dialGroups}
          groupIndex={groupIndex}
          setShowSettings={setShowSettings}
          updateGroupIndex={updateGroupIndex}
        />

        {timeEnabled && <Time timeFormat={timeFormat} />}

        <DialGroup
          {...dialGroups[groupIndex]}
          dialsVisibility={dialsVisibility}
          setDialsVisibility={setDialsVisibility}
        />
      </>
    )
  );
}
