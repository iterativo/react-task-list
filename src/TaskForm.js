import React, {useState} from "react";
import PropTypes from "prop-types";
import {formatDate} from "./dateUtils";
import {createTask} from "./db";

const TaskForm = ({addTask}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState(formatDate(new Date()));

    const clearForm = () => {
        setName("");
        setDescription("");
        setTargetDate(formatDate(new Date()));
    }

    const isValid = name && targetDate;

    const handleSubmit = async e => {
        e.preventDefault();
        if (!isValid) return;
        const task = await createTask({name, description, targetDate, isCompleted: false});
        addTask(task);
        clearForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="required" htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                className="input"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                className="input"
                onChange={e => setDescription(e.target.value)}
                value={description}
            />
            <label className="required" htmlFor="target-date">Target Date</label>
            <input
                id="target-date"
                type="date"
                className="input"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
            />
            <div/>
            <input
                type="submit"
                disabled={!isValid}
                value="Add Task"
            />
        </form>
    );
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export default TaskForm;
