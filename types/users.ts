import type { Roles } from './enums/roles'

export interface UserDto {
  id: number
  name: string
  surname: string
  role: Roles
  age: number | null
  country: string | null
  educational_institution: string | null
}

export interface UserProfileDto extends UserDto {
  email: string
  preffered_major: string | null
  target_universities: string | null
  motivation: string | null
  toefl: number | null
  ielts: number | null
  sat: number | null
  gpa: number | null
}
