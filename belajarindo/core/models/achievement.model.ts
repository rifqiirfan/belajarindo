import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zAchievementsSchemaDefault = z.object({
  id: zFallbackUuid(),
  name: zFallbackString(),
  description: zFallbackString(),
  icon_url: zFallbackUuid(),
}).merge(baseModel);

export type AchievementsDataTypes = z.infer<typeof zAchievementsSchemaDefault>;

export const zAchievementsWithRelation = zAchievementsSchemaDefault.extend({

});

export type AchievementsRelationDataTypes = z.infer<typeof zAchievementsWithRelation>;

const zFormAchievementsRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),

});

export const zAchievements = {
  BASE: zAchievementsSchemaDefault,
  LIST: z.array(zAchievementsSchemaDefault),
  FORM: zFormAchievementsRules,
}