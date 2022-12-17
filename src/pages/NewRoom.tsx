import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import {Button} from '../components/Button';

import '../styles/auth.scss'

export function NewRoom(){
  return (
    <div id="page-auth">
    <aside>
      <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
      <strong>Crie salas de Q&amp;A</strong>
      <p>tire as dúvidas da sua audiência em tempo-real  </p>
    </aside>
    <main>
      <div className='main-content'>
        <img src={logoImg} alt="letmeask" />
        <h2>Criar uma nova sala</h2>
        <form>
          <input 
          type="text"
          placeholder='Nome da sala'
          />
          <Button type='submit'>
           Criar sala 
          </Button>
        </form>
        <p>
        quer entrar em uma sala existente? <a href="/">Clique aqui</a>
        </p>
      </div>
    </main>
  </div>
  )
  
}