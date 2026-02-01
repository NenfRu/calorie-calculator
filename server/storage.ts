// Базовая реализация storage, хотя она не используется для калькулятора,
// необходима для корректной работы шаблона сервера.
export interface IStorage {
  // методы не нужны для статического калькулятора
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
