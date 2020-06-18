import React, {useEffect, useState} from "react";
import {cloneDeep, filter} from 'lodash';
import "./App.css";
import {deleteTask, readTasks, updateTask} from "./db";
import {formatDate} from "./dateUtils";
import Task from "./Task";
import TaskForm from "./TaskForm";

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        readTasks().then((tasks) => setTasks(tasks));
    }, []);

    const addTask = (task) => setTasks([...tasks, task]);

    const completeTask = async id => {
        const clonedTasks = cloneDeep(tasks);
        const task = clonedTasks.find(t => t.id === id);
        task.isCompleted = true;
        task.completionDate = formatDate(new Date());
        await updateTask(task);
        setTasks(clonedTasks);
    };

    const removeTask = async id => {
        await deleteTask(id);
        setTasks(filter(tasks, t => t.id !== id));
    };

    return (
        <div className="app" data-testid="app">
            <div className="task-list">
                <h2>Tasks: <span data-testid="task-count">{tasks.length}</span></h2>
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        completeTask={completeTask}
                        removeTask={removeTask}
                    />
                ))}
            </div>
            <div className="task-form">
                <h3>Add New Task</h3>
                <TaskForm addTask={addTask} />
            </div>
        </div>
    );
}

export default App;
