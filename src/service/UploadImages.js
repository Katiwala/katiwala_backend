import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import app from "../../firebase.js";

const storage = getStorage(app);
const storageRef = ref(storage);

const uploadImage = async (image) => {
  try {
    const imageRef = ref(storageRef, image.originalname);
    await uploadBytes(imageRef, image.buffer);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
