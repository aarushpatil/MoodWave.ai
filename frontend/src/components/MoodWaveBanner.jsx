import logo from "../images/moodwave.png";
function Banner() {
  return (
    <div className="flex items-center justify-center p-3 ">
      <img src={logo} alt="moodwave" className=" max-w-10 max-h-20" />
    </div>
  );
}

export default Banner;
