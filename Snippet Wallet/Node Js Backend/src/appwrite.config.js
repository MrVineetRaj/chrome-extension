import "dotenv/config";

import { Client, Databases, ID, Query } from "node-appwrite";

export const appwriteConf = {
  projectId: process.env.PROJECT_ID || "",
  dbId: process.env.DB_ID || "",
  folderCollectionId: process.env.FOLDER_COLLECTION_ID || "",
  savedFolderCollectionId: process.env.SAVED_FOLDER_COLLECTION_ID || "",
  snippetsCollectionId: process.env.SNIPPETS_COLLECTION_ID || "",
  appwriteKey: process.env.APPWRITE_API_KEY,
};

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(appwriteConf.projectId)
  .setKey(appwriteConf.appwriteKey);

export class DatabaseServices {
  databases;
  constructor() {
    this.databases = new Databases(client);
  }

  async listFolders(userId, parent) {
    try {
      let res = await this.databases.listDocuments(
        appwriteConf.dbId,
        appwriteConf.folderCollectionId,
        [Query.equal("parent", parent), Query.equal("owner", userId)]
      );
      return res.documents;
    } catch (error) {
      return error;
    }
  }

  async createFolder(title, userId, parent) {
    try {
      let folderDoc = await this.databases.createDocument(
        appwriteConf.dbId,
        appwriteConf.folderCollectionId,
        ID.unique(),
        {
          title,
          owner: userId,
          parent,
        }
      );

      return "created";
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFolder(folderId) {
    try {
      await this.databases.deleteDocument(
        appwriteConf.dbId,
        appwriteConf.folderCollectionId,
        folderId
      );

      return "Deleted";
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateFolder(updatedFields, folderId) {
    try {
      await this.databases.updateDocument(
        appwriteConf.dbId,
        appwriteConf.folderCollectionId,
        folderId,
        updatedFields
      );

      return "Updated";
    } catch (error) {
      throw new Error(error);
    }
  }

  async listAllSnippets(userId, folderId) {
    try {
      let res = await this.databases.listDocuments(
        appwriteConf.dbId,
        appwriteConf.snippetsCollectionId,
        [Query.equal("folderId", folderId), Query.equal("owner", userId)]
      );
      return res.documents;
    } catch (error) {
      return error;
    }
  }
  async listOneSnippet(snippetId) {
    try {
      let res = await this.databases.getDocument(
        appwriteConf.dbId,
        appwriteConf.snippetsCollectionId,
        snippetId
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  async createSnippet(
    userId,
    title,
    folderId,
    language,
    code,
    description = ""
  ) {
    try {
      await this.databases.createDocument(
        appwriteConf.dbId,
        appwriteConf.snippetsCollectionId,
        ID.unique(),
        {
          title,
          owner: userId,
          folderId,
          language,
          code,
          description,
        }
      );

      return "created";
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteSnippet(snippetId) {
    try {
      await this.databases.deleteDocument(
        appwriteConf.dbId,
        appwriteConf.snippetsCollectionId,
        snippetId
      );

      return "Deleted";
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateSnippet(updatedFields, snippetId) {
    try {
      await this.databases.updateDocument(
        appwriteConf.dbId,
        appwriteConf.snippetsCollectionId,
        snippetId,
        updatedFields
      );

      return "Updated";
    } catch (error) {
      throw new Error(error);
    }
  }
}

// console.log(appwriteConf);
const dbServices = new DatabaseServices();
export { dbServices };
