export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  success: boolean;
  access_token: string;
  token: string;
}
