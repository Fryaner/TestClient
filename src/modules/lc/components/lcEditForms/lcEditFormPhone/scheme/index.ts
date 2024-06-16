import { z } from "zod"

export const editPhoneScheme = z.object({
  phone: z.string().regex(/^(\+\d{1,3}[\s-]?)?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/, 'Введите корректный номер телефона'),
});