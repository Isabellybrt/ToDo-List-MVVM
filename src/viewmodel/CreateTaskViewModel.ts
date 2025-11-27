import { useState } from "react";
import { Task } from "../model/entities/Task";

export const useCreateTaskViewModel = (save: (task: Task) => void) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      done: false,
    };
    save(newTask);
  };

  return {
    title,
    description,
    setTitle,
    setDescription,
    submit,
  };
};
