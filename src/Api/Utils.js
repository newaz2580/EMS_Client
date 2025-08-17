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

// 🔹 Important: Make this function async and await axios.post
export const saveUserInfo = async (userInfo) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_KEY}/users`, userInfo);
    return res.data; // optional, যদি frontend-এ result ব্যবহার করতে চাও
  } catch (error) {
    console.error("Failed to save user info:", error);
    throw error;
  }
};
