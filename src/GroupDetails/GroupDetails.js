import { useState } from "react";

import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import { ArrowSelector } from "../ArrowSelector/ArrowSelector";

function DialDetails({ index, first, last, name, image, url, shiftDial }) {
  return (
    <li className="DialDetails">
      <ArrowSelector
        downAble={!last}
        onDown={() => shiftDial(index, 1)}
        onUp={() => shiftDial(index, -1)}
        upAble={!first}
      />
      <img src={image} alt={name} />
      <div>
        <p>{name}</p>
        <p>{url}</p>
      </div>
    </li>
  );
}

export default function GroupDetails({
  groupDials,
  groupName,
  setShowDetails,
  updateGroupDials,
}) {
  const { dials, isPendingChanges, shiftDial, applyChanges } =
    useGroupDetails({
      groupDials,
      setShowDetails,
      updateGroupDials,
    });

  return (
    <div className="GroupDetails">
      <h1>{groupName}</h1>
      <ul>
        {dials.map((dial, index) => (
          <DialDetails
            {...dial}
            index={index}
            first={index === 0}
            last={index === dials.length - 1}
            shiftDial={shiftDial}
          />
        ))}
      </ul>
      <button>Add Dial</button>
      <button onClick={() => setShowDetails(false)}>Cancel</button>
      <button
        onClick={() => applyChanges(groupName, dials)}
        disabled={!isPendingChanges}
      >
        Apply
      </button>
    </div>
  );
}
