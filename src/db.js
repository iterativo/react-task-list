import * as firebase from "firebase";
import config from './config';

let tasksRef;

export const init = () => {
    firebase.initializeApp(config);
    const databaseRef = firebase.database().ref();
    tasksRef = databaseRef.child("tasks");
}

export const createTask = async (task) => {
    const ref = await tasksRef.push(task);
    return { ...task, id: ref.key };
}

export const readTasks = async () => {
    const snapshot = await tasksRef.once("value");
    const values = snapshot.val() || [];
    return Object.entries(values).map(([id, task]) => ({ id, ...task }));
}

export const deleteTask = async (id) => {
    await tasksRef.child(id).remove();
}

export const updateTask = async (task) => {
    await tasksRef.child(task.id).set(task);
}
