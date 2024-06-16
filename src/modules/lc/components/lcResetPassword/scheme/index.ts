import { z } from "zod"

export const resetPasswordScheme = z.object({
  password: z.string()
  .min(8, 'Пароль должен содержать минимум 8 символов')
  .regex(/(?=.*?[a-z])/, 'Пароль должен содержать символ нижнего регистра. Например (qwerty).')
  .regex(/^(?=.*?[A-Z])/, 'Пароль должен содержать символ верхнего регистра. Например (qwErty).')
  .regex(/(?=.*?[0-9])/, 'Пароль должен содержать цифру. Например (qwErty123).')
  .regex(/(?=.*?[#?!@$%^&*-])/, 'Пароль должен содержать специальный символ. Например (qwerty123%).'),
  confirmPassword: z.string()
  .min(8, 'Пароль должен содержать минимум 8 символов')
  .regex(/(?=.*?[a-z])/, 'Пароль должен содержать символ нижнего регистра. Например (qwerty).')
  .regex(/^(?=.*?[A-Z])/, 'Пароль должен содержать символ верхнего регистра. Например (qwErty).')
  .regex(/(?=.*?[0-9])/, 'Пароль должен содержать цифру. Например (qwErty123).')
  .regex(/(?=.*?[#?!@$%^&*-])/, 'Пароль должен содержать специальный символ. Например (qwerty123%).'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не сопадают',
  path: ['confirmPassword']
});