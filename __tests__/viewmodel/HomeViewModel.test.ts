import { useHomeViewModel } from "../../src/viewmodel/HomeViewModel";
import { TaskService } from "../../src/model/services/TaskService";
import { TaskRepository } from "../../src/model/repositories/TaskRepository";
import { Task } from "../../src/model/entities/Task";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const mockUseState = require("react").useState; 

describe("HomeViewModel", () => {
    let service: TaskService;
    let mockSetTasks: jest.Mock;

  beforeEach(() => {
        service = new TaskService(new TaskRepository());
        mockSetTasks = jest.fn();

        mockUseState.mockImplementation((init: any) => [init, mockSetTasks]);

        service.listTasks = jest.fn(() => []); 
        service.createTask = jest.fn();
        service.toggleDone = jest.fn();
        service.deleteTask = jest.fn();
  });

    const sampleTask: Task = {
        id: 1,
        title: "Teste",
        description: "Desc",
        done: false,
    };

  it("deve chamar service.createTask e refresh ao usar addTask", () => {
    service.listTasks = jest.fn(() => [sampleTask]); 
    const { addTask } = useHomeViewModel(service);

    addTask(sampleTask);

    expect(service.createTask).toHaveBeenCalledWith(sampleTask);
    expect(mockSetTasks).toHaveBeenCalledTimes(1);
    expect(service.listTasks).toHaveBeenCalled();
  });

  it("deve chamar service.toggleDone e refresh ao usar toggleDone", () => {
    const { toggleDone } = useHomeViewModel(service);
    const taskId = 123;

    toggleDone(taskId);

    expect(service.toggleDone).toHaveBeenCalledWith(taskId);
    expect(mockSetTasks).toHaveBeenCalledTimes(1);
    expect(service.listTasks).toHaveBeenCalled();
  });

  it("deve chamar service.deleteTask e refresh ao usar deleteTask", () => {
    const { deleteTask } = useHomeViewModel(service);
    const taskId = 456;

    deleteTask(taskId);

    expect(service.deleteTask).toHaveBeenCalledWith(taskId);
    expect(mockSetTasks).toHaveBeenCalledTimes(1);
    expect(service.listTasks).toHaveBeenCalled();
  });

  it("deve usar o defaultService se nenhum service for fornecido", () => {
        const { tasks } = useHomeViewModel(); 
        expect(tasks).toBeDefined();
  });

});