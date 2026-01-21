import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTask: Task = { id: Date.now(), text: inputValue, isCompleted: false };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editText } : task
    ));
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Task Tracker</h1>
        
        {/* Input Area */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              
              {editingId === task.id ? (
                // --- RENDER THIS IF EDITING ---
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded px-2 py-1"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task.id)} className="text-green-600 font-bold">Save</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleComplete(task.id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className={`${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-700 text-sm">
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;