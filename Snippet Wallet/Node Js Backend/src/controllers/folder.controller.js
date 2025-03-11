import { dbServices } from "../appwrite.config.js";

const createFolder = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.parent || !data.userId) {
      throw new Error("Bad Request");
    }

    const result = await dbServices.createFolder(
      data.title,
      data.userId,
      data.parent
    );

    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const listFolders = async (req, res) => {
  try {
    let query = req.query;
    console.log(query);
    if (!query?.userId || !query?.parent) {
      throw new Error("Bad request");
    }

    const result = await dbServices.listFolders(query?.userId, query?.parent);

    res.send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const editFolder = async (req, res) => {
  try {
    const data = req.body;

    if (!data.updatedField || !data.folderId) {
      throw new Error("Bad Request");
    }

    const result = await dbServices.updateFolder(
      data.updatedField,
      data.folderId
    );

    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteFolder = async (req, res) => {
  try {
    let query = req.query;
    console.log(query);
    if (!query?.folderId) {
      throw new Error("Bad request");
    }

    const result = await dbServices.deleteFolder(query?.folderId);

    res.send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export { listFolders, createFolder, editFolder, deleteFolder };
