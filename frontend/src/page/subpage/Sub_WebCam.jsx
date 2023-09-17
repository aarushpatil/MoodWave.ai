import Cam from "../../components/WebCamera";

function SubWebcam({ setEmotionJSON, image, setImage, ScanButton }) {
  return (
    <>
      <div className=" backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full">
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
          className={` bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold ${
            image !== "" ? false : true ? "opacity-50" : "opacity-100"
          }`}
        >
          Scan
        </button>
      </div>
    </>
  );
}
export default SubWebcam;
