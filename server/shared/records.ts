
export interface IPrimaryKey {
  // partition key
  id: string;

  // sort key
  varies: string;
}

export interface IUser {
  // user id (sub)
  userId: string;

  // username
  username?: string;

  // cognito federated identity id
  cognitoIdentityId?: string;
}

export interface IStorage {
  // storage id (uuid)
  storageId: string;

  // user id (ref)
  userId: string;

  // tag attributes
  attributes?: string[];

  // access restrict
  restrict: "private" | "allowed" | "registered" | "public";

  // file size
  size: number;
}

export interface IStorageAllowUsers {
  // storage id (ref)
  storageId: string;

  // user ids that allowed access to this
  userIds: string[];
}

export interface INotice {
  // notice id (uuid)
  noticeId: string;

  // notice expired at
  expiredAt: string;

  // notice body
  body: string;
}

export function createUser({ userId, username = "EMPTY", cognitoIdentityId = "EMPTY" }: IUser): IPrimaryKey {
  return {
    id: userId,
    varies: "tUser",
    username,
    cognitoIdentityId
  } as IPrimaryKey;
}

export function createUserPrimary({ userId }: IUser): IPrimaryKey {
  return {
    id: userId,
    varies: "tUser"
  };
}

export function createStorage({ storageId, userId, size, restrict, attributes = [] }: IStorage): IPrimaryKey {
  return {
    id: storageId,
    varies: "tStorage",
    userId,
    size,
    restrict,
    attributes,
  } as IPrimaryKey;
}
