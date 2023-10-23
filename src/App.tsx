import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Define tus propios estilos CSS
import './custom-styles.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: Date | null; // Fecha de la tarea
}

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('semanal');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([]);
  const [monthlyTasks, setMonthlyTasks] = useState<Task[]>([]);
  const [annualTasks, setAnnualTasks] = useState<Task[]>([]);

  const [newTaskText, setNewTaskText] = useState('');

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const addTask = () => {
    if (newTaskText.trim() === '' || !selectedDate) return;

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      date: selectedDate,
    };

    switch (selectedPlan) {
      case 'semanal':
        setWeeklyTasks([...weeklyTasks, newTask]);
        break;
      case 'mensual':
        setMonthlyTasks([...monthlyTasks, newTask]);
        break;
      case 'anual':
        setAnnualTasks([...annualTasks, newTask]);
        break;
      default:
        break;
    }

    setNewTaskText('');
    setSelectedDate(null);
  };

  const deleteTask = (id: number) => {
    const deleteFromTasks = (tasks: Task[]) => tasks.filter((task) => task.id !== id);

    switch (selectedPlan) {
      case 'semanal':
        setWeeklyTasks(deleteFromTasks(weeklyTasks));
        break;
      case 'mensual':
        setMonthlyTasks(deleteFromTasks(monthlyTasks));
        break;
      case 'anual':
        setAnnualTasks(deleteFromTasks(annualTasks));
        break;
      default:
        break;
    }
  };

  const toggleTaskCompletion = (id: number) => {
    const toggleCompletionInTasks = (tasks: Task[]) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

    switch (selectedPlan) {
      case 'semanal':
        setWeeklyTasks(toggleCompletionInTasks(weeklyTasks));
        break;
      case 'mensual':
        setMonthlyTasks(toggleCompletionInTasks(monthlyTasks));
        break;
      case 'anual':
        setAnnualTasks(toggleCompletionInTasks(annualTasks));
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Planificador Personal</h1>

      <div className="mb-4">
        <div className="btn-group">
          <button
            className={`btn btn-${selectedPlan === 'semanal' ? 'custom-primary' : 'custom-secondary'}`}
            onClick={() => handlePlanSelection('semanal')}
          >
            Tu Planificación Semanal
          </button>
          <button
            className={`btn btn-${selectedPlan === 'mensual' ? 'custom-primary' : 'custom-secondary'}`}
            onClick={() => handlePlanSelection('mensual')}
          >
            Tu Planificación Mensual
          </button>
          <button
            className={`btn btn-${selectedPlan === 'anual' ? 'custom-primary' : 'custom-secondary'}`}
            onClick={() => handlePlanSelection('anual')}
          >
            Tu Planificación Anual
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className={`card ${selectedPlan === 'semanal' ? 'd-block' : 'd-none'}`}>
            <div className="card-body">
              <div className="mb-3">
                <p>Calendario</p>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <ul className="list-group">
                {weeklyTasks.map((task) => (
                  <li key={task.id} className={`list-group-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-details">
                      <p className="task-date">
                        {task.date && task.date.toLocaleDateString('es-ES')}
                      </p>
                      <p className="task-text">
                        {task.text}
                      </p>
                    </div>
                    <button
                      className="btn btn-danger float-end"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div className={`card ${selectedPlan === 'mensual' ? 'd-block' : 'd-none'}`}>
            <div className="card-body">
              <div className="mb-3">
                <p>Calendario</p>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <ul className="list-group">
                {monthlyTasks.map((task) => (
                  <li key={task.id} className={`list-group-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-details">
                      <p className="task-date">
                        {task.date && task.date.toLocaleDateString('es-ES')}
                      </p>
                      <p className="task-text">
                        {task.text}
                      </p>
                    </div>
                    <button
                      className="btn btn-danger float-end"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div className={`card ${selectedPlan === 'anual' ? 'd-block' : 'd-none'}`}>
            <div className="card-body custom-card">
              <div className="mb-3">
                <p>Calendario</p>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <ul className="list-group">
                {annualTasks.map((task) => (
                  <li key={task.id} className={`list-group-item custom-list-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-details">
                      <p className="task-date">
                        {task.date && task.date.toLocaleDateString('es-ES')}
                      </p>
                      <p className="task-text">
                        {task.text}
                      </p>
                    </div>
                    <button
                      className="btn btn-danger float-end"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button className="btn btn-success btn-small mt-2" onClick={addTask}>
          Agregar tarea
        </button>
      </div>
    </div>
  );
}

export default App;
