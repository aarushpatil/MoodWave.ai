import logo from "../images/moodwave2.png";
import Nav from "../components/Navbar";
function Banner() {
  return (
    <div className="flex items-center justify-between p-3 px-4">
      <img src={logo} alt="moodwave" className=" max-w-10 max-h-20" />
      <Nav />
    </div>
  );
}

export default Banner;
