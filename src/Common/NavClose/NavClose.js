import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

import "./NavClose.css";

export default function NavClose({ onClose }) {
  return (
    <nav className="NavClose">
      <ul>
        <li title="Close Settings" onClick={onClose}>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </li>
      </ul>
    </nav>
  );
}
