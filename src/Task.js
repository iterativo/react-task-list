import React from "react";
import PropTypes from "prop-types";

const Task = ({
    task,
    completeTask,
    removeTask
}) => (
    <div
        className="task"
        style={{textDecoration: task.isCompleted ? "line-through" : ""}}
        data-testid="task"
    >
        <div id="task-id">{task.id}</div>
        <div><strong>Name</strong>: {task.name}</div>
        <div><strong>Description</strong>: {task.description}</div>
        <div><strong>Target Date</strong>: {task.targetDate}</div>
        <div><strong>Completion Date</strong>: {task.completionDate ? task.completionDate : 'Pending'}</div>
        <div className="actions">
            <button onClick={() => removeTask(task.id)}>Delete</button>
            {
                !task.isCompleted &&
                <button onClick={() => completeTask(task.id)}>Complete</button>
            }
        </div>
    </div>
);

Task.protoType = {
    task: PropTypes.object.isRequired,
    completeTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
}

export default Task;
