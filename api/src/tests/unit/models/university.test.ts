import * as sinon from 'sinon';
import chai from 'chai';
import { Model, Query } from 'mongoose';
import UniversityModel from '../../../models/Universities';
import { universityMock, universityMockWithId } from '../../mocks/universityMock';

import { IUniversity } from '../../../interfaces/IUniversity';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('University Model', function () {
  const universityModel = new UniversityModel();
  const universityList = [universityMockWithId];
  const validMongoId = '4edd40c86762e0fb12000003';

  before(async () => {
    sinon.stub(Model, 'create').resolves(universityMockWithId);
    sinon.stub(Model, 'find')
      .onCall(0).returns({
        limit: sinon.stub().returnsThis(),
        skip: sinon.stub().returns(universityList),
      } as any)
      .onCall(1)
      .returns({
        limit: sinon.stub().returnsThis(),
        skip: sinon.stub().returns(universityList),
      } as any)
      .onCall(2)
      .resolves(universityList);
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(Model, 'findByIdAndDelete')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1)
      .resolves(null);
  });

  after(function () {
    sinon.restore();
  });

  describe('creating a university register', function () {
    it('sucessfully created', async function () {
      const newUniversity = await universityModel.create(universityMock);
      expect(newUniversity).to.be.deep.equal(universityMockWithId);
    });
  });

  describe('searching university registers', function () {
    it('sucessfully found', async function () {
      const universities = await universityModel.read(0);
      expect(universities).to.be.an('array');
      // the ? avoids error in case of universities be null
      universities?.forEach((university: IUniversity, index: number) => {
        expect(university).to.be.deep.equal(universityList[index]);
      });
    });
  });

  describe('searching university registers by country', function () {
    it('sucessfully found', async function () {
      const universities = await universityModel.readByCountry('Brazil', 0);
      expect(universities).to.be.an('array');
      // the ? avoids error in case of universities be null
      universities?.forEach((university: IUniversity, index: number) => {
        expect(university).to.be.deep.equal(universityList[index]);
      });
    });
  });

  describe('searching university registers by name, country, and state province', function () {
    it('sucessfully found', async function () {
      const universities = await universityModel
        .findOneByNameCountryState('UFSC', 'Brazil', 'Santa Catarina');
      expect(universities).to.be.an('array');
      // the ? avoids error in case of universities be null
      universities?.forEach((university: IUniversity, index: number) => {
        expect(university).to.be.deep.equal(universityList[index]);
      });
    });
  });

  describe('searching an university register', function () {
    it('sucessfully found', async function () {
      const university = await universityModel.readOneById(validMongoId);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await universityModel.readOneById('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const university = await universityModel.readOneById(validMongoId);
      expect(university).to.be.equal(null);
    });
  });

  describe('deleting an university register', function () {
    it('sucessfully deleted', async function () {
      const university = await universityModel.delete(validMongoId);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await universityModel.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const university = await universityModel.delete(validMongoId);
      expect(university).to.be.equal(null);
    });
  });

  describe('updating an university register', function () {
    it('sucessfully updated', async function () {
      const university = await universityModel.update(validMongoId, universityMock);
      expect(university).to.be.deep.eq(universityMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await universityModel.update('WrongId', universityMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const university = await universityModel.update(validMongoId, universityMock);
      expect(university).to.be.equal(null);
    });
  });
});