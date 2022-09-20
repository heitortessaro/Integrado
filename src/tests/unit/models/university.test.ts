import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import UniversityModel from '../../../models/Universities';
import { universityMock, universityMockWithId } from '../../mocks/universityMock';

import { IUniversity } from '../../../interfaces/IUniversity';

const { expect } = chai;

describe('University Model', () => {
  const universityModel = new UniversityModel();
  const universityList = [universityMockWithId];
  const validMongoId = '4edd40c86762e0fb12000003';

  before(async function () {
    sinon.stub(Model, 'create').resolves(universityMockWithId);
    sinon.stub(Model, 'find')
      .onCall(0).resolves(universityList)
      .onCall(1).resolves(universityList);
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndDelete')
      .onCall(0).resolves(universityMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a university register', () => {
    it('sucessfully created', async () => {
      const newUniversity = await universityModel.create(universityMock);
      expect(newUniversity).to.be.deep.equal(universityMockWithId);
    });
  });

  describe('searching university registers', () => {
    it('sucessfully found', async () => {
      const universities = await universityModel.read();
      expect(universities).to.be.an('array');
      // the ? avoids error in case of universities be null
      universities?.forEach((university: IUniversity, index: number) => {
        expect(university).to.be.deep.equal(universityList[index]);
      })
    });
  });

  describe('searching university registers by country', () => {
    it('sucessfully found', async () => {
      const universities = await universityModel.readByCountry('brasil');
      expect(universities).to.be.an('array');
      // the ? avoids error in case of universities be null
      universities?.forEach((university: IUniversity, index: number) => {
        expect(university).to.be.deep.equal(universityList[index]);
      })
    });
  });

  describe('searching an university register', () => {
    it('sucessfully found', async () => {
      const university = await universityModel.readOneById(validMongoId);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: invalid _id', async () => {
      try {
        await universityModel.readOneById('WrongId');
      } catch (error: any) {
        // todo: add validation considering error type
        expect(error);
      }
    });
    it('error: _id not found', async () => {
      const university = await universityModel.readOneById(validMongoId);
      expect(university).to.be.equal(null);
    });
  });

  describe('deleting an university register', () => {
    it('sucessfully deleted', async () => {
      const university = await universityModel.delete(validMongoId);
      expect(university).to.be.deep.equal(universityMockWithId);
    });
    it('error: invalid _id', async () => {
      try {
        await universityModel.delete('WrongId');
      } catch (error: any) {
        // todo: add validation considering error type
        expect(error);
      }
    });
    it('error: _id not found', async () => {
      const university = await universityModel.delete(validMongoId);
      expect(university).to.be.equal(null);
    });
  });

  describe('updating an university register', () => {
    it('sucessfully updated', async () => {
      const university = await universityModel.update(validMongoId, universityMock);
      expect(university).to.be.deep.eq(universityMockWithId);
    });
    it('error: invalid _id', async () => {
      try {
        await universityModel.update('WrongId', universityMock);
      } catch (error: any) {
        // todo: add validation considering error type
        expect(error);
      }
    });
    it('error: _id not found', async () => {
      const university = await universityModel.update(validMongoId, universityMock);
      expect(university).to.be.equal(null);
    });
  });

});