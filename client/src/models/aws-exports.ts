import { API_NAME } from "./constants";

export default {
  // Cognito
  Auth: {
    identityPoolId: "ap-northeast-1:94cc3c08-3634-4e39-bbbd-bf511e7e2c5a",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_LsPwZvcLj",
    userPoolWebClientId: "5589la8q22q51onupofmrvuadr",
    mandatorySignIn: true,
  },
  // API Gateway
  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint: "https://api.atlas.mochizuki.moe/v1",
        region: "ap-northeast-1"
      }
    ]
  }
};
