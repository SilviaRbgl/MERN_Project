import { v2 as cloudinary } from 'cloudinary';

const cloudinaryConfig = () => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_CLOUD_NAME, 
        api_key: process.env.CLOUD_API_SECRET, 
        api_secret: process.env.CLOUD_API_KEY,
      });
}

export default cloudinaryConfig;
