import { IUniversity } from "../../interfaces/IUniversity";

const universityMock: IUniversity = {
  alphaTwoCode: 'BR',
  webPages: ['www.ufsc.edu.br'],
  name: 'UFSC',
  country: 'brasil',
  domains: ['ufsc.edu.br'],
  stateProvince: 'Santa Catarina',
}

const universityMockWithId: IUniversity & { _id: string } = {
  _id: '6323930286e451c2a5727b9d',
  alphaTwoCode: 'BR',
  webPages: ['www.ufsc.edu.br'],
  name: 'UFSC',
  country: 'brasil',
  domains: ['ufsc.edu.br'],
  stateProvince: 'Santa Catarina',
}

export {
  universityMock,
  universityMockWithId,
}