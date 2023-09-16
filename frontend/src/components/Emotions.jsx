const Emotions = ({ emotionJSON }) => {
  return (
    <div>
      {emotionJSON && emotionJSON.length > 0 ? (
        emotionJSON.map((emotion) => {
          const { name, score } = emotion;
          return (
            <div
              className="flex justify-between text-white gap-20 p-5 px-6"
              key={name}
            >
              <div className="font-semibold">{name}</div>
              <div className="font-semibold">_______________</div>
              <div>{score}%</div>
            </div>
          );
        })
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
};

export default Emotions;
