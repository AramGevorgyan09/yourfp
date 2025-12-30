import type { Metrics } from './enums/metrics'

export interface University {
  id: number
  name: string
  logo: string
  location: string
  rank: string
  faculties: string[]
  website: string
  description: string
  toefl: number[]
  ielts: number[]
  sat: number[]
  gpa: number[]
}

export interface Faculty {
  id: number
  university_id: number
  faculty: string
}

export interface Requirement extends Faculty {
  metric_name: Metrics
  required_value: number
}
