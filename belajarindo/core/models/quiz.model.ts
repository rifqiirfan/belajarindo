import { zFallbackString, zFieldText, zFallbackUuid, zFieldNumber } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zQuizzesSchemaDefault = z.object({
  id: z.number(),
  lesson_id: z.number(),
  question_text: zFallbackString(),
  correct_answer: zFallbackString(),
  option_1: zFallbackString(),
  option_2: zFallbackString(),
  option_3: zFallbackString(),
  option_4: zFallbackString(),
  question_type: zFallbackString(),
}).merge(baseModel);

export type QuizzesDataTypes = z.infer<typeof zQuizzesSchemaDefault>;

export const zQuizzesWithRelation = zQuizzesSchemaDefault.extend({
  lesson_name: zFallbackString(),
});

export type QuizzesRelationDataTypes = z.infer<typeof zQuizzesWithRelation>;

const zFormQuizzesRules = z.object({
  lesson_id: zFieldNumber('lesson_id'),
  question_text: zFieldText('question_text'),
  correct_answer: zFieldText('correct_answer'),
  option_1: zFieldText('option_1'),
  option_2: zFieldText('option_2'),
  option_3: zFieldText('option_3'),
  option_4: zFieldText('option_4'),
});

export const zQuizzes = {
  BASE: zQuizzesSchemaDefault,
  LIST: z.array(zQuizzesSchemaDefault),
  FORM: zFormQuizzesRules,
}