import { Request, Response } from 'express';
import { IServiceUniversity } from '../interfaces/IServiceUniversity';
import { IUniversity } from '../interfaces/IUniversity';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  convertToInternalPattern,
  convertToExternalPattern,
  convertToExternalArrayPattern,
} from '../helper/objKeyConvertion';

class UniversityController {
  constructor(private _service: IServiceUniversity<IUniversity>) { }

  // public async create(req: Request, res: Response<IUniversity>) {
  public async create(req: Request, res: Response) {
    const university = convertToInternalPattern(req.body) as IUniversity;
    const result = await this._service.create(university);
    return res.status(201).json(convertToExternalPattern(result));
  }

  public async read(req: Request, res: Response<IUniversity[]>) {
    const page: number = req.body.page ? req.body.page : 0;
    if (req.query.country) {
      const result = await this._service.readByCountry(req.query.country as string, page);
      return res.status(200).json(convertToExternalArrayPattern(result));
    }
    const result = await this._service.read(page);
    return res.status(200).json(convertToExternalArrayPattern(result));
  }

  public async readOneById(req: Request, res: Response) {
    const result = await this._service.readOneById(req.params.id);
    return res.status(200).json(convertToExternalPattern(result));
  }

  public async delete(req: Request, res: Response) {
    const result = await this._service.delete(req.params.id);
    return res.status(200).json(convertToExternalPattern(result));
  }

  public async update(req: Request, res: Response) {
    const university = convertToInternalPattern(req.body) as IUniversity;
    const result = await this._service.update(req.params.id, university);
    return res.status(200).json(convertToExternalPattern(result));
  }
}

export default UniversityController;