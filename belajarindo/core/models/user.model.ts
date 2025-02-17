import { zFallbackString, zFieldText, zFallbackUuid } from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zUsersSchemaDefault = z.object({
  id: zFallbackUuid(),
  email: zFallbackString(),
  username: zFallbackString(),
  password: zFallbackString(),
  join_date: zFallbackString(),
  level: zFallbackString(),
  experience_points: zFallbackString(),
  role: zFallbackString(),
}).merge(baseModel);

export type UsersDataTypes = z.infer<typeof zUsersSchemaDefault>;

export const zUsersWithRelation = zUsersSchemaDefault.extend({

});

export type UsersRelationDataTypes = z.infer<typeof zUsersWithRelation>;

const zFormUsersRules = z.object({
  name: zFieldText('name'),
  description: zFieldText('description'),
});

export const zUsers = {
  BASE: zUsersSchemaDefault,
  LIST: z.array(zUsersSchemaDefault),
  FORM: zFormUsersRules,
}