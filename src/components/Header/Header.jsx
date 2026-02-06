import backgroundImage from "../../assets/detail-shot-patterned-wall_09.png";

import "./Header.css";

export default function Header() {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>
        Solar Energy
        <br className="line-break" /> Calculator
      </h1>
    </div>
  );
}
