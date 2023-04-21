import styled from './styles.module.scss';

export function NoTasks() {
    return (
        <div className={styled.noTasks}>
            <img src="../src/assets/clipboard.svg" />
            <p>
                <strong>Você ainda não tem tarefas cadastradas</strong><br />
                Crie tarefas e organize seus itens a fazer
            </p>
        </div>
    )
}