import { z } from "zod"

export const editLoginScheme = z.object({
  login: z.string().min(2, {
    message: 'Фамилия должна содержать минимум 2 символа'
  }).max(16, {
    message: 'Фамилия не может быть длинее 16 символов'
  })
});