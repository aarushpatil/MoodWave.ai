import Cam from "../../components/WebCamera";

function SubWebcam({ setEmotionJSON, image, setImage, ScanButton }) {
  return (
    <div className="pt-10">
      <div className=" backdrop-blur-sm bg-white/10 rounded-3xl p-4 max-w-xl sm:max-w-xl md:max-w-xl">
        <Cam
          setEmotionJSON={setEmotionJSON}
          image={image}
          setImage={setImage}
        />
      </div>

      <div className="pt-10 flex justify-center">
        <button
          disabled={image !== "" ? false : true}
          type="submit"
          id="scan-button"
          onClick={(e) => ScanButton(e)}
          className={` bg-button shadow-md px-8 py-2 rounded-full text-[#F2EEE4] font-Lato text-center text-lg font-bold ${
            image !== "" ? false : true ? "opacity-50" : "opacity-100"
          }`}
        >
          Scan
        </button>
      </div>
    </div>
  );
}
export default SubWebcam;
