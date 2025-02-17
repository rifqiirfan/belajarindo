import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zCoursesSchemaDefault = z.object({
  id: zFallbackUuid(),
  name: zFallbackString(),
  description: zFallbackString(),
  level: zFallbackUuid(),
}).merge(baseModel);

export type CoursesDataTypes = z.infer<typeof zCoursesSchemaDefault>;

export const zCoursesWithRelation = zCoursesSchemaDefault.extend({

});

export type CoursesRelationDataTypes = z.infer<typeof zCoursesWithRelation>;

const zFormCoursesRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),

});

export const zCourses = {
  BASE: zCoursesSchemaDefault,
  LIST: z.array(zCoursesSchemaDefault),
  FORM: zFormCoursesRules,
}