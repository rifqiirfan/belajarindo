import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zQuizzesSchemaDefault = z.object({
  id: z.number(),
  question_text: zFallbackString(),
  lesson_id: z.number(),
  correct_answer: zFallbackString(),
  option_1: zFallbackString(),
  option_2: zFallbackString(),
  option_3: zFallbackString(),
  option_4: zFallbackString(),
  question_type: zFallbackUuid(),
}).merge(baseModel);

export type QuizzesDataTypes = z.infer<typeof zQuizzesSchemaDefault>;

export const zQuizzesWithRelation = zQuizzesSchemaDefault.extend({

});

export type QuizzesRelationDataTypes = z.infer<typeof zQuizzesWithRelation>;

const zFormQuizzesRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),

});

export const zQuizzes = {
  BASE: zQuizzesSchemaDefault,
  LIST: z.array(zQuizzesSchemaDefault),
  FORM: zFormQuizzesRules,
}