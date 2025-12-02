import { useState } from "react";
import { Task } from "../model/entities/Task";
import { TaskService } from "../model/services/TaskService";
import { TaskRepository } from "../model/repositories/TaskRepository";

const defaultService = new TaskService(new TaskRepository());

export const useHomeViewModel = (service: TaskService = defaultService) => { 
  const [tasks, setTasks] = useState<Task[]>(service.listTasks());

  const refresh = () => {
    setTasks([...service.listTasks()]);
  };

  const addTask = (task: Task) => {
    service.createTask(task);
    refresh();
  };

  const toggleDone = (id: number) => {
    service.toggleDone(id);
    refresh();
  };

  const deleteTask = (id: number) => {
    service.deleteTask(id);
    refresh();
  };

  return {
    tasks,
    addTask,
    toggleDone,
    deleteTask,
  };
};