import { z } from "zod"
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const baseModel = z.object({
  created_at: z.coerce.date().nullish().transform((v) => v ? format(v, 'yyyy-MM-dd', { locale: enUS }) : "-"),
  created_by: z.string().nullable().optional(),
  updated_at: z.coerce.date().nullish().transform((v) => v ? format(v, 'yyyy-MM-dd', { locale: enUS }) : "-"),
  updated_by: z.string().nullable().optional(),
  is_deleted: z.boolean().nullable().optional()
})

export type BaseModelType = z.infer<typeof baseModel>