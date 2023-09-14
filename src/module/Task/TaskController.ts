import { Request, Response } from 'express';
import TaskService from './TaskService';

class TaskControlle {
  async createTask(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const user = req.user;
      const newTask = await TaskService.createTask(body, user);
      return res.status(200).send(newTask);
    } catch(error) {
      console.error(error);
      return res.status(400).send('Falha ao cadastrar tarefa');
    }
  }

  async getTask(req: Request, res: Response): Promise<Response> {
    try {
      const { task_id } = req.params;
      const user = req.user;
      const task = await TaskService.findTaskById(Number(task_id), user);
      return res.status(200).send(task);
    } catch(error) {
      console.error(error);
      return res.status(400).send('Nenhuma tarefa encontrada');
    }
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const { task_id } = req.params;
      const user = req.user;
      const body = req.body;
      const updatedTask = await TaskService.updateTask(Number(task_id), user, body);
      return res.status(200).send(updatedTask);
    } catch(error) {
      console.error(error);
      return res.status(400).send('Falha na alteração da tarefa.');
    }
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    try {
      const { task_id } = req.params;
      const user = req.user;
      const task = await TaskService.deleteTask(Number(task_id), user);
      return res.status(200).send(task);
    } catch(error) {
      console.error(error);
      return res.status(400).send('Falha na deleção da tarefa.');
    }
  }

  async updateTaskStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { task_id } = req.params;
      const user = req.user;
      const updatedTask = await TaskService.updateTaskStatus(Number(task_id), user);
      return res.status(200).send(updatedTask);
    } catch(error) {
      console.error(error);
      return res.status(400).send('Falha na conclusão da tarefa.');
    }
  }

  async findAllTasks(req: Request, res: Response): Promise<Response> {
    try {
      const { limit, offset, orderBy } = req.query;
      const user = req.user;
      const tasks = await TaskService.findAllTasks(limit, offset, orderBy, user);
      return res.status(200).send(tasks);
    } catch(error) {
      console.error(error);
      return res.status(400).send('Nenhuma tarefa encontrada');
    }
  }
}

export default new TaskControlle();
