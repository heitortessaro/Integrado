export interface IService<T> {
  create(obj: T): Promise<T>,
  read(page: number): Promise<T[]>,
  readOneById(_id: string): Promise<T>,
  update(_id: string, body: T): Promise<T>,
  delete(_id: string): Promise<T>,
}