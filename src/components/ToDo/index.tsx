import styled from './styles.module.scss';

import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, Circle, PlusCircle, Trash } from 'phosphor-react';
import { NoTasks } from '../NoTasks';
import { useState } from 'react';

export interface TaskProps {
    id: string;
    title: string;
    isCompleted: boolean;
}

export function ToDo() {
    const [tasks, setTasks] = useState<TaskProps[]>([
        {
            id: uuidv4(),
            title: 'Estudar React',
            isCompleted: false
        }
    ])
    const [CompletedTasks, setCompleteddTasks] = useState<number>(0)
         const [newTaskTitle, setNewTaskTitle] = useState('');

    function handleCreateNewTask() {
        if (!newTaskTitle) {
            return alert("O campo não pode estar vazio.")
        }

        const task: TaskProps = {
            id: uuidv4(),
            title: newTaskTitle,
            isCompleted: false
        }
        
        setTasks([...tasks, task]);
        setNewTaskTitle("");
    }

    function handleToggleTaskCompleted(index: number) {
        const toggleTaskCompleted = tasks[index];
        toggleTaskCompleted.isCompleted = !toggleTaskCompleted.isCompleted;
        // const toggleTaskCompleted = {...tasks[index],isCompleted:!tasks[index].isCompleted}

        // tasks.splice(index,1,toggleTaskCompleted)
        // let arrayAtualizado:TaskProps[]=[]
        // Object.assign(arrayAtualizado,tasks)
        // setTasks(arrayAtualizado);
        setTasks([...tasks]);
        updateTakskCompleted();
    }

    function updateTakskCompleted(){
        console.log('tasks ', tasks)
        const taskCompleted = tasks.filter(el=>el.isCompleted).length
        setCompleteddTasks(taskCompleted)
    }

    function handleDeleteTask(index: number) {
        tasks.splice(index,1);
        setTasks([...tasks]);
        updateTakskCompleted();
    }

    return (
        <main className={styled.container}>
            <div className={styled.content}>
                <div
                    className={styled.newTaskBar}
                >
                    <input
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <button
                        type='submit'
                        className={styled.btnAdd}
                        onClick={handleCreateNewTask}
                    > Criar <PlusCircle size={16} />
                    </button>
                </div>
            </div>

            {/* INFORMAÇÕES: Tasks criadas/concluídas */}
            <div className={styled.contentInfoTasks}>
                <div className={styled.infoTasks}>
                    <span className={styled.firstSpan}>Tarefas criadas</span>
                    <p className={styled.count}>{tasks.length}</p>
                </div>

                <div className={styled.infoTasks}>
                    <span className={styled.secondSpan}>Concluídas</span>
                    <p className={styled.count}>{CompletedTasks} de {tasks.length}</p>
                </div>
            </div>

            <div className={styled.showTasks}>
                {tasks.length === 0
                    ? <NoTasks />
                    : <ul>
                        {tasks.map((task,index:number) => (
                            <li key={task.id}>
                                <div className={styled.card}>
                                    <button onClick={() => handleToggleTaskCompleted(index)} >
                                        {task.isCompleted === false ? <Circle color='#4EA8DE' size={24} /> : <CheckCircle color='#9747FF' size={24} weight="fill" />}
                                    </button>

                                    <p className={task.isCompleted === false ? styled.title : styled.Completed}>
                                        {task.title}
                                    </p>

                                    <button
                                        className={styled.btnDelete}
                                        onClick={() => handleDeleteTask(index)}
                                    >
                                        <Trash size={24} />
                                    </button>
                                </div>
                            </li>
                        ))}

                    </ul>}
            </div>
        </main>
    )
}