import { useTaskDetailsViewModel } from "../../src/viewmodel/TaskDetailsViewModel";

describe("TaskDetailsViewModel", () => {
  it("deve chamar deleteTask corretamente", () => {
    const mockDelete = jest.fn();

    const task = {
      id: 10,
      title: "Teste",
      description: "Desc",
      done: false,
    };

    const viewModel = useTaskDetailsViewModel(task, mockDelete);

    viewModel.deleteTask();

    expect(mockDelete).toHaveBeenCalledWith(10);
  });
});