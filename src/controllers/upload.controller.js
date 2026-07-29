import {uploadToCloudinary} from "../services/upload.service.js";

export const uploadSingle = async (req, res) => {
    try{
        if(!req.file) return res.status(400).json({error:"No file uploaded"});
        const result = await uploadToCloudinary(req.file.buffer);
        res.status(200).json({
            message:"Upload successfully",
            url: result.secure_url,
            public_id: result.public_id
        });
    }catch(e){
        res.status(500).json({
            error: e.message,
        })
    }
}