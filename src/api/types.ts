export interface ApiClientConfig {
  getToken?: () => Promise<string | null>;
}
