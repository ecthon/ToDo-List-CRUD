import styled from './styles.module.scss';

// import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, Circle, PencilSimpleLine, PlusCircle, Trash } from 'phosphor-react';
import { NoTasks } from '../NoTasks';
import { useEffect, useState } from 'react';
import { TaskProps } from '../../types';
 
import { MagicMotion } from 'react-magic-motion'
import api from '../../services/api';

export function ToDo() {
    const [tasks, setTasks] = useState<TaskProps[]>([
        // {
        //     id: uuidv4(),
        //     title: 'Exemplo',
        //     isCompleted: false
        // }
    ])
    const [ taskIndex, setTaskIndex ] = useState(-1) 
    const [ state, setState ] = useState(false);
    const [ countCompletedTasks, setCountCompletedTasks ] = useState<number>(0)
    const [ newTaskTitle, setNewTaskTitle ] = useState('');
    const saveId = ''

    useEffect(() => {
        findAll()
    }, [])
    console.log("TASKS",tasks)

    function findAll() {
        api.get(`/`)
        .then((response) => {
            setTasks(response.data)
        })
    }

    // POST 
    const createNewTask = async () => {
        if (!newTaskTitle) {
            return alert("O campo não pode estar vazio.")
        }

        const task: TaskProps = {
            title: newTaskTitle,
            isCompleted: false
        }

        const response = await api.post<TaskProps>(`/newtask`, task)
        console.log("RESPONSE", response.data);

        
        setTasks([...tasks, response.data]);
        setNewTaskTitle("");
    }

    const getTaskData = (index: number) => {
        setState(!state);
        setNewTaskTitle(tasks[index].title);
        setTaskIndex(index);
    }

    const handleUpdateTaskTitle = async () => {
        if (!newTaskTitle) {
            return alert("O campo não pode estar vazio.")
        }
        const { id } = tasks[taskIndex]
        await api.put(`/task/${id}`, {title: newTaskTitle})
        // tasks[taskIndex].title = newTaskTitle
        setState(!state);
        setNewTaskTitle("");
        findAll();
    }

    const handleToggleTaskCompleted = (index: number) => {
        const toggleTaskCompleted = tasks[index];
        toggleTaskCompleted.isCompleted = !toggleTaskCompleted.isCompleted;
        setTasks([...tasks]);
        updateCountTakskCompleted();
    }

    const updateCountTakskCompleted = () => {
        const taskCompleted = tasks.filter(el => el.isCompleted === false).length
        setCountCompletedTasks(taskCompleted)
    }

    const handleDeleteTask = async (id: number) => {
        await api.delete(`/task/${id}`)
        findAll()
        // tasks.splice(index,1);
        // setTasks([...tasks]);
        // updateCountTakskCompleted();
    }

    return (
        <MagicMotion>
        <main className={styled.container}>
            <div className={styled.content}>
                <div
                    className={styled.new_task_bar}
                >
                    <input
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <button
                        type='submit'
                        className={state === false ? styled.btn_add : styled.btn_save}
                        onClick={state === false ? createNewTask : handleUpdateTaskTitle}
                    >
                        {state === false ? 'Salvar' : 'Alterar'}
                        {state === false ? <PlusCircle size={16} /> : <PencilSimpleLine size={16} />}
                    </button>
                </div>
            </div>

            {/* INFORMAÇÕES: Tasks criadas/concluídas */}
            <div className={styled.content_info_tasks}>
                <div className={styled.info_tasks}>
                    <span className={styled.first_span}>Tarefas criadas</span>
                    <p className={styled.count}>{tasks.length}</p>
                </div>

                <div className={styled.info_tasks}>
                    <span className={styled.second_span}>Concluídas</span>
                    <p className={styled.count}>{countCompletedTasks} de {tasks.length}</p>
                </div>
            </div>

            <div className={styled.show_tasks}>
                {tasks.length === 0
                    ? <NoTasks />
                    : <ul>
                        {tasks.map((task,index:number) => (
                            <li key={task.id}>
                                <div className={styled.card}>
                                    <button onClick={() => handleToggleTaskCompleted(index)} >
                                        {task.isCompleted === false
                                            ? <CheckCircle color='#FFC122' size={24} weight="fill" /> 
                                            : <Circle color='#FFC122' size={24} />
                                        }
                                    </button>

                                    <p className={task.isCompleted === false
                                            ? styled.completed 
                                            : styled.title
                                        }
                                        >
                                        {task.title}
                                    </p>

                                    <div className={styled.actions}>
                                        <button
                                            className={styled.btn_edit}
                                            onClick={() => getTaskData(index)}
                                            disabled={ state === false ? false : true }
                                        >
                                            <PencilSimpleLine size={64} />
                                        </button>
                                        <button
                                            className={styled.btn_delete}
                                            onClick={() => handleDeleteTask(Number(task.id))}
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
    </MagicMotion>
    )
}