import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Circle, Trash2, ListTodo } from 'lucide-react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
        category: category.trim() || 'general',
      };
      setTodos([...todos, newTodo]);
      setInputText('');
      setCategory('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const categories = [...new Set(todos.map(todo => todo.category))];

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="todo-wrapper">
          {/* Header */}
          <div className="header">
            <ListTodo className="icon" />
            <h1 className="title">Todo List</h1>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What needs to be done?"
              className="input"
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (optional)"
              className="input"
            />
            <button type="submit" className="add-button">
              <PlusCircle className="button-icon" />
            </button>
          </form>

          {/* Filters */}
          <div className="filters">
            <button
              onClick={() => setFilter('all')}
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            >
              Completed
            </button>
          </div>

          {/* Todo List */}
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="no-todos">No todos to display</div>
            ) : (
              filteredTodos.map((todo) => (
                <div key={todo.id} className="todo-item">
                  <div className="todo-info">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="toggle-button"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="completed-icon" />
                      ) : (
                        <Circle className="circle-icon" />
                      )}
                    </button>
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                      {todo.text}
                    </span>
                    <span className="todo-category">{todo.category}</span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                  >
                    <Trash2 className="trash-icon" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="summary">
            {todos.length} total items · {todos.filter(t => !t.completed).length} active ·{' '}
            {todos.filter(t => t.completed).length} completed
          </div>
        </div>
        
        {/* Categories */}
        {categories.length > 0 && (
          <div className="categories">
            <h2 className="categories-title">Categories</h2>
            <div className="categories-list">
              {categories.map(cat => (
                <span key={cat} className="category-item">{cat}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
