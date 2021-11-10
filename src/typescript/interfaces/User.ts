import { IIdentifiable } from "./Identity";

export interface IUser extends IIdentifiable {
  firstName: string;
  lastName: string;
  emailAddress: string;
  address: string;
}