import { TaskService } from "../../src/model/services/TaskService";
import { ITaskRepository } from "../../src/model/repositories/ITaskRepository";
import { Task } from "../../src/model/entities/Task";

class TaskRepositoryMock implements ITaskRepository {
  private tasks: Task[] = [];

  constructor(initialTasks: Task[] = []) {
    this.tasks = initialTasks;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  add(task: Task): void {
    this.tasks.push(task);
  }

  update(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }
  delete(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}

describe("TaskService", () => {
  const makeTask = (id: number, done = false): Task => ({
    id,
    title: `Task ${id}`,
    description: `Description ${id}`,
    done,
  });

  it("deve listar as tarefas do repositório", () => {
    const initialTasks = [makeTask(1), makeTask(2)];
    const repository = new TaskRepositoryMock(initialTasks);
    const service = new TaskService(repository);

    const result = service.listTasks();

    expect(result).toHaveLength(2);
    expect(result).toEqual(initialTasks);
  });

  it("deve criar uma nova tarefa chamando repository.add", () => {
    const repository = new TaskRepositoryMock();
    const service = new TaskService(repository);
    const task = makeTask(1);

    service.createTask(task);

    const tasks = repository.getAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(task);
  });

  it("deve alternar o status done de uma tarefa existente", () => {
    const task = makeTask(1, false);
    const repository = new TaskRepositoryMock([task]);
    const service = new TaskService(repository);

    service.toggleDone(1);

    const updated = repository.getAll().find((t) => t.id === 1);
    expect(updated).toBeDefined();
    expect(updated!.done).toBe(true);

    service.toggleDone(1);
    const updatedAgain = repository.getAll().find((t) => t.id === 1);
    expect(updatedAgain!.done).toBe(false);
  });

  it("não deve lançar erro ao tentar alternar done de id inexistente", () => {
    const repository = new TaskRepositoryMock([]);
    const service = new TaskService(repository);

    expect(() => service.toggleDone(999)).not.toThrow();
    expect(repository.getAll()).toHaveLength(0);
  });

  it("deve apagar uma tarefa chamando repository.delete", () => {
    const task1 = makeTask(1);
    const task2 = makeTask(2);
    const repository = new TaskRepositoryMock([task1, task2]);
    const service = new TaskService(repository);

    service.deleteTask(1);

    const tasks = repository.getAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe(2);
  });
});