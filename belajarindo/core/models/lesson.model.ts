import { zFallbackString, zFieldText, zFieldNumber } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zLessonsSchemaDefault = z.object({
  id: z.number(),
  name: zFallbackString(),
  content: zFallbackString(),
  audio_url: zFallbackString(),
  video_url: zFallbackString(),
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
  content: zFieldText('content'),
  audio_url: zFieldText('audio_url').optional(),
  video_url: zFieldText('video_url').optional(),
  lesson_order: zFieldNumber('lesson_order'),
  course_id: zFieldNumber('course_id'),
});

export const zLessons = {
  BASE: zLessonsSchemaDefault,
  LIST: z.array(zLessonsSchemaDefault),
  FORM: zFormLessonsRules,
}