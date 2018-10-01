import firebase from "firebase-admin";

firebase.initializeApp({
  databaseURL: "https://atlas-1537035161848.firebaseio.com",
  projectId: "atlas-1537035161848",
  storageBucket: "storage.atlas.mochizuki.moe",
});

firebase.firestore().settings({
  timestampsInSnapshots: true
});
