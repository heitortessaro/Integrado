import { IServiceUniversity } from '../interfaces/IServiceUniversity';
import { IUniversity, UniversityZodSchema } from '../interfaces/IUniversity';
import { IModelUniversity } from '../interfaces/IModelUniversity';
import { ErrorTypes } from '../errors/catalog';

class UniversityService implements IServiceUniversity<IUniversity> {
  // defines the number of recors return
  private numberPerPage = 20;
  // implements the IUniversity interface into the IModel, defining the generics T
  private _university: IModelUniversity<IUniversity>;
  constructor(model: IModelUniversity<IUniversity>) {
    this._university = model;
  }

  // methods
  private async validateNewUniversity(obj: IUniversity): Promise<void> {
    const universities = await this._university
      .findOneByNameCountryState(obj.name, obj.country, obj.stateProvince);
    if (universities === null || universities.length > 0) {
      throw new Error(ErrorTypes.InvalidNewData);
    }
  }

  public async create(obj: unknown) {
    // define the obj as unknown to use the ZodSchema to check the format
    const parsed = UniversityZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.validateNewUniversity(parsed.data);
    return this._university.create(parsed.data);
  }

  public async read(page: number): Promise<IUniversity[]> {
    const universities = await this._university.read(page * this.numberPerPage);
    if (!universities) throw new Error(ErrorTypes.EntityNotFound);
    return universities;
  }

  public async readByCountry(country: string, page: number): Promise<IUniversity[]> {
    const Country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
    const universities = await this._university.readByCountry(Country, page * this.numberPerPage);
    if (!universities) throw new Error(ErrorTypes.EntityNotFound);
    return universities;
  }

  public async readOneById(_id: string): Promise<IUniversity> {
    const university = await this._university.readOneById(_id);
    if (!university) throw new Error(ErrorTypes.EntityNotFound);
    return university;
  }

  public async update(_id: string, obj: unknown): Promise<IUniversity> {
    // define the obj as unknown to use the ZodSchema to check the format
    const parsed = UniversityZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const university = await this._university.update(_id, parsed.data);
    if (!university) throw new Error(ErrorTypes.EntityNotFound);
    return university;
  }

  public async delete(_id: string): Promise<IUniversity> {
    const university = await this._university.delete(_id);
    if (!university) throw new Error(ErrorTypes.EntityNotFound);
    return university;
  }
}

export default UniversityService;