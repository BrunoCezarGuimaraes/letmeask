import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    //serve a ter acesso ao valor do input, mais especificamente ao nome da sala
    const [newRoom, setNewRoom] = useState('');

    //Prevene o comportamento padrao do formulario de enviar a uma outra pagina
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        //esse if impede de criar salas sem nomes, o trim tira os espaços na string
        if (newRoom.trim() === '') {
            return;
        }

        //referencia a dados dentro do banco de dados, nesse caso rooms, mais especificamente esta criando uma categoria rooms
        const roomRef = database.ref('rooms');

        //aqui ira jogar os dados para criar uma nova room no banco de dados
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                </div>

                <form onSubmit={handleCreateRoom}>
                    <input
                        type="text"
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                    />
                    <Button type="submit">
                        Criar sala
                    </Button>
                </form>
                <p>
                    Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                </p>
            </main>
        </div>
    )
}