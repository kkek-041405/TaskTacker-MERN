import React, { useState } from 'react';
import { createTask } from '../services/api';

function Form({ setTasks, onClose }) {
  const priorityOptions = ['Low', 'Medium', 'High'];
  const [formData, setFormData] = useState({
    title: '',
    note: '',
    priority: 'Medium',
    dueDate: '',
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    const newTask = {
      title: formData.title.trim(),
      note: formData.note.trim(),
      priority: formData.priority,
      status: 'Todo',
      dueDate: formData.dueDate,
    };
    createTask(newTask).then((createdTask) => {
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      onClose();
      setFormData({
        title: '',
        note: '',
        priority: 'Medium',
        dueDate: '',
      });
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4" 
      role="presentation" 
      onClick={onClose}
    >
      <section
        className="bg-white rounded-xl border border-slate-200 shadow-lg w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 id="task-form-title" className="text-lg font-bold text-slate-900">Create New Task</h2>
            <p className="text-xs text-slate-500 mt-0.5">Fill in the details to add a task to your board.</p>
          </div>
          <button 
            type="button" 
            className="text-slate-400 hover:text-slate-600 text-xl font-medium focus:outline-none" 
            onClick={onClose} 
            aria-label="Close form"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAddTask}>
          <div className="p-6 flex flex-col gap-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Task Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleFieldChange}
                placeholder="e.g. Prepare presentation slides"
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Description / Notes
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleFieldChange}
                placeholder="Add task details, notes, or checklists here..."
                rows="4"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Priority & Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Priority
                </label>
                <select 
                  name="priority" 
                  value={formData.priority} 
                  onChange={handleFieldChange}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Due Date
                </label>
                <input
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleFieldChange}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button 
              type="button" 
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition-colors focus:outline-none" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Form;
