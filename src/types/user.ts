export interface CreateTenant {
  name: string;
  password: string;
}

export interface Tenant extends CreateTenant {
  tenantId: string;
  apiKey: string;
  createdAt: Date;
  lastUsedAt: Date;
}

export type AccessToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
}