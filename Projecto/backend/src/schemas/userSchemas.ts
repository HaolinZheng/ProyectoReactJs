import { z } from 'zod';

const IdSchema = z.coerce.number({
  invalid_type_error: 'The ID must be a number',
});

const AddUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name required')
    .min(3, 'Min 3 characters')
    .max(20, 'Max 20 characters'),
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email no válido'),
  password: z
    .string()
    .min(1, 'Password required')
    .min(8, 'Min 8 characters')
    .max(16, 'Max 16 characters'),
});

const LoginSchema = z.object({
  name: z
    .string()
    .min(1, 'Name required')
    .min(3, 'Min 3 characters')
    .max(20, 'Max 20 characters'),
  password: z
    .string()
    .min(1, 'Password required')
    .min(8, 'Min 8 characters')
    .max(16, 'Max 16 characters'),
});

export { IdSchema, AddUserSchema, LoginSchema };
