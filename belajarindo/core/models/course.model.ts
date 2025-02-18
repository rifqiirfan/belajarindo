import { zFallbackString, zFieldText, zFallbackUuid, zFallbackDate } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zCoursesSchemaDefault = z.object({
  id: z.number(),
  name: zFallbackString(),
  description: zFallbackString(),
  difficulty_level: zFallbackString(),
  creation_date: zFallbackDate(),
}).merge(baseModel);

export type CoursesDataTypes = z.infer<typeof zCoursesSchemaDefault>;

export const zCoursesWithRelation = zCoursesSchemaDefault.extend({

});

export type CoursesRelationDataTypes = z.infer<typeof zCoursesWithRelation>;

const zFormCoursesRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),
  difficulty_level: zFieldText('difficulty_level'),
});

export const zCourses = {
  BASE: zCoursesSchemaDefault,
  LIST: z.array(zCoursesSchemaDefault),
  FORM: zFormCoursesRules,
}