import ArrowSelector from "../../Common/ArrowSelector/ArrowSelector";
import PopUpModal from "../../Common/PopUpModal/PopUpModal";
import useGroupStore from "../../Stores/useGroupStore";
import useRenderStore from "../../Stores/useRenderStore";
import useSettingStore from "../../Stores/useSettingStore";

import "./ReorderGroups.css";

function GroupNameItem({ groupName, index, first, last }) {
  const handleShiftGroup = (step) => {
    useRenderStore.getState().setShowDialDetails(false);
    useGroupStore.getState().shiftGroup(groupName, step);
    useSettingStore.getState().updateGroupIndex(0);
  };

  return (
    <li className="GroupName" key={index}>
      <ArrowSelector
        downAble={!last}
        onDown={() => handleShiftGroup(1)}
        downTitle="Move Group Lower in Order"
        onUp={() => handleShiftGroup(-1)}
        upAble={!first}
        upTitle="Move Group Higher in Order"
      />
      <div>
        <p>{groupName}</p>
      </div>
    </li>
  );
}

function ReorderGroups() {
  const groupNames = useGroupStore.getState().getGroupNames();
  const handleClose = () => {
    useRenderStore.getState().setShowReorderGroups(false);
    useRenderStore.getState().setShowDials(true);
  };

  return (
    <PopUpModal onBlur={handleClose}>
      <div className="ReorderGroups">
        <h2>Reorder Groups</h2>
        <ul>
          {groupNames.map((groupName, index) => {
            const first = index === 0;
            const last = index === groupNames.length - 1;
            return (
              <GroupNameItem
                index={index}
                groupName={groupName}
                first={first}
                last={last}
              />
            );
          })}
        </ul>
        <button onClick={handleClose}>Close</button>
      </div>
    </PopUpModal>
  );
}

export default ReorderGroups;
