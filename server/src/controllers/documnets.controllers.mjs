import Documents from "../models/documents.model.mjs";
import User from "../models/user.model.mjs";

const uploadUserDocument = async (req, res) => {
  console.log(req.file)
  const { originalname, path, size } =await req.file;
  if (!originalname || !path || !size) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const user = await Documents.findOne({
    where: { documentName: originalname }
  } 
  )
  console.log("This is user", user)
  if (user) {
    return res.status(400).json({ message: "File already exists" })
  }

  Documents.create({
    documentName: originalname,
    documentUrl: path,
    userId: req.user.id
  }).then((data) => {
    //  console.log(data.dataValues) 
    res
    .status(200)
    .json({ message: "File added successfully", data: data.dataValues })
  }).catch((error) => {
    console.error("Error while adding patents", error)
  })

}
const userDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const documents = await Documents.findAll({ where: { userId } });
    return res.status(200).json({ documents }); 
  } catch (error) {
    console.error("Failed to get user documents", error);
    return res.status(500).json({ message: "Failed to get user documents", error: error.message });
  } 
}
 
export { uploadUserDocument, userDocuments };