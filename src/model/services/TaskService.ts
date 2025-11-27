import { TaskRepository } from "../repositories/TaskRepository";
import { Task } from "../entities/Task";

export class TaskService {
  private repository = new TaskRepository();

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
