export interface CorporateBranding {
  primaryColor: string;
  secondaryColor: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  gradient1: string;
  gradient2: string;
  logoUrl?: string;
  bannerUrl?: string;
  loginBannerUrl?: string;
  socialMediaToggled?: boolean;
  primaryHoverColor?: string;
  primaryGradientColor1?: string;
  primaryGradientColor2?: string;
  clientLogo?: string;
  loginBanner?: string;
  clientBanner?: string;
}

export interface SystemUser {
  id: string;
  username: string;
  userRole: string;
  employeeName: string;
  status: 'Enabled' | 'Disabled';
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  resolvedDate?: string;
  category: 'System Error' | 'Access Issue' | 'Hardware' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved';
}

export interface AssociationRequest {
  id: string;
  employeeName: string;
  dateRequested: string;
  requestDetails: string;
  status: 'Pending' | 'Accepted' | 'Cancelled';
}
