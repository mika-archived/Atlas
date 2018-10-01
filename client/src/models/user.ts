export interface IUser {
  // User ID
  id: string;

  // display username (In first, auto filled by SSO provider)
  username: string;

  // icon url
  icon: string;

  // schema version
  version: "1";
}
