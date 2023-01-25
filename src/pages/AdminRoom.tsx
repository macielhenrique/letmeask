import { useParams,useNavigate } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'; 
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import "../styles/room.scss";
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  const history= useNavigate()
  // const {user} = useAuth();
  const params= useParams<RoomParams>();
  const roomId= params.id;
 
  const {title,questions}= useRoom(roomId) 

  async function handleEndRoom(){
    await database.ref (`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history('/')
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm("Tem certeza que deseja excluir essa pergunta?")){
     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion (questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
  

  return(
   <div id="page-room">
    <header>'
      <div className="content">
        <img src={logoImg} alt="logo letmeask" />
        <div>
          {roomId ? <RoomCode code={roomId}/> : null}
          <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button> 
        </div>
      </div>
    </header>

    <main>
      <div className="room-title">
        <h1>Sala {title} </h1>
        { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
      </div>

      <div className="question-list">
      {questions.map(question=>{
        return(
          <Question
          key={question.id}
          content={question.content}
          author={question.author}
          isAnswered={question.isAnswered}
          isHighlighted={question.isHighlighted}
          >

          {!question.isAnswered &&(
               <>
               <button
               type="button"
               onClick={()=> handleCheckQuestionAsAnswered(question.id)}
               >
                 <img src={checkImg} alt="Marcar a perguntar como lida" />
               </button>
   
               <button
               type="button"
               onClick={()=> handleHighLightQuestion(question.id)}
               >
                 <img src={answerImg} alt="Dar destaque á pergunta" />
               </button>
               </>
          )}

            <button
            type="button"
            onClick={()=> handleDeleteQuestion(question.id)}
            >
              <img src={deleteImg} alt="remover pergunta" />
            </button>
          </Question>
        )
      })}
      </div>
    </main>
   </div>
  );
} 