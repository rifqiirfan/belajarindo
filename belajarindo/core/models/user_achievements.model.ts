import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zAchievementUsersSchemaDefault = z.object({
  id: z.number(),
  user_id: z.number(),
  achievement_id: z.number(),
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