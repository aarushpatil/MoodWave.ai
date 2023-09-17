import { useNavigate } from "react-router-dom";
import moodwave from "../images/moodwave2.png";
import Navbar from "../components/Navbar";
import "../Landing.css";

function Landing() {
  const navigate = useNavigate();

  function RedirectButton(e) {
    e.preventDefault();
    navigate("/generator");
  }
  return (
    <main className="bg-gradient-to-r from-backgradientbot to-backgradienttop h-screen overflow-auto pb-9 px-4">
      <div className="flex justify-between items-center py-4 max-w-[1240px] mx-auto">
        <img src={moodwave} alt="moodwave" className=" max-w-10 max-h-20" />
        <Navbar />
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full py-10">
          <div class="center">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
          <p className="text-center text-[#F2EEE4] text-2xl  pt-10">
            Use AI to analyze your emotional state and create a curated song
            selection made just for you and your mood.
          </p>
          <div className="pt-5 flex justify-center">
            <button
              type="submit"
              id="scan-button"
              onClick={(e) => RedirectButton(e)}
              className={` bg-button shadow-md px-8 py-2 rounded-full text-[#F2EEE4] font-Lato text-center text-lg font-bold `}
            >
              Begin
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Landing;
