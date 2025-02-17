import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zProgressUsersSchemaDefault = z.object({
  id: zFallbackUuid(),
  lesson_id: zFallbackString(),
  lesson_start: zFallbackString(),
  completion_status: zFallbackString(),
  quiz_score: zFallbackString(),
  completion_date: zFallbackString(),
}).merge(baseModel);

export type ProgressUsersDataTypes = z.infer<typeof zProgressUsersSchemaDefault>;

export const zProgressUsersWithRelation = zProgressUsersSchemaDefault.extend({

});

export type ProgressUsersRelationDataTypes = z.infer<typeof zProgressUsersWithRelation>;

const zFormProgressUsersRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),

});

export const zProgressUsers = {
  BASE: zProgressUsersSchemaDefault,
  LIST: z.array(zProgressUsersSchemaDefault),
  FORM: zFormProgressUsersRules,
}