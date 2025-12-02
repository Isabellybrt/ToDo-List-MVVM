import { Task } from "../entities/Task";

export interface ITaskRepository {
    getAll(): Task[];
    add(task:Task): void;
    update(task: Task): void;
    delete(id: number): void; 
}