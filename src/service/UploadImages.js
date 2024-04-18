import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import app from "../../firebase.js";

const storage = getStorage(app);
const storageRef = ref(storage);

export const uploadImage = async (base64Image, fileName) => {
  const imageRef = ref(storageRef, fileName);
  const imageByteArray = Uint8Array.from(atob(base64Image), (c) =>
    c.charCodeAt(0)
  );
  await uploadBytes(imageRef, imageByteArray);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};
