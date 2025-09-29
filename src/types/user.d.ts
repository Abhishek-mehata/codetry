export interface UserModel {
  id?: number;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  role?: "ADMIN" | "BUYER" | "SELLER";
  isSeller?: boolean;
  isEmailConfirmed?: boolean;
  emailVerifyToken?: string;
  passwordResetToken?: string;
  isPhoneNumberConfirmed?: boolean;
  isCountryConfirmed?: boolean;
  status?: "ACTIVE" | "BLOCKED";
  createdAt?: string;
  updatedAt?: string;
  password: string;  //  Ensure this exists
  // Bank details for sellers
  accountHolderName?: string;
  accountNumber?: string;
  address?: string;
  bankname?: string;
  ibannumber?: string;
  ifsccode?: string;
  swiftcode?: string;
  paypalEmail?: string;
  profilePicture: string;
}
