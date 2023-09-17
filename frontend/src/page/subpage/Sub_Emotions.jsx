import Emotions from "../../components/Emotions";

function SubEmotions({ GenerateButton, emotionJSON }) {
  return (
    <>
      <Emotions emotionJSON={emotionJSON} />

      <div className="pt-10 flex justify-center">
        <button
          disabled={emotionJSON.length <= 0 ? true : false}
          type="submit"
          id="login-button"
          onClick={(e) => GenerateButton(e)}
          className={`bg-button shadow-md px-8 py-2 rounded-full text-[#F2EEE4] font-Lato text-center text-lg font-bold ${
            emotionJSON.length <= 0 ? "opacity-50" : "opacity-100"
          }`}
        >
          Generate
        </button>
      </div>
    </>
  );
}
export default SubEmotions;
