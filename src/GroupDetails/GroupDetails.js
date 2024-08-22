import { useState } from "react";

import "./GroupDetails.css";

function DialDetail({ name, image, url }) {
  return (
    <li>
      {name} - {url} - {image}
    </li>
  );
}

export default function GroupDetails({
  groupDials,
  groupName,
  setShowDetails,
}) {
  const [dials, setDials] = useState([...groupDials]);

  return (
    <div className="GroupDetails">
      <h1>{groupName}</h1>
      <ul>
        {dials.map((dial) => (
          <DialDetail {...dial} />
        ))}
      </ul>
      <button onClick={() => setShowDetails(false)}>Cancel</button>
      <button>Apply</button>
    </div>
  );
}
