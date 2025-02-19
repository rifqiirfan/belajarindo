import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zLessonsSchemaDefault = z.object({
  id: z.number(),
  title: zFallbackString(),
  content: zFallbackString(),
  audio_url: zFallbackString(),
  video_url: zFallbackString(),
  experience_point: zFallbackString(),
  lesson_order: zFallbackString(),
  course_id: z.number(),
}).merge(baseModel);

export type LessonsDataTypes = z.infer<typeof zLessonsSchemaDefault>;

export const zLessonsWithRelation = zLessonsSchemaDefault.extend({
  course_name: zFallbackString(),
});

export type LessonsRelationDataTypes = z.infer<typeof zLessonsWithRelation>;

const zFormLessonsRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),

});

export const zLessons = {
  BASE: zLessonsSchemaDefault,
  LIST: z.array(zLessonsSchemaDefault),
  FORM: zFormLessonsRules,
}