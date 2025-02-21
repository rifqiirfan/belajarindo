import {zFallbackString, zFieldText, zFallbackUuid, zFallbackDate, zFieldNumber} from "@/core/utilities/zodUtils"
import { z } from "zod"
import { baseModel } from "./base_model";

const zUsersSchemaDefault = z.object({
  id: z.coerce.number(),
  email: zFallbackString(),
  username: zFallbackString(),
  password: zFallbackString(),
  full_name: zFallbackString(),
  country: zFallbackString(),
  date_of_birth: zFallbackDate(),
  join_date: zFallbackString(),
  level: z.coerce.number().optional().transform((v) => v || "-"),
  experience_points: z.coerce.number().optional().transform((v) => v || "-"),
  role: zFallbackString(),
}).merge(baseModel);

export type UsersDataTypes = z.infer<typeof zUsersSchemaDefault>;

export const zUsersWithRelation = zUsersSchemaDefault.extend({

});

export type UsersRelationDataTypes = z.infer<typeof zUsersWithRelation>;

const zFormUsersRules = z.object({
  email: zFieldText('email', true),
  username: zFieldText('username', true),
  password: zFieldText('password', true),
  full_name: zFieldText('full_name', true),
  country: zFieldText('country', true),
  date_of_birth: zFallbackDate(),
  join_date: zFallbackDate(),
  // level: zFieldNumber('level'),
  experience_points: zFieldNumber('experience_points'),
  role: zFieldText('role', true),
});

export const zUsers = {
  BASE: zUsersSchemaDefault,
  LIST: z.array(zUsersSchemaDefault),
  FORM: zFormUsersRules,
}