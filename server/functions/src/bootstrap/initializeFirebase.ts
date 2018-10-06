import firebase from "firebase-admin";

// tslint:disable-next-line:no-var-requires
const credential = firebase.credential.cert(require("../../service-account-key.json"));

firebase.initializeApp({
  databaseURL: "https://atlas-1537035161848.firebaseio.com",
  projectId: "atlas-1537035161848",
  storageBucket: "storage.atlas.mochizuki.moe",
  credential,
});

firebase.firestore().settings({
  timestampsInSnapshots: true
});
