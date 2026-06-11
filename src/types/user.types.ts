export interface IUserData {
  _id: string;
  name: string;
  email: string;
  role: "user" | "partner" | "admin";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}