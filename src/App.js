import axios from "axios";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CircularProgress from "@mui/material/CircularProgress";
import gemini from './assests/gemini.jpg'
import user from './assests/user.jpg'
import Markdown from 'react-markdown'

function App() {
  const [newtext, setNewtext] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDNLfEZVA08fac69A2IFEuztVD-p81ELg4",
      method: "post",
      data: {
        contents: [{ parts: [{ text: newtext }] }],
      },
    });
    const generatedText = response.data.candidates[0].content.parts[0].text;

    const newDataItem = { user: newtext, response: generatedText };
    setData((prevData) => [...prevData, newDataItem]);

    setLoading(false);
    setNewtext("");
  };

  return (
    <div className="flex flex-col h-[92vh] items-center md:w-full md:h-screen">
      <h1 className="fixed text-3xl text-gray-600 my-4 md:my-8 font-medium " style={{ "msOverflowStyle": "none", "scrollbarWidth": "none" }}>
        Gemini Chatbot
      </h1>
      <br></br>
      <br />
      <div className="h-[87%] w-full md:w-[680px] md:max-w-screen-md overflow-y-scroll pl-[10px] pr-[10px] md:my-6">
        {data.map((item, index) => (
          <div key={index} className="w-full text-black md:flex md:flex-col">
            <div className="flex items-center">
              <img src={user} width={20} height={20} alt="User Icon" className=" md:block mr-2" />
              <div className="pl-1 font-bold">You:</div>
            </div>
            <div className="w-fit md:w-fit bg-sky-300 rounded p-2 my-2 md:ml-0">
              {item.user}
            </div>
            <div className="flex items-center">
              <img src={gemini} width={20} height={20} alt="Gemini Icon" className=" md:block mr-2" />
              <div className="pl-1 font-bold">Gemini:</div>
            </div>
            <div className="w-fit md:w-fit bg-gray-300 rounded p-2 my-2 md:ml-0">
              <Markdown>{item.response}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[10%] w-full md:w-auto relative">
        <div className="relative mb-10 pl-[10px] pr-[10px]">
          <textarea
            className="w-full md:w-[750px] h-[50px] border-2 rounded-[15px] pt-[10px] pl-[10px] placeholder-gray-600 focus:outline-none resize-x"
            type="text"
            placeholder="Enter a prompt here"
            value={newtext}
            onChange={(e) => setNewtext(e.target.value)}
          />
          <button
            onClick={eventHandler}
            type="button"
            disabled={!newtext || loading}
            className={`absolute inset-y-0 right-0 flex items-center justify-center h-[30px] w-[30px] rounded-lg mx-[20px] mt-[10px] ${
              newtext ? "bg-black text-white" : "bg-gray-200 text-white"
            }`}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <ArrowUpwardIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
