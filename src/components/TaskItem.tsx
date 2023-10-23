import React from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditing, setEditing] = React.useState(false);
  const [newText, setNewText] = React.useState(task.text);

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEditTask(task.id, newText);
    setEditing(false);
  };

  return (
    <li>
      <input type="checkbox" checked={task.completed} readOnly />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{task.text}</span>
      )}
      {isEditing ? (
        <button onClick={handleSave}>Guardar</button>
      ) : (
        <>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
