import { getStorage, ref } from "firebase/storage";
import app from "../../firebase.js";

const storage = getStorage(app);
const storageRef = ref(storage);

export const uploadImage = async (file) => {
  const imageRef = ref(storageRef, file.name);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};
