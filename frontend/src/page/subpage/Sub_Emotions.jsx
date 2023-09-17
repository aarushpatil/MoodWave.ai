import Emotions from "../../components/Emotions";

function SubEmotions({ GenerateButton, emotionJSON }) {
  return (
    <>
      <Emotions emotionJSON={emotionJSON} />
      {!emotionJSON ? (
        <div className="pt-10 flex justify-center">
          <button
            type="submit"
            id="login-button"
            onClick={(e) => GenerateButton(e)}
            className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
          >
            Generate
          </button>
        </div>
      ) : (
        <h1>No emotions yet</h1>
      )}
    </>
  );
}
export default SubEmotions;
