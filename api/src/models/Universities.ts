import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IModelUniversity } from '../interfaces/IModelUniversity';
import { IUniversity } from '../interfaces/IUniversity';
import MongoModel from './MongoModels';

// O Mongoose solicita que, ao criarmos um model 
// com a função model(que renomeamos para mongooseCreateModel)
// passemos a ela um esquema (Schema) que deverá ser respeitado. 

// Isso é necessário para que quando o nosso objeto for 
// instanciado, podermos ter acesso a todos os métodos e 
// atributos disponíveis para usarmos.

const universityMongooseSchema = new Schema<IUniversity>({
  alphaTwoCode: String,
  webPages: Array,
  name: String,
  country: String,
  domains: Array,
  stateProvince: String,
}, { versionKey: false });

class University extends MongoModel<IUniversity> implements IModelUniversity<IUniversity> {
  constructor(model = mongooseCreateModel('University', universityMongooseSchema)) {
    super(model);
  }

  // todo: should define a way to use pages. max number per page equal 20
  public async readByCountry(country: string, page: number): Promise<IUniversity[] | null> {
    return this._model.find({ country }).limit(20).skip(page);
  }

  public async findOneByNameCountryState(
    name: string,
    country: string,
    stateProvince: string,
  ): Promise<IUniversity[] | null> {
    return this._model.find({ name, country, stateProvince });
  }
}

export default University;