import { z } from 'zod';

const AddProyectSchema = z.object({
  name: z
    .string()
    .min(1, 'Name required')
    .min(3, 'Min 3 characters')
    .max(20, 'Max 20 characters'),
});

export { AddProyectSchema };
