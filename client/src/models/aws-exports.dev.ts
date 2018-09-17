import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: "YOUR_FEDERATED_IDENTITY_POOL_ID",
    region: "YOUR_FEDERATED_IDENTITY_POOL_REGION",
    userPoolId: "YOUR_USER_POOL_ID",
    userPoolWebClientId: "YOUR_USER_POOL_CLIENT_ID",
    mandatorySignIn: true,
  }
});
