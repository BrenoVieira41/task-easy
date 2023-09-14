import { ITask, Tasks } from './TaskModel';

class TaskRepository {
  public async createTask(data: ITask): Promise<Tasks> {
    return Tasks.create({
      title: data.title,
      topic: data.topic,
      time_amount: 0,
      user_id: data.user_id
    });
  }

  public async findTaskById(task_id: number, user_id: number): Promise<Tasks> {
    return Tasks.findOne({ where: { id: task_id, user_id } });
  }

  public async updateTask(task_id: number, user_id: number, data: ITask): Promise<Tasks> {
    await Tasks.update(data, { where: { id: task_id } });
    return this.findTaskById(task_id, user_id);
  }

  public async deleteTasks(task_id: number, user_id: number): Promise<any> {
    return Tasks.destroy({ where: { id: task_id } });
  }

  public async updateTaskStatus(task_id: number, user_id: number, finished: boolean): Promise<Tasks> {
    await Tasks.update({ finished }, { where: { id: task_id } });
    return this.findTaskById(task_id, user_id);
  }

  public async findAllTasks(limit: number, offset: number, orderBy: string, user_id: number): Promise<Tasks[]> {
    return Tasks.findAll({
      where: { user_id },
      limit,
      offset: (offset - 1) * limit,
      // order: [['created_at', orderBy]]
    });
  }
}

export default TaskRepository;
