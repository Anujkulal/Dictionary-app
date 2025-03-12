import React, { useState } from "react";

function Dictionary() {
  const [word, setWord] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const findWord = async () => {
    try {
      const response = await fetch(`${api_url}/${word}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Word not found`);
      }
    
      const responseData = await response.json();
      // console.log(typeof responseData)

      if(!responseData || responseData.length === 0){
        setError("failed")
        setData(null)
        console.log("failed")
      }
      setData(responseData[0]);
      setError(null)
      // data.map((value, i)=>{
      //   console.log(value)
      // })
      console.log(data);
      
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      setError("Failed to fetch!!!")
      setTimeout(() => setError(null), 3000);
      setData(null); // clear data
    }

  };
  const audioUrl = data?.phonetics?.find((p)=> p.audio)?.audio || null;
  // console.log(audioUrl)
  const playAudio = () => {
    if(audioUrl){
      new Audio(audioUrl).play();
    }
  }
  return (
    <div className="h-screen bg-gray-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Dictionary App</h1>
      <div className="flex gap-2 w-full max-w-md bg-white rounded-3xl">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full px-2 py-1 bg-white rounded-3xl outline-none pl-5"
        />
        <button
          onClick={findWord}
          className="bg-black rounded-3xl w-11 h-10 flex items-center justify-center cursor-pointer active:scale-90 transition transform duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#dbdbdb"
              d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"
            ></path>
          </svg>
        </button>
      </div>

      {
        error && (
          <p className="m-4 text-red-800 shake">{error}</p>
        )
      }

      {
        data && (
      <div className="card bg-white w-full max-w-md m-7 rounded-3xl p-5">

        {
          audioUrl && (
        <button 
        onClick={playAudio}
        className="bg-black rounded-3xl w-10 h-10 flex items-center justify-center cursor-pointer active:scale-90 transition transform duration-150">
          <svg
            width="89"
            height="62"
            viewBox="0 0 89 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.7939 17.9041C27.2853 21.365 25.1412 26.1237 25.1412 31.4113C25.1412 36.6988 27.2366 41.6018 30.7939 45.0627L34.3024 41.6018C31.671 39.0061 30.0142 35.4009 30.0142 31.3632C30.0142 27.3735 31.6223 23.9126 34.3024 21.3169L30.7939 17.856V17.9041ZM58.5211 17.9041L55.0126 21.365C57.644 23.9607 59.3008 27.4216 59.3008 31.4113C59.3008 35.4009 57.6927 39.0061 55.0126 41.6498L58.5211 45.1108C62.0297 41.6498 64.1738 36.7469 64.1738 31.4593C64.1738 26.1718 62.0784 21.413 58.5211 17.9521V17.9041ZM37.811 24.6817C36.0567 26.4122 34.9359 28.8156 34.9359 31.4593C34.9359 34.1031 36.0567 36.6507 37.811 38.3812L41.1733 34.9203C40.2962 34.055 39.8089 32.8053 39.8089 31.4593C39.8089 30.1134 40.2962 29.0559 41.1733 28.1426L37.811 24.6817ZM51.5041 24.6817L48.1417 28.1426C49.0188 29.0079 49.5061 30.1134 49.5061 31.4593C49.5061 32.8053 49.0188 34.055 48.1417 34.9203L51.5041 38.3812C53.2583 36.6507 54.3791 34.1031 54.3791 31.4593C54.3791 28.8156 53.2583 26.4122 51.5041 24.6817Z"
              fill="#E4DCDC"
            />
          </svg>
        </button>
          )
        }

        <h2 className="text-2xl">{data.word}</h2>
        <p>
          <i className="text-gray-600">{data?.phonetics[0]?.text || data?.phonetics[1]?.text}</i>
        </p>
        <ul className="list-disc list-inside">
          {/* <li><strong>Noun:</strong> {data?.meanings[0]?.definitions[0]?.definition} </li> 
          <li><strong>interjection:</strong> adjfkhjdf sd fsaj fs</li> */}
          
          {/* {
            data?.meanings.map((value, index) => (
              <li key={index}>{value}</li>
            ))
          } */}
           {data.meanings?.map((meaning, index) => (
              <li key={index} className="m-3">
                <strong>{meaning.partOfSpeech}:</strong> <span className="text-gray-800"> {meaning.definitions[0]?.definition} </span>
                {
                  meaning.synonyms?.length > 0 && (
                    <p className="bg-gray-200 rounded-2xl p-2"><strong>Synonyms:</strong> <span>{meaning.synonyms.join(", ")}</span></p>
                  )
                } 
                {
                  meaning.antonyms?.length > 0 && (
                    <p><strong>Antonyms:</strong> <span>{meaning.antonyms.join(", ")}</span></p>
                  )
                }
              </li>
            ))}
          
          {/* {
            data?.meanings?.map((meaning, index) => (
              <li key={index}>
                <strong>Antonyms:</strong> <span>{meaning.antonyms}</span>
              </li>
            ))
          } */}
          
        </ul>
      </div>
        )
      }

    </div>
  );
}

export default Dictionary;
