const multer = require("multer");
const express = require("express");

const {
  registerController,
  loginController,
  authController,
  docController,
  deleteallnotificationController,
  getallnotificationController,
  // ✅ newly added
  getAllDoctorsControllers,
  appointmentController,
  getAllUserAppointments,
  getDocsController,
  downloadDocController,
} = require("../controllers/userC");
const { markAllAsReadController } = require('../controllers/userC');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Authentication
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/getuserdata", authMiddleware, authController);

// Doctor Registration
router.post("/registerdoc", authMiddleware, docController);

// Doctors Listing
router.get("/getalldoctorsu", authMiddleware, getAllDoctorsControllers);

// Appointment Booking
router.post("/getappointment", upload.single("image"), authMiddleware, appointmentController);

// Notifications
router.get("/getallnotification", authMiddleware, getallnotificationController);
//router.post("/getallnotification", authMiddleware, getallnotificationController);
// ADD this route ABOVE the POST version
// Add this:
router.post("/markallasread", authMiddleware, markAllAsReadController);



router.post("/deleteallnotification", authMiddleware, deleteallnotificationController);


// Appointments and Docs
router.get("/getuserappointments", authMiddleware, getAllUserAppointments);
router.get("/getDocsforuser", authMiddleware, getDocsController);

module.exports = router;
