export interface IModel<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[] | null>,
  readOneById(_id: string): Promise<T | null>,
  update(_id: string, obj: T): Promise<T | null>,
  delete(_id: string): Promise<T | null>,
}