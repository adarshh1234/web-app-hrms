export interface UserAccount {
  id: string;
  username: string;
  email: string;
  role: 'Candidate' | 'Recruiter' | 'Employee' | 'Admin';
  verifyMethod: 'Email' | 'WhatsApp';
  createdAt: number; // Timestamp in ms
  isPremium: boolean;
  premiumActivatedAt?: number;
}

export interface TrialStatus {
  status: 'admin' | 'trial_active' | 'trial_expired' | 'deactivated';
  daysRemaining: number;
  daysElapsed: number;
  hoursRemaining: number;
  isPremium: boolean;
  message: string;
}

const USERS_STORAGE_KEY = 'huremaso_auth_users';
const CURRENT_USER_KEY = 'huremaso_current_user_email';

/**
 * Get all registered accounts from localStorage
 */
export const getRegisteredUsers = (): UserAccount[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load registered users:', e);
    return [];
  }
};

/**
 * Save users to localStorage
 */
export const saveRegisteredUsers = (users: UserAccount[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

/**
 * Registers a new user and starts 3-Day Free Trial
 */
export const registerUserAccount = (data: {
  username: string;
  email: string;
  role: 'Candidate' | 'Recruiter' | 'Employee' | 'Admin';
  verifyMethod: 'Email' | 'WhatsApp';
  password?: string;
}): UserAccount => {
  const users = getRegisteredUsers();
  
  // Clean up any deactivated accounts first
  const activeUsers = cleanupDeactivatedAccounts(users);

  // Check if email or username already exists
  const existing = activeUsers.find(
    (u) => u.email.toLowerCase() === data.email.toLowerCase() || u.username.toLowerCase() === data.username.toLowerCase()
  );

  if (existing) {
    // Return existing if present
    return existing;
  }

  const newUser: UserAccount = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    username: data.username,
    email: data.email,
    role: data.role,
    verifyMethod: data.verifyMethod,
    createdAt: Date.now(),
    isPremium: false,
  };

  activeUsers.push(newUser);
  saveRegisteredUsers(activeUsers);
  localStorage.setItem(CURRENT_USER_KEY, newUser.email);
  return newUser;
};

/**
 * Calculates trial status for a user based on account registration timestamp
 * 
 * Rules:
 * - Admin account (admin) is permanent & unaffected.
 * - Days 0..3: Trial Active (3-day free trial).
 * - Days 3..7: Trial Expired - Prompt Premium Upgrade.
 * - Days >7: Deactivated & deleted if unpaid.
 */
export const calculateTrialStatus = (userEmailOrUsername: string): TrialStatus => {
  // Admin bypass
  if (userEmailOrUsername.toLowerCase() === 'admin' || userEmailOrUsername.toLowerCase() === 'admin@huremaso.com') {
    return {
      status: 'admin',
      daysRemaining: 999,
      daysElapsed: 0,
      hoursRemaining: 999,
      isPremium: true,
      message: 'Default Admin Account (Unlimited Access)',
    };
  }

  const users = getRegisteredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === userEmailOrUsername.toLowerCase() || u.username.toLowerCase() === userEmailOrUsername.toLowerCase()
  );

  if (!user) {
    return {
      status: 'trial_active',
      daysRemaining: 3,
      daysElapsed: 0,
      hoursRemaining: 72,
      isPremium: false,
      message: '3-Day Free Trial Available',
    };
  }

  if (user.isPremium) {
    return {
      status: 'admin',
      daysRemaining: 999,
      daysElapsed: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)),
      hoursRemaining: 999,
      isPremium: true,
      message: 'Premium Member (Unlimited Access)',
    };
  }

  const now = Date.now();
  const elapsedMs = now - user.createdAt;
  const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
  const totalTrialHours = 3 * 24; // 72 hours
  const elapsedHours = elapsedMs / (1000 * 60 * 60);

  // Day 7+ deactivation check
  if (elapsedDays >= 7) {
    // Delete account
    const updatedUsers = users.filter((u) => u.id !== user.id);
    saveRegisteredUsers(updatedUsers);
    return {
      status: 'deactivated',
      daysRemaining: 0,
      daysElapsed: Math.floor(elapsedDays),
      hoursRemaining: 0,
      isPremium: false,
      message: 'Account trial expired and deactivated on Day 7 (Unpaid).',
    };
  }

  // Days 3 to 7: Expired trial, needs Premium
  if (elapsedDays >= 3) {
    const daysBeforeDeletion = Math.max(1, Math.ceil(7 - elapsedDays));
    return {
      status: 'trial_expired',
      daysRemaining: 0,
      daysElapsed: Math.floor(elapsedDays),
      hoursRemaining: 0,
      isPremium: false,
      message: `3-Day Free Trial Expired. Choose a Premium Plan to prevent account deletion in ${daysBeforeDeletion} day(s).`,
    };
  }

  // Days 0 to 3: Active Trial
  const hoursLeft = Math.max(0, Math.ceil(totalTrialHours - elapsedHours));
  const daysLeft = Math.max(1, Math.ceil(3 - elapsedDays));

  return {
    status: 'trial_active',
    daysRemaining: daysLeft,
    daysElapsed: Math.floor(elapsedDays),
    hoursRemaining: hoursLeft,
    isPremium: false,
    message: `${daysLeft} Day${daysLeft > 1 ? 's' : ''} Free Trial Active (${hoursLeft} hrs remaining)`,
  };
};

/**
 * Upgrades a user account to Premium
 */
export const upgradeUserToPremium = (userEmailOrUsername: string): boolean => {
  const users = getRegisteredUsers();
  const index = users.findIndex(
    (u) => u.email.toLowerCase() === userEmailOrUsername.toLowerCase() || u.username.toLowerCase() === userEmailOrUsername.toLowerCase()
  );

  if (index !== -1) {
    users[index].isPremium = true;
    users[index].premiumActivatedAt = Date.now();
    saveRegisteredUsers(users);
    return true;
  }
  return false;
};

/**
 * Removes unpaid users older than 7 days
 */
export const cleanupDeactivatedAccounts = (usersList?: UserAccount[]): UserAccount[] => {
  const users = usersList || getRegisteredUsers();
  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  const validUsers = users.filter((u) => {
    if (u.isPremium) return true;
    return now - u.createdAt < sevenDaysMs;
  });

  if (validUsers.length !== users.length) {
    saveRegisteredUsers(validUsers);
  }
  return validUsers;
};

/**
 * Fast simulated trial age shortcut for testing (sets registration date back N days)
 */
export const simulateTrialAge = (userEmailOrUsername: string, daysAgo: number): boolean => {
  const users = getRegisteredUsers();
  const index = users.findIndex(
    (u) => u.email.toLowerCase() === userEmailOrUsername.toLowerCase() || u.username.toLowerCase() === userEmailOrUsername.toLowerCase()
  );

  if (index !== -1) {
    users[index].createdAt = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);
    saveRegisteredUsers(users);
    return true;
  }
  return false;
};
