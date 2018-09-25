export interface IPrimaryKeys {

  // Primary Key : user sub
  userId: string;

  // Sort Key : unix time millseconds
  timestamp: number;
}

export interface IStorage extends IPrimaryKeys {

  // Unique Storage ID
  storageId: string;

  // Tags
  attributes: string[];

  // Access Restrict
  restrict: "private" | "allowed" | "registered" | "public";

  // File Size (Bytes)
  size: number;

  // User IDs that allowed access
  allowedIds: string[];
}

export interface IUserAssociation extends IPrimaryKeys {
  // username
  username: string;

  // identity id
  cognitoIdentityId: string;
}

export interface IAllowAccessStorages extends IPrimaryKeys {

  // Storage IDs that allowed access
  storageIds: string[];
}