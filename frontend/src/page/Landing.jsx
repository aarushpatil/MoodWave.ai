import { useNavigate } from "react-router-dom";
import brainImage from "../images/brain-lateral.png";

function Landing() {
  const navigate = useNavigate();

  function RedirectButton(e) {
    e.preventDefault();
    navigate("/generator");
  }
  return (
    <main className="bg-gradient-to-r from-backgradientbot to-backgradienttop h-screen overflow-auto pb-9">
      <div className="relative w-96 h-72 bg-black">
        {/* Music Bars */}
        {Array(5)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className={`absolute bottom-0 w-5 h-full bg-green-500 animate-pulse delay-${
                idx * 200
              } animation-duration-1000`}
              style={{ left: `${idx * 20}%` }}
            ></div>
          ))}

        {/* Brain Image */}
        <img
          src={brainImage}
          alt="Brain"
          className="absolute w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <p>Mood wave is a cool thing</p>
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
