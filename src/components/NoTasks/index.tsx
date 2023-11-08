import styled from './styles.module.scss';
import clipBoardImg from '../../assets/clipboard.svg' 

export function NoTasks() {
    return (
        <div className={styled.noTasks}>
            <img src={clipBoardImg} alt='Icone clipboard'/>
            <p>
                <strong>Você ainda não tem tarefas cadastradas</strong><br />
                Crie tarefas e organize seus itens a fazer
            </p>
        </div>
    )
}