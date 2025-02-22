import { zFallbackString, zFieldText, zFallbackNumber, zFieldNumber } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zAchievementsSchemaDefault = z.object({
  id: z.number(),
  name: zFallbackString(),
  description: zFallbackString(),
  achieve_point: zFallbackNumber(),
  difficulty_level: zFallbackString(),
  icon_url: zFallbackString(),
}).merge(baseModel);

export type AchievementsDataTypes = z.infer<typeof zAchievementsSchemaDefault>;

export const zAchievementsWithRelation = zAchievementsSchemaDefault.extend({

});

export type AchievementsRelationDataTypes = z.infer<typeof zAchievementsWithRelation>;

const zFormAchievementsRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),
  achieve_point: zFieldNumber('achieve_point'),
  difficulty_level: zFieldText('difficulty_level'),
  icon_url: zFieldText('icon_url'),
});

export const zAchievements = {
  BASE: zAchievementsSchemaDefault,
  LIST: z.array(zAchievementsSchemaDefault),
  FORM: zFormAchievementsRules,
}