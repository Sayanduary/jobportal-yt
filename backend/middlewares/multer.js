import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("profilePhoto");
export const resumeUpload = multer({ storage }).single("resume");
export const logoUpload = multer({ storage }).single("file");
export const multipleUpload = multer({ storage }).fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);
