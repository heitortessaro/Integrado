import { IService } from './IService';

export interface IServiceUniversity<T> extends IService<T> {
  readByCountry(country: string, page: number): Promise<T[]>,
}
