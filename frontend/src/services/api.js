import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});




export const getTasks = async () => {
    try {

        const response = await api.get('/tasks');
        return response.data;
    }
    catch(error)
    {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}


export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await api.put(`/task/${taskId}`, updatedTask);
        return response.data;
    }
    catch(error)
    {
        console.error('Error updating task:', error);
        throw error;
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/task/${taskId}`);
        return response.data;
    }
    catch(error)
    {
        console.error('Error deleting task:', error);
        throw error;
    }
}

export const createTask = async (newTask) => {
    try {
        const response = await api.post('/task', newTask);  
        return response.data;
    }
    catch(error)
    {
        console.error('Error creating task:', error);
        throw error;
    }
}

