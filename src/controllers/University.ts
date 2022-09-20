import { Request, Response } from 'express';
import { IServiceUniversity } from '../interfaces/IServiceUniversity';
import { IUniversity } from '../interfaces/IUniversity';

class UniversityController {
  constructor(private _service: IServiceUniversity<IUniversity>) { }

  public async create(req: Request & { body: IUniversity }, res: Response<IUniversity>) {
    // todo: fix body key 
    const {
      alphaTwoCode,
      webPages,
      name,
      country,
      domains,
      stateProvince,
    } = req.body;
    const university = { alphaTwoCode, webPages, name, country, domains, stateProvince };
    const result = await this._service.create(university);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response<IUniversity[]>) {
    if (req.params.country) {
      const result = await this._service.readByCountry(req.params.country);
      return res.status(200).json(result);
    }
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOneById(req: Request, res: Response<IUniversity>) {
    const result = await this._service.readOneById(req.params.id);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IUniversity>) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }

  public async update(
    req: Request & { body: IUniversity },
    res: Response<IUniversity>,
  ) {
    // todo: fix body key 
    const {
      alphaTwoCode,
      webPages,
      name,
      country,
      domains,
      stateProvince,
    } = req.body;
    const university = { alphaTwoCode, webPages, name, country, domains, stateProvince };
    const result = await this._service.update(req.params.id, university);
    return res.status(200).json(result);
  }
}

export default UniversityController;