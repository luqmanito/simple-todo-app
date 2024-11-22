import React, { useState } from "react";
import TodoList from "../src/components/TodoList";
import useQuote from "./hooks/useQuote";
import useTodo from "./hooks/useTodo";
import "./styles/App.css";

function App() {
  const { todos, addTodo, deleteTodo, editTodo, toggleComplete } = useTodo();
  const { quote, author } = useQuote();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <p>Quote of the Day: "{quote}"</p>
      <p>Author: "{author}"</p>
      <input
        type="text"
        style={{ marginBottom: "10px" }}
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TodoList
        todos={todos}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleComplete={toggleComplete}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
