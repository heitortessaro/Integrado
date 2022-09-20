import { z } from 'zod';

const UniversityZodSchema = z.object({
  alphaTwoCode: z.string().length(2, { message: 'alpha_two_code must be 2 characters long' }),
  webPages: z.array(z.string()),
  name: z.string(),
  country: z.string(),
  domains: z.array(z.string()),
  stateProvince: z.string(),
});

type IUniversity = z.infer<typeof UniversityZodSchema>;

export { UniversityZodSchema, IUniversity };

// const universityMock: IUniversity = {
//   alphaTwoCode: 'BR',
//   webPages: ['www.ufsc.edu.br'],
//   name: 'UFSC',
//   country: 'brasil',
//   domains: ['ufsc.edu.br'],
//   stateProvince: 'Santa Catarina',
// };