import { useCreateTaskViewModel } from "../../src/viewmodel/CreateTaskViewModel";
import { Task } from "../../src/model/entities/Task";
import * as React from "react";

jest.mock("react", () => {
  const original = jest.requireActual("react");
  return {
    ...original,
    useState: jest.fn(), 
  };
});

describe("CreateTaskViewModel", () => {
  let mockSave: jest.Mock;
  let titleState = ""; 
  let descState = ""; 
  let callCount = 0;

  const setTitle = (v: string) => { titleState = v };
  const setDesc = (v: string) => { descState = v };

  const mockUseStateImplementation = (initialValue: any) => {
    callCount++;
    
    if (callCount === 1) {
      return [titleState, setTitle]; 
    }

    if (callCount === 2) {
      return [descState, setDesc]; 
    }

    return [initialValue, jest.fn()];
  };

  beforeEach(() => {
    mockSave = jest.fn();
    titleState = ""; 
    descState = ""; 
    callCount = 0;

    (React.useState as jest.Mock).mockImplementation(mockUseStateImplementation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar save com uma Task válida no submit", () => {
    let viewModel = useCreateTaskViewModel(mockSave); 

    viewModel.setTitle("Comprar pão");
    viewModel.setDescription("Na padaria");
    
    callCount = 0;

    viewModel = useCreateTaskViewModel(mockSave); 

    viewModel.submit();

    const saved: Task = mockSave.mock.calls[0][0];

    expect(saved.title).toBe("Comprar pão");
    expect(saved.description).toBe("Na padaria");
    expect(saved.done).toBe(false);
    expect(typeof saved.id).toBe("number");
  });
});