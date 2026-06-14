export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  topic: string;
  bio: string;
  initials: string;
  avatarColor: string; // Tailwinds colors (e.g. 'indigo', 'cyan', etc.)
  keynoteTime?: string;
  venue?: string;
}

export interface CoreVertical {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  subSessions: string[];
  iconName: string;
  color: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  detail: string;
  symbol?: string;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  track: string;
  passType: 'explorer' | 'innovator' | 'pioneer';
}
