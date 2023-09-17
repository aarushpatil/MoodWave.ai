import loader from "../images/reload.png";

const Emotions = ({ emotionJSON }) => {
  return (
    <div className="pt-10">
      <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full max-w-max sm:max-w-xl md:max-w-xl">
        {emotionJSON && emotionJSON.length > 0 ? (
          emotionJSON.map((emotion) => {
            const { name, score } = emotion;
            return (
              <div
                className="grid grid-cols-3 text-[#F2EEE4] py-9 px-3 "
                key={name}
              >
                <div className="font-semibold justify-self-start">{name}</div>
                <div className="font-semibold justify-self-stretch py-2">
                  <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-green-500`}
                      style={{ width: `${Math.floor(score * 100)}%` }}
                    >
                      {" "}
                    </div>
                  </div>
                </div>
                <div className="font-semibold justify-self-end">
                  {Math.floor(score * 100)}%
                </div>
              </div>
            );
          })
        ) : (
          <div className=" px-10 py-20  text-center w-full">
            <img src={loader} className=" animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

const score = 0.75; // Replace this with your score value

function MyComponent() {
  const dynamicWidth = `${Math.floor(score * 100)}%`;

  return <div style={{ width: dynamicWidth }}>{/* Your content here */}</div>;
}

export default Emotions;
