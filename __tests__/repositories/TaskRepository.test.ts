import { TaskRepository } from "../../src/model/repositories/TaskRepository";
import { Task } from "../../src/model/entities/Task";

const makeTask = (id: number, done = false): Task => ({
  id,
  title: `Task ${id}`,
  description: `Description ${id}`,
  done,
});

describe("TaskRepository", () => {
  it("deve iniciar vazio e retornar um array vazio em getAll", () => {
    const repository = new TaskRepository();

    const tasks = repository.getAll();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks).toHaveLength(0);
  });

  it("deve adicionar tarefas com add e retorná-las em getAll", () => {
    const repository = new TaskRepository();
    const task1 = makeTask(1);
    const task2 = makeTask(2);

    repository.add(task1);
    repository.add(task2);

    const tasks = repository.getAll();
    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual(task1);
    expect(tasks[1]).toEqual(task2);
  });

  it("deve atualizar uma tarefa existente com update", () => {
    const repository = new TaskRepository();
    const task = makeTask(1, false);

    repository.add(task);

    const updatedTask: Task = { ...task, title: "Nova Task", done: true };
    repository.update(updatedTask);

    const tasks = repository.getAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(updatedTask);
  });

  it("não deve quebrar ao chamar update com id inexistente", () => {
    const repository = new TaskRepository();
    const task1 = makeTask(1);

    repository.add(task1);

    const nonExisting: Task = makeTask(999, true);

    expect(() => repository.update(nonExisting)).not.toThrow();
    const tasks = repository.getAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(task1);
  });

  it("deve remover uma tarefa existente com delete", () => {
    const repository = new TaskRepository();
    const task1 = makeTask(1);
    const task2 = makeTask(2);

    repository.add(task1);
    repository.add(task2);

    repository.delete(1);

    const tasks = repository.getAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe(2);
  });

  it("não deve quebrar ao chamar delete com id inexistente", () => {
    const repository = new TaskRepository();
    const task = makeTask(1);

    repository.add(task);

    expect(() => repository.delete(999)).not.toThrow();
    const tasks = repository.getAll();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(task);
  });
});
