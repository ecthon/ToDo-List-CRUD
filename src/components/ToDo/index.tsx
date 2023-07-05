import styled from './styles.module.scss';

import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, Circle, PencilSimpleLine, PlusCircle, Trash } from 'phosphor-react';
import { NoTasks } from '../NoTasks';
import { useState } from 'react';
import { TaskProps } from '../../types';

export function ToDo() {
    const [tasks, setTasks] = useState<TaskProps[]>([
        {
            id: uuidv4(),
            title: 'Exemplo',
            isCompleted: false
        }
    ])
    const [ taskIndex, setTaskIndex ] = useState(0) 
    const [ state, setState ] = useState(false);
    const [ countCompletedTasks, setCountCompletedTasks ] = useState<number>(0)
    const [ newTaskTitle, setNewTaskTitle ] = useState('');

    const createNewTask = () => {
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

    const getTaskData = (index: number) => {
        setState(!state);
        setNewTaskTitle(tasks[index].title);
        setTaskIndex(index);
    }

    const handleUpdateTaskTitle = () => {
        if (!newTaskTitle) {
            return alert("O campo não pode estar vazio.")
        }

        tasks[taskIndex].title = newTaskTitle
        setState(!state);
        setNewTaskTitle("");
    }

    const handleToggleTaskCompleted = (index: number) => {
        const toggleTaskCompleted = tasks[index];
        toggleTaskCompleted.isCompleted = !toggleTaskCompleted.isCompleted;
        setTasks([...tasks]);
        updateCountTakskCompleted();
    }

    const updateCountTakskCompleted = () => {
        const taskCompleted = tasks.filter(el=>el.isCompleted).length
        setCountCompletedTasks(taskCompleted)
    }

    const handleDeleteTask = (index: number) => {
        tasks.splice(index,1);
        setTasks([...tasks]);
        updateCountTakskCompleted();
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
                        className={state === false ? styled.btnAdd : styled.btnSave}
                        onClick={state === false ? createNewTask : handleUpdateTaskTitle}
                    >
                        {state === false ? 'Criar' : 'Alterar'}
                        {state === false ? <PlusCircle size={16} /> : <PencilSimpleLine size={16} />}
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
                    <p className={styled.count}>{countCompletedTasks} de {tasks.length}</p>
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
                                        {task.isCompleted === false
                                            ? <Circle color='#8284FA' size={24} /> 
                                            : <CheckCircle color='#2d1e9f' size={24} weight="fill" />
                                        }
                                    </button>

                                    <p className={task.isCompleted === false
                                            ? styled.title 
                                            : styled.completed}
                                        >
                                        {task.title}
                                    </p>

                                    <div className={styled.actions}>
                                        <button
                                            className={styled.btnEdit}
                                            onClick={() => getTaskData(index)}
                                            disabled={ state === false ? false : true }
                                        >
                                            <PencilSimpleLine size={64} />
                                        </button>
                                        <button
                                            className={styled.btnDelete}
                                            onClick={() => handleDeleteTask(index)}
                                            disabled={ state === false ? false : true }
                                        >
                                            <Trash size={64} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ul>}
            </div>
        </main>
    )
}