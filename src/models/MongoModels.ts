import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  // atributes
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  // methods
  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  // todo: should define a way to use pages. max number per page equal 20
  public async read(): Promise<T[] | null> {
    return this._model.find();
  }

  public async readOneById(_id: string): Promise<T | null> {
    // todo: add an specific error message
    if (!isValidObjectId(_id)) throw new Error();
    return this._model.findById(_id);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    // todo: add an specific error message
    if (!isValidObjectId(_id)) throw new Error();
    const filter = { _id };
    const update = { ...obj } as UpdateQuery<T>;
    // new ensures the modified data will be returned
    return this._model.findByIdAndUpdate(filter, update, { new: true });
  }

  public async delete(_id: string): Promise<T | null> {
    // todo: add an specific error message
    if (!isValidObjectId(_id)) throw new Error();
    return this._model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;