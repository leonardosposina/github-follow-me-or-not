export default interface IGitHubRateLimitsDTO {
  limit: number;
  remaining: number;
  reset: number;
}
