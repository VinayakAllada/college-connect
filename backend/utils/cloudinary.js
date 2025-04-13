import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dz1xbcdk8" ,
  api_key: "488573954473355",
  api_secret: "sMRbRm42S7i0-VwHON8w96JPD7w",
});
export const deleteImage = async (url) => {
  if (!url) return;

  try {
    // Extract public_id from URL
    const segments = url.split('/');
    const filename = segments[segments.length - 1];
    const publicId = `collegeBlogs/${filename.split('.')[0]}`; // since you store in 'collegeBlogs' folder

    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (err) {
    console.error('Cloudinary delete error:', err.message);
  }
};

export default cloudinary;
