import { useState } from "react";

export default function FormDiInserimento({ popolaAlunni, alunno }) {
  const [nome, setNome] = useState(alunno === null ? "" : alunno.nome);
  const [cognome, setCognome] = useState(alunno === null ? "" : alunno.cognome);

  async function salvaAlunno() {
    if (alunno == null) {
      await fetch(`http://localhost:8080/alunni`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome, cognome: cognome }),
      });
    } else {
      await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome, cognome: cognome }),
      });
    }
    popolaAlunni();
  }

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }
  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  return (
    <>
      <h1>Form di inseriemto</h1>
      <div>
        Nome: <input type="text" onChange={gestisciCambioNome} value={nome}/>
      </div>
      <div>
        Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome}/>
      </div>
      <div>
        <button onClick={salvaAlunno}>salva</button>
      </div>
      {nome} <br />
      {cognome}
    </>
  );
}
