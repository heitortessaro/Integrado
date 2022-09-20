import { z } from 'zod';

const UniversityZodSchema = z.object({
  alphaTwoCode: z.string().length(2, { message: 'alpha_two_code must be 2 characters long' }),
  webPages: z.array(z.string().url()),
  name: z.string(),
  country: z.string(),
  domains: z.string().array(),
  stateProvince: z.string(),
});

type IUniversity = z.infer<typeof UniversityZodSchema>;

export { UniversityZodSchema, IUniversity };