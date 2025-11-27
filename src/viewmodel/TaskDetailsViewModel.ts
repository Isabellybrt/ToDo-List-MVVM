import { Task } from "../model/entities/Task";

export const useTaskDetailsViewModel = (
  task: Task,
  onDelete: (id: number) => void
) => {

  const deleteTask = () => {
    onDelete(task.id);
  };

  return {
    deleteTask,
  };
};
