import type {
  UserProfile,
  StorageUsage,
  SecurityIssue,
  ActivityControl,
  ContactItem,
  SubscriptionItem,
  HelpArticle,
} from '../types/user.types'

class UserService {
  private userProfile: UserProfile = {
    id: 'usr_1',
    name: 'Alex Morgan',
    nickname: 'Alex',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    avatarText: 'A',
    birthday: 'October 14, 1994',
    gender: 'Rather not say',
    passwordLastChanged: 'Aug 8, 2023',
  }

  private storage: StorageUsage = {
    usedGb: 0.68,
    totalGb: 15,
    usedPercentage: 4,
  }

  private securityIssues: SecurityIssue[] = [
    {
      id: 'sec_1',
      title: '2-Step Verification disabled',
      description: 'Add an extra layer of security to prevent unauthorized access.',
      severity: 'medium',
    },
  ]

  private activityControls: ActivityControl[] = [
    { id: 'act_1', title: 'Web & App Activity', status: 'On' },
    { id: 'act_2', title: 'Location History', status: 'On' },
    { id: 'act_3', title: 'Usage History', status: 'On' },
  ]

  private contacts: ContactItem[] = [
    { id: 'c_1', name: 'Sarah Connor', email: 'sarah@example.com', avatarText: 'S' },
    { id: 'c_2', name: 'John Doe', email: 'john@example.com', avatarText: 'J' },
    { id: 'c_3', name: 'Emma Watson', email: 'emma@example.com', avatarText: 'E' },
  ]

  private subscriptions: SubscriptionItem[] = [
    { id: 'sub_1', title: 'LetGetIn Storage Plus', description: '100 GB Cloud Storage', cost: '$1.99/mo', status: 'Active' },
    { id: 'sub_2', title: 'LetGetIn Security Pass', description: 'Advanced protection suite', cost: '$4.99/mo', status: 'Active' },
  ]

  private helpArticles: HelpArticle[] = [
    { id: 'h_1', title: 'See and control the data in your account', category: 'Privacy' },
    { id: 'h_2', title: 'Manage your LetGetIn settings', category: 'Account' },
    { id: 'h_3', title: 'Secure an account that has suspicious activity', category: 'Security' },
  ]

  async getUserProfile(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { ...this.userProfile }
  }

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    this.userProfile = { ...this.userProfile, ...updates }
    return { ...this.userProfile }
  }

  async getStorageUsage(): Promise<StorageUsage> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { ...this.storage }
  }

  async getSecurityIssues(): Promise<SecurityIssue[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return [...this.securityIssues]
  }

  async getActivityControls(): Promise<ActivityControl[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...this.activityControls]
  }

  async getContacts(): Promise<ContactItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return [...this.contacts]
  }

  async getSubscriptions(): Promise<SubscriptionItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return [...this.subscriptions]
  }

  async getHelpArticles(): Promise<HelpArticle[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...this.helpArticles]
  }
}

export const userService = new UserService()
