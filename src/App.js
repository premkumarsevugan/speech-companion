import { MdMicExternalOff } from 'react-icons/md';
import { MdMicExternalOn } from 'react-icons/md';
import { RxSpeakerOff } from 'react-icons/rx';
import { RxSpeakerLoud } from 'react-icons/rx';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
  const [vol,setVol] = useState(1);
  const speakContent = () => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById('textbox').innerHTML;
    msg.volume=vol;
    window.speechSynthesis.speak(msg);
  }
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();  
  const reset = () => {
    window.location.reload();
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="App">
      <div className='volume'>
      <RxSpeakerOff className='icon'/>
        <input type="range" min="0" max="1" step="0.1" onChange={(e) => setVol(e.target.value)} />
      <RxSpeakerLoud className='icon'/>
      </div>
      <div className='bclass'>
        <button onClick={reset}>Reset</button>
      </div>
      
      <div className="main">
        <div className="left" onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening }>
          {
            listening ? <MdMicExternalOn className='icon'/> : <MdMicExternalOff className='icon'/>
          }
          
        </div>
        
        <div contentEditable className="textbox" id='textbox'>
        {
          transcript ? <p>{transcript}</p> : <p>Click Mic Button For Convert Your Voice to Text and
          Click Speaker Button Reading The Contents of the Textbox</p>
        }
        </div>
        <div className="right" onClick={speakContent}>
          {
            listening ? <RxSpeakerOff className='icon'/> : <RxSpeakerLoud className='icon'/>
          }
        
        </div>
      </div>
    </div>
  );
}

export default App;
