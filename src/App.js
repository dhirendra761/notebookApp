import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { levenshteinDistance } from './utility';

function App() {

  const [paragraph, setParagraph] = useState('');
  const [word, setWord] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [similerWord, setSimilerWord] = useState('');
  const [showResult, setShowResult] = useState(false);


  const [isExistAnArray, setisExistAnArray] = useState(false);

  const checkSpec = () => {
    
    setShowResult(true);

    //Determined frequency of entry
    const paraContent = paragraph?.split(' ');

    setisExistAnArray(paraContent.indexOf(word) > -1);

    const freq = paraContent.filter(function (x) { return x === word; }).length;
    setFrequency(freq);

    // List of similar words
    const restOfWord = paraContent.filter(function (x) { return x !== word; });

    // Check Levenshtein Distance is 1 only
    const similerWords = restOfWord.filter(item => {
      return levenshteinDistance(item, word) === 1;
    })

     // Find Similar word
    setSimilerWord(similerWords?.join(', '));
  }


  return (<React.Fragment>
    <h2 className="text-center m-2"> Notebook Editor</h2>
    <div className="App">
     
      <div className="editor">
        <CKEditor
          
          editor={ClassicEditor}
          data={paragraph}
          onBlur={(event, editor) => {
            const data = editor.getData();
            setParagraph(data?.replace(/<[^>]+>/g, '')?.trim())
          }} 
          data-testid="chediter"/>
      </div>
      <div>
        <span> Match word: <input type="text" value={word} onChange={(e) => setWord(e.target.value)} /></span>
        <button className="mr-4 btn-dark" onClick={checkSpec}> Validate </button>

        {showResult && <div><hr/>
          <h6>Status: {isExistAnArray ? <span className="badge text-white bg-success">Matched</span> : <span className="badge bg-danger text-white">No Match</span> }</h6>
          {frequency > 0 && <h6>Frequency: <span className="badge bg-warning">{frequency}</span></h6>}
          {similerWord && <h6>Similar Word: <span className="card bg-lightBlue">{similerWord}</span></h6>}
        </div>}
      </div>
    </div>
    </React.Fragment>
  );
}

export default App;
