import { Account, Client, OAuthProvider } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", // Your API Endpoint
  frontend: import.meta.env.VITE_PUBLIC_FRONTEND_ENDPOINT, // Your Frontend URL
  projectId: import.meta.env.VITE_PUBLIC_PROJECT_ID, // Your project ID
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export class AuthServices {
  account;
  constructor() {
    this.account = new Account(client);
  }

  async loginOAuth(provider: string) {
    try {
      if (provider === "github") {
        await this.account.createOAuth2Session(
          OAuthProvider.Github,
          `${appwriteConfig.frontend}`, // redirect here on success
          `${appwriteConfig.frontend}`, // redirect here on failure
          ["repo", "user"] // scopes (optional)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      console.log("Logout done");
    } catch (error) {
      console.error(error);
    }
  }

  async getAccount() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}

const authServices = new AuthServices();

export { authServices };
