const docSchema = require("../schemas/docModel");
const appointmentSchema = require("../schemas/appointmentModel");
const userSchema = require("../schemas/userModel");
const fs = require("fs");
const path = require("path");

const updateDoctorProfileController = async (req, res) => {
  try {
    const doctor = await docSchema.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    return res.status(200).send({
      success: true,
      data: doctor,
      message: "Successfully updated profile",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const getAllDoctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await docSchema.findOne({ userId: req.body.userId });

    const allAppointments = await appointmentSchema
      .find({ doctorId: doctor._id })
      .populate("userInfo");

    return res.status(200).send({
      message: "All the appointments are listed below.",
      success: true,
      data: allAppointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const handleStatusController = async (req, res) => {
  try {
    const { userid, appointmentId, status } = req.body;

    const appointment = await appointmentSchema.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    const user = await userSchema.findById(userid);

    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }

    user.notification.push({
      type: "status-updated",
      message: `Your appointment has been ${status}`,
    });

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Successfully updated status",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};



const documentDownloadController = async (req, res) => {
  const appointId = req.query.appointId;

  try {
    const appointment = await appointmentSchema.findById(appointId);
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    const filename = appointment.document?.filename;
    if (!filename) {
      return res.status(404).send({ message: "Document not found", success: false });
    }

    const absoluteFilePath = path.join(__dirname, "..", "uploads", filename);
    console.log("Resolved file path:", absoluteFilePath);

    fs.access(absoluteFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send({ message: "File not found", success: false });
      }

      // ✅ Detect the file extension
      const ext = path.extname(filename).toLowerCase();
      let mimeType;

      if (ext === ".pdf") {
        mimeType = "application/pdf";
      } else if (ext === ".jpeg" || ext === ".jpg") {
        mimeType = "image/jpeg";
      } else if (ext === ".png") {
        mimeType = "image/png";
      } else {
        mimeType = "application/octet-stream"; // fallback
      }

      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", mimeType);

      const fileStream = fs.createReadStream(absoluteFilePath);
      fileStream.on("error", (error) => {
        console.error("File read error:", error);
        return res.status(500).send({ message: "Error reading file", success: false });
      });
      fileStream.pipe(res);
    });
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const uploadDocument = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const file = req.file;

    if (!file || !appointmentId) {
      return res.status(400).send({ message: "File or appointmentId missing", success: false });
    }

    const updatedAppointment = await appointmentSchema.findByIdAndUpdate(
      appointmentId,
      {
        document: {
          filename: file.filename,
          path: file.path,
        },
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Document uploaded and saved to appointment",
      data: updatedAppointment,
    });
  } catch (error) {
    console.log("Upload error:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

module.exports = {
  updateDoctorProfileController,
  getAllDoctorAppointmentsController,
  handleStatusController,
  documentDownloadController,
  uploadDocument,
};
