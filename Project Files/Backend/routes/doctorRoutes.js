const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  updateDoctorProfileController,
  getAllDoctorAppointmentsController,
  handleStatusController,
  documentDownloadController,
  uploadDocument, // ✅ Import the upload controller
} = require("../controllers/doctorC");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ✅ IMPORTANT
  },
});


const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs and images are allowed!"), false);
    }
  },
});
// Existing doctor routes
router.post("/updateprofile", authMiddleware, updateDoctorProfileController);

router.get(
  "/getdoctorappointments",
  authMiddleware,
  getAllDoctorAppointmentsController
);

router.post("/handlestatus", authMiddleware, handleStatusController);

router.get(
  "/getdocumentdownload",
  authMiddleware,
  documentDownloadController
);

// ✅ Document upload route (NEWLY ADDED, do not remove or change position unless needed)
router.post(
  "/uploaddocument",
  authMiddleware,
  upload.single("document"),
  uploadDocument
);

module.exports = router;
