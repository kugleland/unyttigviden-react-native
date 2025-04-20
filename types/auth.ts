export interface User {
  id: number;
  email: string;
  name: string;
  gravatar: string;
  profile_photo_url: string;
  profile_image_url: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_id: string;
}

export interface LoginData {
  email: string;
  password: string;
  device_id: string;
} 

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}