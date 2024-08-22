import Time from "../Time/Time";
import DialGroup from "../Dials/DialGroup";


export default function Dialer({ 
  dialGroup, 
  dialsVisibility,
  setDialsVisibility,
  timeEnabled, 
  timeFormat, 
}) {
  return (<>
    {timeEnabled && <Time timeFormat={timeFormat} />}

      <DialGroup
        {...dialGroup}
        dialsVisibility={dialsVisibility}
        setDialsVisibility={setDialsVisibility}
      />

  </>)
}