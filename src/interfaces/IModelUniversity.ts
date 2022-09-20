import { IModel } from './IModel';

export interface IModelUniversity<T> extends IModel<T> {
  readByCountry(country: string): Promise<T[] | null>,
}