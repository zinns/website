export interface NewUserInputType {
  name: string;
  username: string;
  password: string;
  lastName: string;
  phone: string;
  role: 'master jedi' | 'jedi' | 'apprentice' | 'chancellor';
}

export interface AuthenticateInputType {
  identifier: string;
  password: string;
}

export interface NewDateInputType {
  client: string;
  notes: string;
  date: Date;
  startHour: string;
  endHour: string;
}

export interface CtxNewDateType {
  user?: {
    username: string;
    id: string;
    iat: number;
    exp: number;
  };
}
