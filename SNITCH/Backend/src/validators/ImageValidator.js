export const validateImages = (req, res, next) => {
 try {
       const files = req.files;
    
    // Required check
    if (!files || files.length === 0) {
        return res.status(400).json({
            message: "At least one image is required"
        });
    }

    // Max count check (extra safety)
    if (files.length > 7) {
        return res.status(400).json({
            message: "Maximum 7 images allowed"
        });
    }
    // Size check (5MB)
    if (files.size > 5 * 1024 * 1024) {
        return res.status(400).json({
            message: "Each image must be less than 5MB"
        });
    }

    next();
 } catch (err) {
    console.log("Image Validation Error",err.message)

 }
};