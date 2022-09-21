import { IModel } from './IModel';

export interface IModelUniversity<T> extends IModel<T> {
  readByCountry(country: string, page: number): Promise<T[] | null>,
  findOneByNameCountryState(
    name: string,
    country: string,
    stateProvince: string,
  ): Promise<T[] | null>
}