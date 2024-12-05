export interface UserRegistrationBase {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface EntityAdditionalInfo {
  businessName: string;
  certificate: string;
  region: string;
}

export type UserRegistration =
  | (UserRegistrationBase & { role: "lender"; additionalInfo: EntityAdditionalInfo })
  | (UserRegistrationBase & { role: "collector"; additionalInfo: EntityAdditionalInfo })
  | (UserRegistrationBase & { role: "trader"; additionalInfo?: never });
