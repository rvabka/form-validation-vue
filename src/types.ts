export interface BasicInfo {
  firstName: string
  lastName: string
  birthDate: string
}

export interface ContactInfo {
  phone: string
  email: string
}

export interface ExperienceItem {
  company: string
  position: string
  dateFrom: string
  dateTo: string
}

export interface FormData {
  basic: BasicInfo
  contact: ContactInfo
  experience: ExperienceItem[]
}
