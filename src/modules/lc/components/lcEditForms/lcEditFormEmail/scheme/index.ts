import { z } from "zod"

export const editEmailScheme = z.object({
  email: z.string().email({
    message: 'Введите коректный адрес электронной почты'
  }),
});