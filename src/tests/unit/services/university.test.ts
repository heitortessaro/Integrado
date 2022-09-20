import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import UniversityModel from '../../../models/Universities';
import UniversityService from '../../../services/University';
import { universityMock, universityMockWithId } from '../../mocks/universityMock';

describe('University Service', () => {
  const universityModel = new UniversityModel();
  const universityService = new UniversityService(universityModel);
  const universityList = [universityMockWithId];
  const validMongoId = '4edd40c86762e0fb12000003';

  before(() => {
    sinon.stub(universityModel, 'create').resolves(universityMockWithId);
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
    })
  })
})