export const Endpoints = {
  LOGIN: `/api/v1/users/token/?client_id=${process.env.EXPO_PUBLIC_API_CLIENT_ID}`,
  CUSTOMER_RELATIONSHIPS: `/api/v1/customer-relationships/client/${process.env.EXPO_PUBLIC_API_CLIENT_ID}/`,
} as const;
