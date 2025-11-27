import { Task } from "../entities/Task";

export class TaskRepository {
  private tasks: Task[] = [];

  getAll() {
    return this.tasks;
  }

  add(task: Task) {
    this.tasks.push(task);
  }

  update(task: Task) {
    this.tasks = this.tasks.map(t => (t.id === task.id ? task : t));
  }

  delete(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
