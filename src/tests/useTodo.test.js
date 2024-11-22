import { renderHook, act } from "@testing-library/react-hooks";
import useTodo from "../hooks/useTodo";

describe("useTodo Hook", () => {
  it("should add a todo", () => {
    const { result } = renderHook(() => useTodo());
    act(() => {
      result.current.addTodo("Test Task");
    });
    expect(result.current.todos).toEqual([
      { id: expect.any(Number), task: "Test Task", completed: false },
    ]);
  });

  it("should delete a todo", () => {
    const { result } = renderHook(() => useTodo());
    act(() => {
      result.current.addTodo("Task to Delete");
    });
    const taskId = result.current.todos[0].id;
    act(() => {
      result.current.deleteTodo(taskId);
    });
    expect(result.current.todos).toEqual([]);
  });

  it("should toggle a todo's completion status", () => {
    const { result } = renderHook(() => useTodo());
    act(() => {
      result.current.addTodo("Task to Toggle");
    });
    const taskId = result.current.todos[0].id;
    act(() => {
      result.current.toggleComplete(taskId);
    });
    expect(result.current.todos[0].completed).toBe(true);
  });
});
