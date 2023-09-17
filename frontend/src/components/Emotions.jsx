const Emotions = ({ emotionJSON }) => {
  return (
    <div className="">
      {emotionJSON && emotionJSON.length > 0 ? (
        emotionJSON.map((emotion) => {
          const { name, score } = emotion;
          return (
            <div className="grid grid-cols-3 text-white p-5 px-6 " key={name}>
              <div className="font-semibold justify-self-start">{name}</div>
              <div className="font-semibold justify-self-stretch">
                <div className="bg-red-500">-</div>
              </div>
              <div className="font-semibold justify-self-end">
                {Math.floor(score * 100)}%
              </div>
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
