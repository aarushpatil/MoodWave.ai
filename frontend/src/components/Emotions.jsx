import loader from "../images/reload.png";

const Emotions = ({ emotionJSON }) => {
  return (
    <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full">
      {emotionJSON && emotionJSON.length > 0 ? (
        emotionJSON.map((emotion) => {
          const { name, score } = emotion;
          return (
            <div className="grid grid-cols-3 text-white py-9 px-6 " key={name}>
              <div className="font-semibold justify-self-start">{name}</div>
              <div className="font-semibold justify-self-stretch">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className ={`h-full bg-green-500 ${dynamicWidth}`} style={{ width: `${Math.floor(score * 100)}%` }}> </div>
                </div>
              </div>
              <div className="font-semibold justify-self-end">
                {Math.floor(score * 100)}%
              </div>
            </div>
          );
        })
      ) : (
        <div className=" p-36 py-48 w-full text-center">
          <img src={loader} className=" animate-spin" />
        </div>
      )}
    </div>
  );
};

const score = 0.75; // Replace this with your score value

function MyComponent() {
  const dynamicWidth = `${Math.floor(score * 100)}%`;

  return (
    <div style={{ width: dynamicWidth }}>
      {/* Your content here */}
    </div>
  );
}

export default Emotions;