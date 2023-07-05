import styled from './styles.module.scss';

import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, Circle, PencilSimpleLine, PlusCircle, Trash } from 'phosphor-react';
import { NoTasks } from '../NoTasks';
import { useState } from 'react';
import { TaskProps } from '../../types';

export function ToDo() {
    const [ indexTask, setIndexTask ] = useState(0) 
    const [tasks, setTasks] = useState<TaskProps[]>([
        {
            id: uuidv4(),
            title: 'Estudar React',
            isCompleted: false
        }
    ])
    const [CompletedTasks, setCompleteddTasks] = useState<number>(0)
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [ buttonLabel, setButtonLabel ] = useState(false);

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

    function getUpdateTaskTitle(index: number) {
        setButtonLabel(!buttonLabel);
        setNewTaskTitle(tasks[index].title);
        setIndexTask(index);    
    }

    function handleUpdateTaskTitle() {
        if (!newTaskTitle) {
            return alert("O campo não pode estar vazio.")
        }

        tasks[indexTask].title = newTaskTitle
        setButtonLabel(!buttonLabel);
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

    // function updateTaskTitle(index: number) {
    //     const task = tasks[index].title;
    //     setButtonLabel(!buttonLabel);
    //     setNewTaskTitle(task);

    //     tasks[index].title = newTaskTitle 
    // }

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
                        className={buttonLabel === false ? styled.btnAdd : styled.btnSave}
                        onClick={buttonLabel === false ? handleCreateNewTask : handleUpdateTaskTitle}
                    >
                        {buttonLabel === false ? 'Criar' : 'Alterar'}
                        {buttonLabel === false ? <PlusCircle size={16} /> : <PencilSimpleLine size={16} />}
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
                                            onClick={() => getUpdateTaskTitle(index)}
                                        >
                                            <PencilSimpleLine size={64} />
                                        </button>
                                        <button
                                            className={styled.btnDelete}
                                            onClick={() => handleDeleteTask(index)}
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