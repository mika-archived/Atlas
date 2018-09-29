import { https } from "firebase-functions";

export const helloWorld = https.onRequest((_, response) => {
  response.send("Hello from Firebase!");
});
