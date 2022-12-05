export type TechSkill = {
  name: string
  icon: string
}

export type Item = {
  name: string
  link?: string
  beginDate?: string
  endDate?: string
  position?: string
  bulletPoints?: string[]
  tech?: string[]
}

export type Project = {
  name: string
  bulletPoints: string[]
  tech: string[]
}