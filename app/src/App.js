import './App.css';
import Alunno from './Alunno'
import FormDiInserimento from './FormDiInserimento'
import {useState, useEffect} from 'react'

function App() {

  useEffect(() => {
    popolaAlunni();
  },[])

  const [alunni, setAlunni] = useState([]);
  const [pronto, setpronto] = useState(false);
  const [mostraForm, setMostraForm] = useState(false);
  const [alunno, setAlunno] = useState(null);


  async function popolaAlunni(){
    setpronto(false);

    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const array = await response.json();
    setAlunni(array);
    setpronto(true);
  }

  return (
    <div className="App">
      {
        pronto ?
          alunni.map(a => (
            <Alunno alunno={a} popolaAlunni={popolaAlunni} setAlunno={setAlunno} setMostraForm={setMostraForm} setpronto={setpronto}key={a.id} />
          ))
        :
         <div>Loading...</div>
      }

      <button onClick={() => setMostraForm(true)}>Inserisci nuovo alunno</button>
      { mostraForm &&
        <div>
          <div><FormDiInserimento popolaAlunni={popolaAlunni} alunno={alunno} /></div>
          <button onClick={() => setMostraForm(false)}>Annulla inserimento</button>
        </div>
      }
    </div>
  );
}

export default App;