import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import UniversityModel from '../../../models/Universities';
import UniversityService from '../../../services/University';
import { universityMock, universityMockWithId } from '../../mocks/universityMock';

describe.only('University Service', () => {
  const universityModel = new UniversityModel();
  const universityService = new UniversityService(universityModel);
  const universityList = [universityMockWithId];
  const validMongoId = '4edd40c86762e0fb12000003';

  before(() => {
    sinon.stub(universityModel, 'create').resolves(universityMockWithId);
    sinon.stub(universityModel, 'findOneByNameCountryState')
      .onCall(0).resolves([])
      .onCall(1).resolves(universityList);
    sinon.stub(universityModel, 'read')
      .onCall(0).resolves(universityList)
      .onCall(1).resolves(null);
    sinon.stub(universityModel, 'readByCountry')
      .onCall(0).resolves(universityList)
      .onCall(1).resolves(null);
    sinon.stub(universityModel, 'readOneById')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(universityModel, 'update')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(universityModel, 'delete')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore()
  });

  describe('creating an university register', () => {
    it('sucessfully created', async () => {
      const newUniversity = await universityService.create(universityMock);
      expect(newUniversity).to.be.deep.equal(universityMockWithId);
    });
    it('error: invalid body data', async () => {
      let err
      try {
        await universityService.create({});
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
    it('error: equal record is already in the database', async () => {
      try {
        await universityService.create(universityMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidNewData);
      }
    })
  });

  describe('reading universities registers', () => {
    it('sucessfully read university registers', async () => {
      const universities = await universityService.read();
      expect(universities).to.be.deep.equal(universityList);
    });
    it('error: results not found', async () => {
      try {
        await universityService.read();
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('reading universities registers by country', () => {
    it('sucessfully read universities registers', async () => {
      const universities = await universityService.readByCountry('brasil');
      expect(universities).to.be.deep.equal(universityList);
    });
    it('error: results not found', async () => {
      try {
        await universityService.readByCountry('brasil');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('reading universities registers by id', () => {
    it('sucessfully read university register', async () => {
      const university = await universityService.readOneById(validMongoId);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: id not found', async () => {
      try {
        await universityService.readOneById('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);;
      }
    });
  });

  describe('deleting a university register', () => {
    it('sucessfully delete a register', async () => {
      const university = await universityService.delete(validMongoId);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: id not found', async () => {
      try {
        await universityService.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);;
      }
    });
  });

  describe('updating a university register', () => {
    it('sucessfully update a register', async () => {
      const university = await universityService.update(validMongoId, universityMock);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: id not found', async () => {
      try {
        await universityService.update(validMongoId, universityMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);;
      }
    })
    it('error: invalid body data', async () => {
      let err
      try {
        await universityService.update(validMongoId, {} as any);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    })
  })
})