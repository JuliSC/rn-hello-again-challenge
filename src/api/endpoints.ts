export const Endpoints = {
  LOGIN: `/api/v1/users/token/?client_id=${process.env.EXPO_PUBLIC_API_CLIENT_ID}`,
  CUSTOMER_RELATIONSHIPS: `/api/v1/customer-relationships/client/${process.env.EXPO_PUBLIC_API_CLIENT_ID}/`,
  PROFILE: `/api/v1/users/profile/?client_id=${process.env.EXPO_PUBLIC_API_CLIENT_ID}`,
  BOUNTIES: `/api/v1/clients/${process.env.EXPO_PUBLIC_API_CLIENT_ID}/bounties/`,
} as const;
