import ImageKit from "imagekit";
import multer from "multer";
import CONFIG from "../config/config.js";
const storage = multer.memoryStorage();
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });


const imagekit = new ImageKit({
    publicKey: CONFIG.IMAGEKIT_PUBLIC_KEY,
    privateKey: CONFIG.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/24x9lfuld",
});

export const uploadImage=async (file)=>{
    try {  
        console.log(file);
        const response = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/products",
        });
        console.log("Response",response)
        return response.url;
    } catch (err) {
        console.log("Upload image error:");
        console.log(err.message);
        // return res.status(500).json({ message: "Internal Server Error" });
    }
}