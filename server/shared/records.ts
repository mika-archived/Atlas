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
  storageId: string;

  userId: string;

  attributes?: string[];

  restrict: "private" | "allowed" | "registered" | "public";

  size: number;
}

export interface IStorageAllowUsers {
  storageId: string;

  userIds: string[];
}

export interface ITag {
  // associated user id (sub)
  userId: string;

  // tag
  tag: string;

  // tag index
  idx: number;

  // array of storage id
  storageIds: string[];
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

export function createTag({ userId, tag, idx, storageIds = [] }: ITag): IPrimaryKey {
  return {
    id: userId,
    varies: `${tag}:${idx}`,
    storageIds,
  } as IPrimaryKey;
}