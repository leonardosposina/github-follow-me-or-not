export default interface IGitHubProfileDTO {
  id: number;
  login: string;
  name: string;
  type: string;
  avatar_url: string;
  html_url: string;
  following: number;
  followers: number;
  public_repos: number;
}
