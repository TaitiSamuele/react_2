import { useState } from "react";
import FormDiInserimento from "./FormDiInserimento";

export default function Alunno({ alunno, popolaAlunni,setAlunno, setMostraForm, setpronto}) {
  const [inCancellazione, setInCancellazione] = useState(false);
  const [richiestaConferma, setRichiestaConferma] = useState(false);
  const [richiestaModifica, setrichiestaModifica] = useState(false);
  const [nascondiCancellazione, setnascondi] = useState(false);
  const [nome, setNome] = useState(alunno.nome);
  const [cognome, setCognome] = useState(alunno.cognome);

  async function aggiornaAlunno() {
    confermaM();
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    popolaAlunni();
  }

  async function cancellaAlunno() {
    setRichiestaConferma(false);
    setInCancellazione(true);
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "DELETE",
    });
    popolaAlunni();
  }

  function richiesta() {
    setRichiestaConferma(true);
  }
  function annulla() {
    setRichiestaConferma(false);
  }

  function richiestaM() {
    setrichiestaModifica(true);
    nascondi();
  }
  function confermaM() {
    setrichiestaModifica(false);
    mostra();
  }
  function nascondi() {
    setnascondi(true);
  }
  function mostra() {
    setnascondi(false);
  }

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }
  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  function modifica2(){
    setAlunno(alunno);
    setMostraForm(false);
    
    setpronto(false);
    setpronto(true);

    setMostraForm(true);
  }
  return (
    <div>
      {!richiestaModifica ? (
        <>
          {nome} {cognome}
          <button onClick={richiestaM}>modifica</button>
          <button onClick={modifica2}>modifica 2</button>

        </>
      ) : (
        <>
          <input
            type="text"
            value={nome}
            contentEditable="true"
            onChange={gestisciCambioNome}
          />
          <input type="text" value={cognome} onChange={gestisciCambioCognome} />
          <button onClick={aggiornaAlunno}>conferma</button>
        </>
      )}

      {!nascondiCancellazione && (
        <>
          {richiestaConferma ? (
            <span>
              Sei sicuro?
              <button onClick={cancellaAlunno}>si</button>
              <button onClick={annulla}>no</button>
            </span>
          ) : (
            <button onClick={richiesta}>Cancella</button>
          )}
        </>
      )}
      {inCancellazione && <span>in fase di cancellazione </span>}
      <hr />
    </div>
  );
}
