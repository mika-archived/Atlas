import { auth } from "firebase";

export interface ISession {
  // TODO: Typing
  username: string;
}

export async function currentUser(): Promise<firebase.User> {
  return new Promise<firebase.User>((resolve, reject) => {
    auth().onAuthStateChanged(user => {
      if (user === null) {
        reject();
      } else {
        resolve(user);
      }
    }, err => {
      reject();
    });
  });
}
