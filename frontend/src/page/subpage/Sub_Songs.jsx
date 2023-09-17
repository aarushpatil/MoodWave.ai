import Songs from "../../components/Songs";

function SubSongs({ RedoButton, songsJSON }) {
  return (
    <>
      <Songs songsJSON={songsJSON} />
      <div className="pt-10 flex justify-center">
        <button
          type="submit"
          id="ScanButton"
          onClick={(e) => RedoButton(e)}
          className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
        >
          Again
        </button>
      </div>
    </>
  );
}
export default SubSongs;
