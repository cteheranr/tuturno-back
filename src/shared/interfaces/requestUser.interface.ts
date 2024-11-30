export interface RequestWithUser {
  user: {
    username: string;
    role: string;
    sub: number;
  };
}

export interface ActiveUserInterface {
    username: string;
    role: string;
    sub: number;
}