import drake from "../images/godsplan.jpg";

const Songs = ({ songsJSON }) => {
  return (
    <div className="font-Lato grid grid-rows-3 grid-cols-2 w-full gap-4 text-white">
      {songsJSON.map((song) => {
        const { name, artist, image } = song;
        return (
          <div className="flex flex-col items-center" key={name}>
            <img
              src={drake}
              alt={name}
              className="w-full object-cover aspect-square rounded-xl hover:scale-105 duration-300"
            />
            <h1 className="text-xl">{name}</h1>
            <p className="text-sm text-gray-400">{artist}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
