import { Task } from "../entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";

export class TaskService {
  constructor(private repository: ITaskRepository){}

  listTasks() {
    return this.repository.getAll();
  }

  createTask(task: Task) {
    this.repository.add(task);
  }

  toggleDone(id: number) {
    const list = this.repository.getAll();
    const task = list.find(t => t.id === id);
    if (task) {
      this.repository.update({ ...task, done: !task.done });
    }
  }

  deleteTask(id: number) {
    this.repository.delete(id);
  }
}
