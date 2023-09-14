import { ITask, TaskEnum, Tasks } from './TaskModel';
import TaskRepository from './TaskRepository';
import Utils from '../UtilsService';
import { Users } from '../User/UserModel';

class TaskService {
  private readonly taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public async createTask(data: ITask, user: Users): Promise<Tasks> {
    const { title, topic } = data;
    const userId = user.id;

    if (!title || !Utils.validateBetween(title.length, 5, 100)) throw new Error('Titulo inválido, informe um título de 5 a 100 caracteres.');
    if (!topic || !Utils.validateBetween(topic.length, 5, 100)) throw new Error('Tópico inválido, informe um tópico de 5 a 100 caracteres');

    const newTask = await this.taskRepository.createTask({ title, topic, user_id: userId });
    return newTask;
  }

  public async updateTask(task_id: number, user: Users, data: ITask): Promise<Tasks> {
    const { title, topic, time_amount } = data;
    const user_id = user.id;

    const oldTask: Tasks = await this.taskRepository.findTaskById(task_id, user_id);
    let newValues: ITask = {};

    if (!oldTask) throw new Error('Nenhuma tarefa encontrada.');
    if (this.repeatValidate(oldTask.title, title)) newValues.title = title;
    if (this.repeatValidate(oldTask.topic, topic)) newValues.topic = topic;
    if (time_amount) newValues.time_amount = time_amount;
    if (!Object.keys(newValues).length) throw new Error('Nenhuma diferença apontada.');

    return this.taskRepository.updateTask(oldTask.id, user_id, newValues);
  }

  public async deleteTask(task_id: number, user: Users): Promise<string> {
    const user_id = user.id;
    const oldTask: Tasks = await this.taskRepository.findTaskById(task_id, user_id);

    if (!oldTask) throw new Error('Nenhuma tarefa encontrada.');

    await this.taskRepository.deleteTasks(task_id, user_id);
    return 'Tarefa deletada com sucesso.';
  }

  public async updateTaskStatus(task_id: number, user: Users): Promise<Tasks> {
    const user_id = user.id;
    const oldTask: Tasks = await this.taskRepository.findTaskById(task_id, user_id);

    if (!oldTask) throw new Error('Nenhuma tarefa encontrada.');
    const setStatus = !oldTask.finished ? true : false;

    return this.taskRepository.updateTaskStatus(task_id, user_id, setStatus);
  }

  private repeatValidate(oldValue: string, currentValue: string) {
    if (!currentValue || !Utils.validateBetween(currentValue.length, 5, 100)) return false;
    if (oldValue === currentValue) return false;
    return true;
  }

  public async findTaskById(task_id: number, user: Users): Promise<Tasks> {
    const user_id = user.id;
    const tasks = await this.taskRepository.findTaskById(task_id, user_id);

    if (!tasks) throw new Error('Nenhuma tarefa encontrada.');

    return tasks;
  }

  public async findAllTasks(limit: any, offset: any, orderBy: any = 'ASC', user: Users) {//Promise<Tasks[]> {
    const user_id = user.id;
    const isNumberRegex = new RegExp(/^[1-9]+$/);

    limit = isNumberRegex.test(String(limit)) ? Number(limit) : 30;
    offset = isNumberRegex.test(String(offset)) ? Number(offset) : 1;

    if (!Object.keys(TaskEnum).includes(orderBy.toUpperCase())) throw new Error('Ordenação inválida')

    const values = await this.taskRepository.findAllTasks(limit, offset, orderBy, user_id);
    return { values, count: values.length }
  }
}

export default new TaskService();
