import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import "../styles/room.scss";

type RoomParams = {
  id: string;
}

export function Room(){
  const params= useParams<RoomParams>();

  return(
   <div id="page-room">
    <header>'
      <div className="content">
        <img src={logoImg} alt="logo letmeask" />
        {params.id ? <RoomCode code={params.id}/> : null}
      </div>
    </header>

    <main>
      <div className="room-title">
        <h1>Sala react</h1>
        <span>4 perguntas</span>
      </div>

      <form>
        <textarea 
        placeholder= "O que você quer perguntar ?"
        />

        <div className="form-footer">
          <span>Para enviar uma perguntar, <button>faça seu login</button> </span>
          <Button type="submit">Enviar uma pergunta</Button>
        </div>
      </form>
    </main>
   </div>
  );
} 