import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/TodoList.css";

function TodoList({
  todos,
  addTodo,
  deleteTodo,
  editTodo,
  toggleComplete,
  searchQuery,
}) {
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim() === "") return;
    addTodo(newTask);
    setNewTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleEdit = (id, task) => {
    setEditingId(id);
    setEditedTask(task);
  };

  const handleSave = (id) => {
    editTodo(id, editedTask);
    setEditingId(null);
    setEditedTask("");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
        />
        <button
          style={{
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {filteredTodos.length === 0 && <p>No tasks found.</p>}
      <TransitionGroup>
        {filteredTodos.map((todo) => (
          <CSSTransition key={todo.id} timeout={500} classNames="fade">
            <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
              {editingId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleSave(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span
                    onClick={() => toggleComplete(todo.id)}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {todo.task}
                  </span>
                  <button
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleEdit(todo.id, todo.task)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default TodoList;
