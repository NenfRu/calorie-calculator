import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Мы не сохраняем данные в БД для этого калькулятора (по требованию "без бэкенда"),
// но используем Zod для валидации формы на фронтенде.

export const calculatorInputSchema = z.object({
  gender: z.enum(["male", "female"], {
    required_error: "Выберите пол",
  }),
  age: z.coerce.number()
    .min(14, "Возраст должен быть от 14 лет")
    .max(100, "Возраст должен быть до 100 лет"),
  weight: z.coerce.number()
    .min(30, "Вес должен быть от 30 кг")
    .max(300, "Вес должен быть до 300 кг"),
  height: z.coerce.number()
    .min(120, "Рост должен быть от 120 см")
    .max(230, "Рост должен быть до 230 см"),
  activityLevel: z.string({
    required_error: "Выберите уровень активности",
  }),
  goalWeightLoss: z.coerce.number()
    .min(0, "Цель должна быть положительной")
    .max(100, "Не более 100 кг за раз"),
  weeks: z.coerce.number()
    .min(1, "Срок от 1 недели")
    .max(104, "Срок до 104 недель (2 года)"),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;
