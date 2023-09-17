import { useNavigate } from "react-router-dom";
import moodwave from "../images/moodwave.png";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();

  function RedirectButton(e) {
    e.preventDefault();
    navigate("/generator");
  }
  return (
    <main className="bg-gradient-to-r from-backgradientbot to-backgradienttop h-screen overflow-auto pb-9">
      <div className="flex justify-between items-center p-3 max-w-[1240px] mx-auto px-4">
        <img src={moodwave} alt="moodwave" className=" max-w-10 max-h-20" />
        <Navbar />
      </div>

      <div className="pt-10 flex justify-center">
        <button
          type="submit"
          id="scan-button"
          onClick={(e) => RedirectButton(e)}
          className={` bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold `}
        >
          Begin
        </button>
      </div>
    </main>
  );
}
export default Landing;
