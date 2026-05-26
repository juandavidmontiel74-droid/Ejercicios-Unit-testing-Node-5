class TaskManager {
  constructor() {
    this._tasks = [];
    this._nextId = 1;
  }

  addTask(title) {
    if (!title || title.trim() === "") {
      throw new Error("El título no puede estar vacío");
    }

    const task = {
      id: this._nextId++,
      title,
      completed: false,
      createdAt: new Date()
    };

    this._tasks.push(task);
    return task;
  }

  completeTask(id) {
    const task = this._tasks.find(t => t.id === id);
    if (!task) {
      throw new Error("ID no encontrado");
    }
    task.completed = true;
  }

  removeTask(id) {
    const index = this._tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error("ID no encontrado");
    }
    this._tasks.splice(index, 1);
  }

  getPending() {
    return this._tasks.filter(t => !t.completed);
  }

  getCompleted() {
    return this._tasks.filter(t => t.completed);
  }

  getAll() {
    return [...this._tasks];
  }
}

module.exports = TaskManager;
