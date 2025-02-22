import {z} from "zod";


export const courseTypeSchema = z.enum(['beginner', 'intermediate', 'advanced'])

export type CourseType = z.infer<typeof courseTypeSchema>

export const courseLevelSchema = z.enum(['bipa-1', 'bipa-2', 'bipa-3', 'bipa-4', 'bipa-5', 'bipa-6', 'bipa-7'])

export type CourseLevel = z.infer<typeof courseLevelSchema>

export const courseSchema = z.object({
  type: courseTypeSchema,
  level: courseLevelSchema,
}).refine(({type, level}) => {
  if (type === 'beginner') {
    return level === 'bipa-1' || level === 'bipa-2'
  }

  if (type === 'intermediate') {
    return level === 'bipa-3' || level === 'bipa-4'
  }

  if (type === 'advanced') {
    return level === 'bipa-5' || level === 'bipa-6' || level === 'bipa-7'
  }
}, {
  message: "Invalid course type or level"
})

export type Course = z.infer<typeof courseSchema>

