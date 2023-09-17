const Songs = ({ songsJSON }) => {
  return (
    <div className="font-Lato grid grid-rows-3 grid-cols-2 w-full gap-4 text-white">
      {songsJSON.map((song) => {
        const { id, author, imageUrl, playUrl, title } = song;
        return (
          <div className="flex flex-col items-center" key={id}>
            <a href={playUrl}>
              <img
                src={imageUrl}
                alt={`${title} by ${author}`}
                className="w-full object-cover aspect-square rounded-xl hover:scale-105 duration-300"
              />
            </a>
            <h1 className="text-xl">{title}</h1>
            <p className="text-sm text-gray-400">{author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
