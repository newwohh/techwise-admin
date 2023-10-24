const connect = require("../db/connection");

exports.getUserDocuments = async (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const users = await connect();

    const documents = await users.find({}).toArray();

    res.status(201).json({
      status: "success",
      data: documents,
    });
    return documents;
  } catch (error) {
    console.error("Error getting user documents:", error);
    throw error;
  }
};
