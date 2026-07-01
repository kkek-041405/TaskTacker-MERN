import express from 'express';
const router = express.Router();

import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

router.get('/api', (req, res) => {
    console.log('Request Received');
    res.status(200);
});



router.route('/api/task/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);


router.route('/api/tasks')
    .get(getAllTasks);

router.post('/api/task', createTask);


export default router;

