import uploadImage from "../service/UploadImages.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const imageUpload = async (request, response) => {
  const { image } = request.body;
  try {
    await upload.single("image")(request, response, async (err) => {
      if (err) {
        console.log(err);
        return response.status(500).json({ message: "Error uploading image" });
      }
      const { file } = request;

      if (!file) {
        return response.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = await uploadImage(file);

      if (!imageUrl) {
        return response.status(500).json({ message: "Error uploading image" });
      }

      response.status(200).json(imageUrl);
    });
  } catch (e) {
    console.log(e);
  }
};
