export interface UserProfile {
  id: string
  name: string
  nickname: string
  email: string
  phone: string
  avatarText: string
  birthday: string
  gender: string
  passwordLastChanged: string
}

export interface StorageUsage {
  usedGb: number
  totalGb: number
  usedPercentage: number
}

export interface SecurityIssue {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
}

export interface ActivityControl {
  id: string
  title: string
  status: 'On' | 'Off' | 'Paused'
}

export interface ContactItem {
  id: string
  name: string
  email: string
  avatarText: string
}

export interface SubscriptionItem {
  id: string
  title: string
  description: string
  cost: string
  status: 'Active' | 'Cancelled'
}

export interface HelpArticle {
  id: string
  title: string
  category: string
}
