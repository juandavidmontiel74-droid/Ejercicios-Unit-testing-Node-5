const TaskManager = require('../src/taskManager');

let manager;

beforeEach(() => {
  manager = new TaskManager();
});

describe('TaskManager', () => {

  test('una tarea recién creada tiene completed: false', () => {
    const task = manager.addTask("Estudiar");
    expect(task.completed).toBe(false);
  });

  test('addTask aumenta el total de tareas en 1', () => {
    manager.addTask("Tarea 1");
    expect(manager.getAll().length).toBe(1);
  });

  test('completeTask cambia el estado sin afectar otras tareas', () => {
    const t1 = manager.addTask("Tarea 1");
    const t2 = manager.addTask("Tarea 2");

    manager.completeTask(t1.id);

    expect(manager.getCompleted().length).toBe(1);
    expect(manager.getPending().length).toBe(1);
    expect(t2.completed).toBe(false);
  });

  test('removeTask disminuye el total de tareas', () => {
    const t1 = manager.addTask("Tarea 1");
    manager.removeTask(t1.id);

    expect(manager.getAll().length).toBe(0);
  });

  test('getPending no incluye tareas completadas', () => {
    const t1 = manager.addTask("Tarea 1");
    const t2 = manager.addTask("Tarea 2");

    manager.completeTask(t1.id);

    const pending = manager.getPending();
    expect(pending.length).toBe(1);
    expect(pending[0].id).toBe(t2.id);
  });

  test('getCompleted no incluye tareas pendientes', () => {
    const t1 = manager.addTask("Tarea 1");
    manager.completeTask(t1.id);

    const completed = manager.getCompleted();
    expect(completed.length).toBe(1);
    expect(completed[0].id).toBe(t1.id);
  });

  test('completeTask con id inválido lanza error', () => {
    expect(() => manager.completeTask(999)).toThrow(Error);
  });

  test('removeTask con id inválido lanza error', () => {
    expect(() => manager.removeTask(999)).toThrow(Error);
  });

  test('addTask con título vacío lanza error', () => {
    expect(() => manager.addTask("")).toThrow(Error);
  });

});