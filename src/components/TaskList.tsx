import React, { ChangeEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [newTaskText, setNewTaskText] = useState<string>('');

  function addTask(): void {
    if (newTaskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };

    // Agregar la nueva tarea al arreglo de tareas (tasks)
    
  }

  function deleteTask(id: number): void {
    // Eliminar la tarea con el ID proporcionado
    
  }

  function toggleTask(id: number): void {
    // Cambiar el estado "completed" de la tarea con el ID proporcionado
  
  }

  return (
    <div className="container mt-5">
      <h1>Planificador Personal</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          value={newTaskText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTaskText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Agregar tarea
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <label
                className={`form-check-label ${task.completed ? 'text-muted text-decoration-line-through' : ''}`}
              >
                {task.text}
              </label>
            </div>
            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
