import { Account, Client } from "appwrite";
import axios from "axios";

export const appwriteConfig = {
  endpoint: "BACKEND_URL", // Your API Endpoint
  projectId: "API_KEY", // Your project ID
  backendUrl: "https://snippet-wallet-backend.onrender.com",
};

// https://snippet-wallet-backend.onrender.com

export const chromeInstance =
  typeof globalThis !== "undefined" ? (globalThis as any).chrome : undefined;

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export class AuthServices {
  account;
  constructor() {
    this.account = new Account(client);
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
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

export class DatabaseServices {
  async loadFolders(parent: string, userId: string) {
    try {
      const res = await axios.get(
        `${appwriteConfig.backendUrl}/api/v1/folder/get?parent=${parent}&userId=${userId}`
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }

  async loadSnippets(folderId: string, userId: string) {
    try {
      const res = await axios.get(
        `${appwriteConfig.backendUrl}/api/v1/snippet/all?folderId=${folderId}&userId=${userId}`
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }

  async loadOneSnippet(snippetId: string) {
    try {
      const res = await axios.get(
        `${appwriteConfig.backendUrl}/api/v1/snippet/one?snippetId=${snippetId}`
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }

  async updateSnippet(snippetId: string, formData: any) {
    try {
      const res = await axios.put(
        `${appwriteConfig.backendUrl}/api/v1/snippet/update`,
        {
          // data: {
          snippetId: snippetId,
          updatedField: formData,
          // },
        }
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }
  async updateFolder(snippetId: string, formData: any) {
    try {
      const res = await axios.put(
        `${appwriteConfig.backendUrl}/api/v1/folder/update`,
        {
          // data: {
          snippetId: snippetId,
          updatedField: formData,
          // },
        }
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }
  async deleteSnippet(snippetId: string) {
    try {
      const res = await axios.delete(
        `${appwriteConfig.backendUrl}/api/v1/snippet/delete?snippetId=${snippetId}`
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }

  async createFolder(title: string, parent: string, userId: string) {
    try {
      const res = await axios.post(
        `${appwriteConfig.backendUrl}/api/v1/folder/add`,
        {
          userId: userId,
          parent: parent,
          title: title,
        }
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }

  async createSnippet(
    title: string,
    parent: string,
    userId: string,
    language: string,
    code: string,
    description: string = ""
  ) {
    try {
      const res = await axios.post(
        `${appwriteConfig.backendUrl}/api/v1/snippet/create`,
        {
          userId: userId,
          folderId: parent,
          title: title,
          language: language,
          code: code,
          description: description || "",
        }
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }

  async deleteFolder(folderId: string) {
    try {
      const res = await axios.delete(
        `${appwriteConfig.backendUrl}/api/v1/folder/delete?folderId=${folderId}`
      );

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }
  async isBackendRunning(timeout: number) {
    try {
      const res = await axios.get(`${appwriteConfig.backendUrl}`, {
        timeout: timeout,
      });

      return res.data;
    } catch (error: any) {
      throw new Error("Something gone bad");
    }
  }
}

const authServices = new AuthServices();
const dbServices = new DatabaseServices();

export { dbServices, authServices };
