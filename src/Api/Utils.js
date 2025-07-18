import axios from "axios";

const DEFAULT_AVATAR_URL = "https://i.ibb.co/N6Th4mRY/Porfile-image.jpg"; 

export const uploadImage = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    );
    return data.data.display_url;
  } catch (error) {
    console.error("Image upload failed. Using default avatar.", error);
    return DEFAULT_AVATAR_URL;
  }
};

export const saveUserInfo=(userInfo)=>{
const result=axios.post(`${import.meta.env.VITE_API_KEY}/users`,userInfo)
console.log(result)
}