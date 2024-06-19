export interface GetCurrentUserResponse {
  data: User;
}

export interface VerifyOTPResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  email: string;
  fullName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface LoginResponse extends VerifyOTPResponse {}
