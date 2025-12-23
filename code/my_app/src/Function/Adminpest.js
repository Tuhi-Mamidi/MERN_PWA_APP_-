import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";

import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
const MySpeechComponent = () => {
  
    
  const { t,i18n } = useTranslation();
  const lng=i18n.language
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span className="no-support">🚫 ఈ బ్రౌజర్ వాయిస్ గుర్తింపు (Speech Recognition)కి మద్దతు ఇవ్వడం లేదు.</span>;
  }
  console.log(transcript)
   const username = localStorage.getItem("username"); // 
  console.log("Username in Adminpest:", username);
  const startListeningTelugu = () => {
    SpeechRecognition.startListening({ continuous: true, language:lng==='te'?'te-IN':'en-US' }); 
  };
  
console.log("Listening:", listening);
const handle=()=>{
  
  axios.post("https://backend-deployment-wkbv.onrender.com/mess/createm",{
    meg:transcript,
    phone:username
  }).then(res=>{
    console.log("success");
    toast.success("✅ పంపబడింది!", { autoClose: 2000 });

  }).catch(err=>{
    console.log(err)
  })
}

console.log(transcript);
  return (
    <div className="speech-card">
      <h2 className="speech-title">{lng==='te'?"వాయిస్ గుర్తింపు":"Voice Message" }</h2>
       <div className="speech-info" style={{whiteSpace: 'pre-line'}}>
     {t('steps')}
  </div>
      <div className="btn-group">
        <button onClick={startListeningTelugu} className="btn btn-start">
          🎙️ {t('start')}
        </button>
        <button onClick={SpeechRecognition.stopListening} className="btn btn-stop">
          ⏹️ {t('end')}
        </button>
        <button onClick={resetTranscript} className="btn btn-reset">
          ♻️ {t('reset')}
        </button>
        <button  onClick={handle} className="btn btn-submit">
          📤 {t('send')}
        </button>
      </div>

      <div className="transcript-box">
        <p className="transcript-label">📝 {t('S')}</p>
        <p className="transcript-text">{transcript || "  "}</p>
      </div>
    </div>
  );
};

function Adminpest() {
  return (
    <>
    
      <MySpeechComponent  />
      
    </>
  );
}

export default Adminpest;

/*import React from "react";
function Pesticide(){
    return (<>
   
      <div className="heading" >
         Booking</div>
      
    </>)
}
export default Pesticide;*/

/*import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MySpeechComponent = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListeningTelugu = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'te-IN' }); 
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <button onClick={startListeningTelugu}>Start Listening (Telugu)</button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <p className="mt-2">Transcript: {transcript}</p>
    </div>
  );
};

function Pesticide() {
  return (
    <>
      <div className="heading">Booking</div>
      <MySpeechComponent />
    </>
  );
}

export default Pesticide;

/*import React from "react";
function Pesticide(){
    return (<>
   
      <div className="heading" >
         Booking</div>
      
    </>)
}
export default Pesticide;*/

