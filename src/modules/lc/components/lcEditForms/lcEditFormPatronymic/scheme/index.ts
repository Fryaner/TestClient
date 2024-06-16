import { z } from "zod"

export const editPatronymicScheme = z.object({
  patronymic: z.string().min(2, {
    message: 'Фамилия должна содержать минимум 2 символа'
  }).max(16, {
    message: 'Фамилия не может быть длинее 16 символов'
  })
});