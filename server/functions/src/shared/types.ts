export interface IUser {
  // uid
  id: string;

  // display username (In first, auto filled by SSO provider)
  username: string;

  // icon url
  icon: string;
}

export interface IImage {
  // Image ID
  id: string;

  // reference to user
  user: IUser;

  restrict: "private" | "limited" | "registered" | "public";

  attributes: string[];
}
