import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  it("renders todos correctly", () => {
    const todos = [
      { id: 1, task: "Test Task 1", completed: false },
      { id: 2, task: "Test Task 2", completed: true },
    ];
    const { getByText } = render(
      <TodoList
        todos={todos}
        addTodo={() => {}}
        deleteTodo={() => {}}
        editTodo={() => {}}
        toggleComplete={() => {}}
      />
    );

    expect(getByText("Test Task 1")).toBeInTheDocument();
    expect(getByText("Test Task 2")).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    const addTodo = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TodoList
        todos={[]}
        addTodo={addTodo}
        deleteTodo={() => {}}
        editTodo={() => {}}
        toggleComplete={() => {}}
      />
    );

    const input = getByPlaceholderText("Add new task...");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addTodo).toHaveBeenCalledWith("New Task");
  });
});
