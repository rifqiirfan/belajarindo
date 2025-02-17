import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zAchievementUsersSchemaDefault = z.object({
  id: zFallbackUuid(),
  user_id: zFallbackString(),
  achievement_id: zFallbackString(),
  date_earned: zFallbackString(),
}).merge(baseModel);

export type AchievementUsersDataTypes = z.infer<typeof zAchievementUsersSchemaDefault>;

export const zAchievementUsersWithRelation = zAchievementUsersSchemaDefault.extend({

});

export type AchievementUsersRelationDataTypes = z.infer<typeof zAchievementUsersWithRelation>;

const zFormAchievementUsersRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),

});

export const zAchievementUsers = {
  BASE: zAchievementUsersSchemaDefault,
  LIST: z.array(zAchievementUsersSchemaDefault),
  FORM: zFormAchievementUsersRules,
}