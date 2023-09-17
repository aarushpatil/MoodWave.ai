import logo from "../images/moodwave2.png";
import Nav from "../components/Navbar";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <div className="flex items-center justify-between p-3 px-4">
      <Link to="/">
        <img src={logo} alt="moodwave" className=" max-w-10 max-h-20" />
      </Link>
      <Nav />
    </div>
  );
}

export default Banner;
