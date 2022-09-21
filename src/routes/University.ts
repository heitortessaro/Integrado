import { Router, Request, Response } from 'express';
import UniversityController from '../controllers/University';
import UniversityService from '../services/University';
import UniversityModel from '../models/Universities';

const route = Router();

const university = new UniversityModel();
const universityService = new UniversityService(university);
const universityController = new UniversityController(universityService);

const baseURL = '/universities';

route.post(baseURL, (req: Request, res: Response) =>
  universityController.create(req, res));
route.get(baseURL, (req: Request, res: Response) =>
  universityController.read(req, res));
route.get(`${baseURL}/:id`, (req: Request, res: Response) =>
  universityController.readOneById(req, res));
route.put(`${baseURL}/:id`, (req: Request, res: Response) =>
  universityController.update(req, res));
route.delete(`${baseURL}/:id`, (req: Request, res: Response) =>
  universityController.delete(req, res));

export default route;