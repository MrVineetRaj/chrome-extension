import { dbServices } from "../appwrite.config.js";

const createSnippet = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.folderId || !data.userId) {
      throw new Error("Bad Request");
    }

    const result = await dbServices.createSnippet(
      data.userId,
      data.title,
      data.folderId,
      data.language,
      data.code,
      data?.description || ""
    );

    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const listAllSnippets = async (req, res) => {
  try {
    let query = req.query;
    console.log(query);
    if (!query?.userId || !query?.folderId) {
      throw new Error("Bad request");
    }

    const result = await dbServices.listAllSnippets(
      query?.userId,
      query?.folderId
    );

    res.send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
const listOneSnippet = async (req, res) => {
  try {
    let query = req.query;
    console.log(query);
    if (!query?.snippetId) {
      throw new Error("Bad request");
    }

    const result = await dbServices.listOneSnippet(query?.snippetId);

    res.send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateSnippet = async (req, res) => {
  try {
    const data = req.body;

    if (!data.updatedField || !data.snippetId) {
      throw new Error("Bad Request");
    }

    const result = await dbServices.updateSnippet(
      data.updatedField,
      data.snippetId
    );

    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteSnippet = async (req, res) => {
  try {
    let query = req.query;

    if (!query?.snippetId) {
      throw new Error("Bad request");
    }

    const result = await dbServices.deleteSnippet(query?.snippetId);

    res.send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  createSnippet,
  listAllSnippets,
  listOneSnippet,
  updateSnippet,
  deleteSnippet,
};
