export interface AppUser {
  id: number;
  email: string;
  name: string;
}

export interface CustomerRelationships {
  id: number;
  points: number;
  appUser: AppUser;
}
