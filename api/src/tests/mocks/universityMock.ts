// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IUniversity } from '../../interfaces/IUniversity';

const url = 'www.ufsc.edu.br';

const universityMock: IUniversity = {
  alphaTwoCode: 'BR',
  webPages: [url],
  name: 'UFSC',
  country: 'Brazil',
  domains: ['ufsc.edu.br'],
  stateProvince: 'Santa Catarina',
};

const universityMockWithId: IUniversity & { _id: string } = {
  _id: '6323930286e451c2a5727b9d',
  alphaTwoCode: 'BR',
  webPages: [url],
  name: 'UFSC',
  country: 'Brazil',
  domains: ['ufsc.edu.br'],
  stateProvince: 'Santa Catarina',
};

const universityExternalMock = {
  alpha_two_code: 'BR',
  web_pages: [url],
  name: 'UFSC',
  country: 'Brazil',
  domains: ['ufsc.edu.br'],
  'state-province': 'Santa Catarina',
};

const universityExternalMockWithId = {
  alpha_two_code: 'BR',
  web_pages: [
    url,
  ],
  name: 'UFSC',
  country: 'Brazil',
  domains: [
    'ufsc.edu.br',
  ],
  'state-province': 'Santa Catarina',
  _id: '6323930286e451c2a5727b9d',
};

export {
  universityMock,
  universityMockWithId,
  universityExternalMock,
  universityExternalMockWithId,
};