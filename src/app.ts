import express, { Router } from 'express';
import cors from 'cors';
import AuthMiddleware from './module/Authenticate';
import UserController from './module/User/UserController';
import TaskControlle from './module/Task/TaskController';

const app = express();
const routes = Router();

app.use(express.json());
app.use(cors());

routes.get('/', () => console.log('Server is Up'));
routes.post('/user', UserController.createUser);
routes.post('/user/login', UserController.login);
routes.post('/task', AuthMiddleware, TaskControlle.createTask);
routes.get('/task/:task_id', AuthMiddleware, TaskControlle.getTask);
routes.get('/task', AuthMiddleware, TaskControlle.findAllTasks);
routes.delete('/task/:task_id', AuthMiddleware, TaskControlle.deleteTask);
routes.put('/task/update/:task_id', AuthMiddleware, TaskControlle.updateTask);
routes.patch('/task/status/:task_id', AuthMiddleware, TaskControlle.updateTaskStatus);

app.use(routes);

export { app };
