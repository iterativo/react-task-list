import React from 'react';
import {act, render, wait} from '@testing-library/react';
import App from '../App';
import {readTasks} from "../db";
import {formatDate} from "../dateUtils";

jest.mock("../db");

it('renders', async () => {
    readTasks.mockReturnValue(Promise.resolve([]));
    await act(async () => {
        const {getByTestId} = render(<App/>);
        expect(getByTestId('app')).toBeInTheDocument();
        expect(getByTestId('task-count').textContent).toEqual('0');
    });
});

it('renders the fetched tasks and shows the task count', async () => {
    const mockTask1 = {
        id: '1',
        name: 'foo',
        description: 'task 1',
        targetDate: formatDate(new Date()),
    };
    const mockTask2 = {
        id: '2',
        name: 'bar',
        description: 'task 2',
        targetDate: formatDate(new Date()),
    };
    readTasks.mockReturnValue(Promise.resolve([mockTask1, mockTask2]));
    await act(async () => {
        const {getByTestId, getAllByTestId} = render(<App/>);
        await wait(() => {
            expect(getByTestId('task-count').textContent).toEqual('2');
            const tasks = getAllByTestId('task');
            expect(tasks).toHaveLength(2);
            assertTask(tasks[0], mockTask1);
            assertTask(tasks[1], mockTask2);
        });
    });
})

function assertTask(actualNode, expectedTask) {
    expect(actualNode.getElementsByTagName('div')[0].textContent).toEqual(expectedTask.id);
    expect(actualNode.getElementsByTagName('div')[1].textContent).toEqual(`Name: ${expectedTask.name}`);
    expect(actualNode.getElementsByTagName('div')[2].textContent).toEqual(`Description: ${expectedTask.description}`);
    expect(actualNode.getElementsByTagName('div')[3].textContent).toEqual(`Target Date: ${expectedTask.targetDate}`);
}
