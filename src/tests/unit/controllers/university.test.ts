import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import {
  universityMockWithId,
  universityExternalMock,
  universityExternalMockWithId
} from '../../mocks/universityMock';
import UniversityController from '../../../controllers/University';
import UniversityService from '../../../services/University';
import UniversityModel from '../../../models/Universities';

describe.only('University Controller', () => {
  const universityModel = new UniversityModel();
  const universityService = new UniversityService(universityModel);
  const universityController = new UniversityController(universityService);
  const universityList = [universityMockWithId];
  const universityListExternal = [universityExternalMockWithId];
  const validMongoId = '4edd40c86762e0fb12000003';

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(universityService, 'create').resolves(universityMockWithId);
    sinon.stub(universityService, 'read').resolves(universityList);
    sinon.stub(universityService, 'readByCountry').resolves(universityList);
    sinon.stub(universityService, 'readOneById').resolves(universityMockWithId);
    sinon.stub(universityService, 'delete').resolves(universityMockWithId);
    sinon.stub(universityService, 'update').resolves(universityMockWithId);


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  });

  describe('creating a university register', () => {
    it('sucessufully create', async () => {
      req.body = universityExternalMock;
      await universityController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(universityExternalMockWithId)).to.be.true;
    });
  });

  describe('reading universities registers', () => {
    it('sucessufully read registers', async () => {
      req.query = { country: undefined };
      await universityController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(universityListExternal)).to.be.true;
    })
  });

  describe('reading universities registers by country', () => {
    it('sucessufully read registers', async () => {
      req.query = { country: 'Brazil' };
      await universityController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(universityListExternal)).to.be.true;
    })
  });

  describe('reading one university register', () => {
    it('sucessufully read register', async () => {
      req.params = { id: universityMockWithId._id };
      await universityController.readOneById(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(universityExternalMockWithId)).to.be.true;
    })
  });

  describe('deleting a university registers', () => {
    it('sucessufully deletes a register', async () => {
      req.params = { id: universityMockWithId._id };
      await universityController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(universityExternalMockWithId)).to.be.true;
    });
  });

  describe('updating a university register', () => {
    it('sucessufully updates a register', async () => {
      req.body = universityExternalMock;
      req.params = { id: universityMockWithId._id };
      await universityController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(universityExternalMockWithId)).to.be.true;
    });
  });
})